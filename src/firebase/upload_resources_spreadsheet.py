#!/usr/bin/env python
import sys
import gspread
import numpy as np
import pandas as pd
import firebase_admin

from typing import List, Dict
from gspread.models import Cell
from datetime import datetime, date
from firebase_admin import firestore
from resource import Resource, Links
from firebase_admin import credentials
from oauth2client.service_account import ServiceAccountCredentials


SPREADSHEET_NAME = "List of Resources"
WORKSHEET_NAME = "resources"
UPLOADED_COLUMN = 12
FIREBASE_COLLECTION = "resource" 

def main():
    argv = sys.argv

    if len(argv) != 3:
        log(f"usage: {argv[0]} <spreasheet_API_key.json> <firestore_API_key.json>")
        sys.exit()

    # Parse arguments
    spreadsheet_API_key = argv[1]
    firestore_API_key = argv[2]

    log(f"Uploading new resources as of {datetime.now()}")

    # Get access to Google Sheets spreadsheet
    log(f"Opening spreadsheet \"{SPREADSHEET_NAME}\"...")
    sheet = get_spreadsheet(SPREADSHEET_NAME, spreadsheet_API_key).worksheet(WORKSHEET_NAME)

    # Put resources in dataframe and clean the data
    resources_df = clean_resources_dataframe(get_dataframe(sheet))
    new_resources_df = get_new_resources(resources_df)

    if len(new_resources_df.index) == 0:
        log("No new resources to upload")
        sys.exit()

    # Initialize Cloud Firestore
    log("Initializing Cloud Firestore...")
    db = get_database_client(firestore_API_key)

    # Get dictionary with resources already in Firestore
    log("Checking which resources are already in Firestore...")
    firestore_resources = get_resources_in_firesbase(db)

    # Upload resources
    uploaded_rows = upload_new_resources(new_resources_df, firestore_resources, db, sheet)

    # Update spreasheet
    if len(uploaded_rows) > 0:
        log("Updating spreadsheet...")
        update_uploaded_status(sheet, uploaded_rows)
        log(f"\tSpreadsheet updated on {datetime.now()}\n")


# Helper methods 

def log(message:str):
    print(message, file=sys.stderr, flush=True)

def get_spreadsheet(sheet_name:str, cred_file:str) -> gspread.models.Spreadsheet:
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name(cred_file, scope)
    client = gspread.authorize(creds)
    return client.open(sheet_name)

def get_dataframe(sheet:gspread.models.Worksheet) -> pd.DataFrame:
    df = pd.DataFrame(sheet.get_all_values())
    header = df.iloc[0]
    df = df[1:]
    df.columns = header
    return df

def clean_resources_dataframe(resources_df:pd.DataFrame) -> pd.DataFrame:
    resources_df.columns = map(str.lower, resources_df.columns)
    resources_df = resources_df[resources_df["resource name"].notna()]
    resources_df = resources_df[resources_df["category"].notna()]
    resources_df = resources_df.replace(np.nan, "", regex=True)
    resources_df = resources_df.applymap(str)
    resources_df["category"] = resources_df["category"].str.lower()
    resources_df["tags"] = resources_df["tags"].str.lower()
    resources_df["ready for upload"] = resources_df["ready for upload"].str.lower()
    resources_df["ready for upload"] = resources_df["ready for upload"].map({"true": True, "false": False})
    resources_df["uploaded"] = resources_df["uploaded"].str.lower()
    resources_df["uploaded"] = resources_df["uploaded"].map({"true": True, "false": False})
    return resources_df

def get_new_resources(resources_df:pd.DataFrame) -> pd.DataFrame:
    return resources_df[(resources_df["ready for upload"] == True) & (resources_df["uploaded"] == False)]

def get_database_client(firestore_API_key:str):
    cred = credentials.Certificate(firestore_API_key)
    firebase_admin.initialize_app(cred)
    return firestore.client()

def get_resources_in_firesbase(db) -> Dict[Resource, str]:
    category_docs = db.collection(FIREBASE_COLLECTION).stream()
    firestore_resources = dict()
    for category_doc in category_docs:
        for doc in category_doc.reference.collection("resources").stream():
            try:
                resource = Resource.from_dict(doc.to_dict())
                firestore_resources[resource] = doc.id
            except KeyError:
                log(f"Document with id {doc.id} in Firestore has incorrect or missing fields")
    return firestore_resources

def upload_new_resources(new_resources_df:pd.DataFrame, firestore_resources:Dict[Resource, str], db, sheet:gspread.models.Worksheet) -> List[int]:
    length = len(new_resources_df.index)
    log(f"{length} resources to upload")
    added = 0
    uploaded_rows = list()
    for index, row in new_resources_df.iterrows():
        links = Links(row["card link"], row["website"])
        date_created = datetime.now()
        resource = Resource(title=row["resource name"], 
                            reviewed=True, 
                            want_support_with=row["want support with"],
                            this_resource_offers=row["this resource offers"],
                            description=row["description"],
                            img=row["image link"],
                            category=row["category"],
                            tags=row["tags"].split(", "),
                            links=links, 
                            date_created=date_created,
                            ranking=row["ranking"])
        try:
            category_document = db.collection(FIREBASE_COLLECTION).document(resource.category.replace("/ ", "_"))
            if resource not in firestore_resources:
                category_document.update({"resource_list": firestore.ArrayUnion([resource.title])}) # Update resource list
                category_document.update({"tag_list": firestore.ArrayUnion(resource.tags)}) # Update tag list
                category_document.collection("resources").add(resource.to_dict()) # Add new document to collection
                log(f"\tAdded {row['resource name']} to {FIREBASE_COLLECTION}/{category_document.id}")
            else:
                category_document.collection("resources").document(firestore_resources[resource]).set(resource.to_dict()) # Update old document in collection
                log(f"\tUpdated {row['resource name']} in {FIREBASE_COLLECTION}/{category_document.id}")
        except Exception as e:
            log(f"Error uploading data to firestore. {added} / {length} resources uploaded successfully")
            print(e)
            return uploaded_rows
        added += 1
        uploaded_rows.append(index + 1)
    log(f"\nAdded {added} / {length} entries to Firestore")
    return uploaded_rows

def update_uploaded_status(sheet:gspread.models.Worksheet, uploaded_rows:List[int]):
    if len(uploaded_rows) == 0:
        return
    cells = [Cell(row=row, col=UPLOADED_COLUMN, value="TRUE") for row in uploaded_rows]
    sheet.update_cells(cells, value_input_option="USER_ENTERED")

if __name__ == "__main__":
    main()

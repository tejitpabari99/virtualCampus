#!/usr/bin/env python
import sys
import numpy as np
import pandas as pd
import firebase_admin
from firebase_admin import firestore
from resource import Resource, Links
from firebase_admin import credentials


def log(message):
    print(message, file=sys.stderr, flush=True)

if __name__ == "__main__":
    
    argv = sys.argv

    if len(argv) != 3:
        log("usage: ./firebase.py <filepath> <servicekey>")
        sys.exit()

    # Parse command line arguments
    filepath = argv[1]
    service_key = argv[2]

    # Read CSV file into a Pandas DataFrame
    log("\nReading data from " + filepath)
    resources_df = pd.read_csv(filepath)

    # Clean dataframe
    resources_df.columns = map(str.lower, resources_df.columns)
    resources_df = resources_df[resources_df["resource name"].notna()]
    resources_df = resources_df[resources_df["category"].notna()]
    resources_df = resources_df.replace(np.nan, "", regex=True)
    resources_df = resources_df.applymap(str)
    resources_df["category"] = resources_df["category"].str.lower()
    resources_df["tags"] = resources_df["tags"].str.lower()
    resources_df["reviewed"] = resources_df["reviewed"].str.lower()
    resources_df["reviewed"] = resources_df["reviewed"].map({"true": True, "false": False})

    # Initailize Cloud Firestore
    log("\nInitializing Cloud Firestore with key " + service_key)
    cred = credentials.Certificate(service_key)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    # Add data to Firestore
    log("\nAdding data to firestore...")
    added = 0
    for index, row in resources_df.iterrows():
        links = Links(row["card link"], row["website"])
        resource = Resource(row["resource name"], True, row["description"], row["image link"], row["category"], row["tags"].split(", "), links)
        path = "resources" 
        db.collection(path).add(resource.to_dict())
        added += 1
        log("\tAdded " + row["resource name"] + " to " + path)
    
    log("\nAdded " + str(added) + " entries to Firestore")
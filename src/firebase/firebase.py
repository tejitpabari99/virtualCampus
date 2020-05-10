#!/usr/bin/env python
import sys
import numpy as np
import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

if __name__ == "__main__":
    
    argv = sys.argv

    if len(argv) != 2:
        print("usage: ./firebase.py <filepath>", file=sys.stderr, flush=True)
        sys.exit()

    # Parse command line arguments
    filepath = argv[1]

    # Read CSV file into a Pandas DataFrame
    resources_df = pd.read_csv(filepath)

    # Clean dataframe
    resources_df.columns = map(str.lower, resources_df.columns)
    resources_df = resources_df[resources_df["resource name"].notna()]
    resources_df = resources_df[resources_df["category"].notna()]
    resources_df = resources_df.replace(np.nan, "", regex=True)
    resources_df = resources_df.applymap(str)
    resources_df["category"] = resources_df["category"].str.lower()
    resources_df["subcategory"] = resources_df["subcategory"].str.lower()

    # Initailize Cloud Firestore
    cred = credentials.Certificate("ServiceKey.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    # Add data to Firestore
    for index, row in resources_df.iterrows():
        data = {
            "category": {
                "category": row["category"],
                "subcategory": row["subcategory"],
            },
            "description": row["description"],
            "img": row["image link"],
            "links": {
                "androidLink": row["android link"],
                "facebook": row["facebook"],
                "iosLink": row["ios link"],
                "website": row["website"],
            },
            "title": row["resource name"]
        }
        db.document("resources/" + row["category"] + "/" + row["resource name"] + "/" + row["resource name"]).set(data)

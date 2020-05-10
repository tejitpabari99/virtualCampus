#!/usr/bin/env python
import subprocess
import sys
import pandas as pd

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
    resources_df = resources_df.applymap(str)
    resources_df["category"] = resources_df["category"].str.lower()
    resources_df["subcategory"] = resources_df["subcategory"].str.lower()
    resources_df = resources_df[resources_df["resource name"].notna()]
    resources_df = resources_df[resources_df["category"].notna()]
    

    # Send data to database using JavaScript
    command = ["node", "firebase.js"]
    for index, row in resources_df.iterrows():
        arguments = row.tolist()
        if subprocess.call(command + arguments) != 0:
            print("firebase.py: a call to firebase.js did not work")
            break
    print("\nfirebase.py: Done!\n")
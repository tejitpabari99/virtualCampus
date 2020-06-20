#!/usr/bin/env python
import sys
import firebase_admin
from typing import List, Dict
from firebase_admin import firestore
from resource import Resource, Links
from firebase_admin import credentials


def main():
    argv = sys.argv

    if len(argv) != 2:
        log(f"usage: {argv[0]} <firestore_API_key>")
        sys.exit()
    
    firestore_API_key = argv[1]
    COLLECTION = "resources"

    db = get_database_client(firestore_API_key)

    docs = db.collection(COLLECTION).stream()

    remove_duplicates(docs)

def log(message:str):
    print(message, file=sys.stderr, flush=True)

def get_database_client(firestore_API_key:str):
    cred = credentials.Certificate(firestore_API_key)
    firebase_admin.initialize_app(cred)
    return firestore.client()

def remove_duplicates(docs):
    seen = set()
    total = removed = 0
    log("Delete duplicates:")
    for doc in docs:
        resource = Resource.from_dict(doc.to_dict())
        if resource in seen:
            doc.reference.delete()
            log(f"\tDocument with title \"{resource.title}\"")
            removed += 1
        else:
            seen.add(resource)
        total += 1
    log(f"Found and deleted {removed} duplicates from {total} documents.")
        
if __name__ == "__main__":
    main()

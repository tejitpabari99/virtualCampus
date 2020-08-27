#!/usr/bin/env python
import sys
import firebase_admin
from typing import List, Dict
from firebase_admin import credentials, firestore
from resource import Links, Resource

RESOURCE_COLLECTION = "resource"

def main():
    argv = sys.argv

    if len(argv) != 2:
        log(f"usage: {argv[0]} <firestore_API_key>")
        sys.exit()
    
    firestore_API_key = argv[1]
    
    db = get_database_client(firestore_API_key)

    category_docs = db.collection(RESOURCE_COLLECTION).stream()

    remove_duplicates(category_docs)

def log(message:str):
    print(message, file=sys.stderr, flush=True)

def get_database_client(firestore_API_key:str):
    cred = credentials.Certificate(firestore_API_key)
    firebase_admin.initialize_app(cred)
    return firestore.client()

def remove_duplicates(category_docs):
    seen = set()
    total = removed = 0
    log("Delete duplicates:")
    for category_doc in category_docs:
        category_doc.reference.update({"resource_list": set(category_doc.get("resource_list"))})
        category_doc.reference.update({"tag_list": set(category_doc.get("tag_list"))})
        for doc in category_doc.reference.collection("resources").stream():
            try:
                resource = Resource.from_dict(doc.to_dict())
                if resource in seen:
                    doc.reference.delete()
                    log(f"\tDocument with title \"{resource.title}\"")
                    removed += 1
                else:
                    seen.add(resource)
                total += 1
            except KeyError:
                log(f"Document with id {doc.id}  in {category_doc.id} has incorrect or missing fields")
    log(f"Found and deleted {removed} duplicates from {total} documents.")
        
if __name__ == "__main__":
    main()

#!/usr/bin/env python
import sys
import firebase_admin
from typing import List, Dict
from firebase_admin import firestore
from resource import Resource, Links
from firebase_admin import credentials

RESOURCE_COLLECTION = "resources"
REFERENCE_COLLECTION = "resource_reference_docs"
REFERENCE_DOCUMENT_NAME = "Resource Tags by Categories"

def main():
    argv = sys.argv
    
    if len(argv) != 2:
        log(f"usage: {argv[0]} <firestore_API_key>")
        sys.exit()

    firestore_API_key = argv[1]

    db = get_database_client(firestore_API_key)

    docs = db.collection(RESOURCE_COLLECTION).stream()

    category_tags = get_tags_by_category(docs)

    db.collection(REFERENCE_COLLECTION).document(REFERENCE_DOCUMENT_NAME).set(category_tags)

    log(f"Updated {REFERENCE_COLLECTION}/{REFERENCE_DOCUMENT_NAME} in Firestore")
    

def log(message:str):
    print(message, file=sys.stderr, flush=True)

def get_database_client(firestore_API_key:str):
    cred = credentials.Certificate(firestore_API_key)
    firebase_admin.initialize_app(cred)
    return firestore.client()

def get_tags_by_category(docs):
    category_tags = dict()
    log("Gathering tags by category...")
    for doc in docs:
        try:
            resource = Resource.from_dict(doc.to_dict())
            if resource.category in category_tags:
                category_tags[resource.category] |= set(resource.tags)
            else:
                category_tags[resource.category] = set(resource.tags)
        except KeyError:
            log(f"Document with id {doc.id} has incorrect or missing fields")

    num_tags = 0
    for category, tags in category_tags.items():
        category_tags[category] = list(tags)
        num_tags += len(tags)
        
    log(f"Found {len(category_tags)} categories and {num_tags} tags in total")
    return category_tags

if __name__ == "__main__":
    main()
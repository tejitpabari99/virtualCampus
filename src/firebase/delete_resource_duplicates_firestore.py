#!/usr/bin/env python
import sys
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

def main():
    argv = sys.argv

    if len(argv) != 3:
        log(f"usage: {argv[0]} <firestore_API_key> <collection>")
        sys.exit()
    
    firestore_API_key = argv[1]
    collection = argv[2]

    db = get_database_client(firestore_API_key)

    docs = db.collection(collection).stream()

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
        hashable_data = tuplefy(doc.to_dict())
        if hashable_data in seen:
            doc.reference.delete()
            log(f"\tDocument with title \"{hashable_data[-1]}\"")
            removed += 1
        else:
            seen.add(hashable_data)
        total += 1
    log(f"Found and deleted {removed} duplicates from {total} documents.")

def tuplefy(data):

    return (
        data["category"]["category"],
        tuple(data["category"]["tags"]),
        data["description"],
        data["img"],
        data["reviewed"],
        data["title"]
    )

        
if __name__ == "__main__":
    main()

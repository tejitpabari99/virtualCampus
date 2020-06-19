#!/usr/bin/env python
import sys
import firebase_admin
from typing import List, Dict
from firebase_admin import firestore
from firebase_admin import credentials

class Resource(object):
    
    def __init__(self, resource_dict):
        self._title = resource_dict["title"]
        self._reviewed = resource_dict["reviewed"]
        self._description = resource_dict["description"]
        self._img = resource_dict["img"]
        self._category = resource_dict["category"]["category"]
        self._tags = resource_dict["category"]["tags"]
        self._links = resource_dict["links"]

    def __eq__(self, other) -> bool:
        if not isinstance(other, Resource):
            return False
        return self.title == other.title or self.links == other.links
    
    def __hash__(self):
        return hash((self.title, frozenset(self.links.items())))

    @property
    def title(self) -> str:
        return self._title

    @property
    def reviewed(self) -> bool:
        return self._reviewed

    @property
    def description(self) -> str:
        return self._description

    @property
    def img(self) -> str:
        return self._img

    @property
    def category(self) -> str:
        return self._category
    
    @property
    def tags(self) -> List[str]:
        return self._title

    @property
    def links(self) -> Dict[str,str]:
        return self._links


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
        resource = Resource(doc.to_dict())
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

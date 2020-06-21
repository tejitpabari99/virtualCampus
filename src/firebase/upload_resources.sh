#!/bin/sh

./upload_resources_spreadsheet.py columbia-virtual-campus-0927e40754de.json ServiceKey.json
./delete_resource_duplicates_firestore.py ServiceKey.json

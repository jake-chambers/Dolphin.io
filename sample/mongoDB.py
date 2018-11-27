import json
from pymongo import MongoClient

try:
    client = MongoClient('mongodb://admin:admin@hackwestern-shard-00-00-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-01-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-02-4qcqm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=hackWestern-shard-0&authSource=admin')
    db = client['Dolphin']
    collection = db['Users']
except:
    print('error connecting to mongo!')
finally:
    client.close()
    
    
with open("generated.json") as f:
    file_data = json.load(f)

collection.insert_many(file_data)
client.close()

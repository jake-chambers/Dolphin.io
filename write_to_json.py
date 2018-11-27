import os
import json

def add_transaction(new_transaction):
    # file does not exsist yet case
    if not os.path.isfile('app_transactions.json'):
        with open('app_transactions.json', mode='w') as f:
            f.write(json.dumps([new_transaction]))
            
    # file exsists
    else:
        with open('app_transactions.json') as app_transactions:
            transactions = json.load(app_transactions)
            
        # append to transaction to all transactions and re-write entire file
        transactions.append(new_transaction)
        with open('app_transactions.json', mode='w') as f:
            f.write(json.dumps(transactions))

def main():
    # Sample payload
    sample_transaction = {
    			"date":"12-Nov-2018:6:07:05",
    			"type":"sent",
    			"partner":2321442142,
    			"amount":50 }

    add_transaction(sample_transaction)
            
if __name__ == "__main__":
    main()

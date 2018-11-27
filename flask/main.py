import requests


"""
Charge a credit card
"""

import imp
import os
import sys

from authorizenet import apicontractsv1
from authorizenet.apicontrollers import createTransactionController



def charge_credit_card(data):

    # Create a merchantAuthenticationType object with authentication details
    # retrieved from the constants file
    merchantAuth = apicontractsv1.merchantAuthenticationType()
    merchantAuth.name = "2U6x9AuE"
    merchantAuth.transactionKey = "5KY6z6r64HtK8kgv"

    # Create the payment data for a credit card
    creditCard = apicontractsv1.creditCardType()
    creditCard.cardNumber = data["cardNumber"]
    creditCard.expirationDate = data["expirationDate"]
    creditCard.cardCode = data["cardCode"]

    # Add the payment data to a paymentType object
    payment = apicontractsv1.paymentType()
    payment.creditCard = creditCard
  

    # Create a transactionRequestType object and add the previous objects to it.
    transactionrequest = apicontractsv1.transactionRequestType()
    transactionrequest.transactionType = "authCaptureTransaction"
    transactionrequest.amount = data["amount"]
    transactionrequest.payment = payment

    # Assemble the complete transaction request
    createtransactionrequest = apicontractsv1.createTransactionRequest()
    createtransactionrequest.merchantAuthentication = merchantAuth
    createtransactionrequest.refId = "MerchantID-0001"
    createtransactionrequest.transactionRequest = transactionrequest
    
    # Create the controller
    createtransactioncontroller = createTransactionController(
        createtransactionrequest)
    createtransactioncontroller.execute()

    response = createtransactioncontroller.getresponse()

    if response is not None:
        # Check to see if the API request was successfully received and acted upon
        if response.messages.resultCode == "Ok":
            # Since the API request was successful, look for a transaction response
            # and parse it to display the results of authorizing the card
            if hasattr(response.transactionResponse, 'messages') is True:
                print(
                    'Successfully created transaction with Transaction ID: %s'
                    % response.transactionResponse.transId)
                print('Transaction Response Code: %s' %
                      response.transactionResponse.responseCode)
                print('Message Code: %s' %
                      response.transactionResponse.messages.message[0].code)
                print('Description: %s' % response.transactionResponse.
                      messages.message[0].description)
            else:
                print('Failed Transaction.')
                if hasattr(response.transactionResponse, 'errors') is True:
                    print('Error Code:  %s' % str(response.transactionResponse.
                                                  errors.error[0].errorCode))
                    print(
                        'Error message: %s' %
                        response.transactionResponse.errors.error[0].errorText)
        # Or, print errors if the API request wasn't successful
        else:
            print('Failed Transaction.')
            if hasattr(response, 'transactionResponse') is True and hasattr(
                    response.transactionResponse, 'errors') is True:
                print('Error Code: %s' % str(
                    response.transactionResponse.errors.error[0].errorCode))
                print('Error message: %s' %
                      response.transactionResponse.errors.error[0].errorText)
            else:
                print('Error Code: %s' %
                      response.messages.message[0]['code'].text)
                print('Error message: %s' %
                      response.messages.message[0]['text'].text)
    else:
        print('Null Response.')

    return response

'''
if (os.path.basename(__file__) == os.path.basename(sys.argv[0])):
    charge_credit_card(50)
'''



"""
Credit a bank account
"""

'''
data2 = {

            "amount": "5",
            "payment": {
                "bankAccount": {
                    "accountType": "checking",
                    "routingNumber": "121042882",
                    "accountNumber": "123456789000",
                    "nameOnAccount": "John Doe"
                }
            },
            "refTransId": "2148889729"
        }
    }
}
'''

def credit_bank_account(data):
    """
    Credit a bank account
    """
    # Create a merchantAuthenticationType object with authentication details
    # retrieved from the constants file
    merchantAuth = apicontractsv1.merchantAuthenticationType()
    merchantAuth.name = "2s68MpYp"
    merchantAuth.transactionKey = "4p9Qm37Es3Ur4whj"

    # Create the payment data for a bank account
    bankAccount = apicontractsv1.bankAccountType()
    accountType = apicontractsv1.bankAccountTypeEnum
    bankAccount.accountType = accountType.checking
    bankAccount.routingNumber = "121042882"
    bankAccount.accountNumber = "123456789"
    bankAccount.nameOnAccount = "John Doe"

    # Add the payment data to a paymentType object
    payment = apicontractsv1.paymentType()
    payment.bankAccount = bankAccount

    # Create a transactionRequestType object and add the previous objects to it.
    transactionrequest = apicontractsv1.transactionRequestType()
    transactionrequest.transactionType = "refundTransaction"
    transactionrequest.amount = "5"
    transactionrequest.payment = payment

    # Assemble the complete transaction request
    createtransactionrequest = apicontractsv1.createTransactionRequest()
    createtransactionrequest.merchantAuthentication = merchantAuth
    createtransactionrequest.refId = "MerchantID-0001"
    createtransactionrequest.transactionRequest = transactionrequest
    # Create the controller
    createtransactioncontroller = createTransactionController(
        createtransactionrequest)
    createtransactioncontroller.execute()

    response = createtransactioncontroller.getresponse()

    if response is not None:
        # Check to see if the API request was successfully received and acted upon
        if response.messages.resultCode == "Ok":
            # Since the API request was successful, look for a transaction response
            # and parse it to display the results of authorizing the card
            if hasattr(response.transactionResponse, 'messages') is True:
                print(
                    'Successfully created transaction with Transaction ID: %s'
                    % response.transactionResponse.transId)
                print('Transaction Response Code: %s' %
                      response.transactionResponse.responseCode)
                print('Message Code: %s' %
                      response.transactionResponse.messages.message[0].code)
                print('Description: %s' % response.transactionResponse.
                      messages.message[0].description)
            else:
                print('Failed Transaction.')
                if hasattr(response.transactionResponse, 'errors') is True:
                    print('Error Code:  %s' % str(response.transactionResponse.
                                                  errors.error[0].errorCode))
                    print(
                        'Error message: %s' %
                        response.transactionResponse.errors.error[0].errorText)
        # Or, print errors if the API request wasn't successful
        else:
            print('Failed Transaction.')
            if hasattr(response, 'transactionResponse') is True and hasattr(
                    response.transactionResponse, 'errors') is True:
                print('Error Code: %s' % str(
                    response.transactionResponse.errors.error[0].errorCode))
                print('Error message: %s' %
                      response.transactionResponse.errors.error[0].errorText)
            else:
                print('Error Code: %s' %
                      response.messages.message[0]['code'].text)
                print('Error message: %s' %
                      response.messages.message[0]['text'].text)
    else:
        print('Null Response.')

    return str(response)

# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
from pymongo import MongoClient
from flask import Flask, request, jsonify, Response
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#testing
@app.route('/', methods=['GET'])
def test():
    return "hello world"

# create a user  phone# password
@app.route('/create_user', methods=['POST'])
def create_user():
    try:
        client = MongoClient('mongodb://admin:admin@hackwestern-shard-00-00-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-01-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-02-4qcqm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=hackWestern-shard-0&authSource=admin')
        db = client['Dolphin']
        collection = db['Users']
    except:
        return 'error connecting to mongo!'
    finally:
        client.close()
    
    user = {"wallet_id": request.get_json()['wallet_id'],
            "password": request.get_json()['password'],
            "balance": 0,
            "in_app_transactions": [],
            "out_app_transactions": [] }
    
    collection.insert_one(user)
    client.close()
    return Response("Sucess")
    
# updates database transations from local chirp
@app.route('/update_transactions', methods=['POST'])
def transaction_data():
    try: 
        client = MongoClient('mongodb://admin:admin@hackwestern-shard-00-00-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-01-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-02-4qcqm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=hackWestern-shard-0&authSource=admin')
        db = client['Dolphin']
        collection = db['Users']
    except:
        return 'error connecting to mongo!'
    finally:
        client.close()
    
    for i in request.to_json():
        collection.update_one({'wallet_id':i['wallet_id']}, 
                           {"$push": {"balance":i['balance'],
                                      "date": i['date'],
                                      "amount":i['amount'],
                                      "wallet_id":i['wallet_id']}})
    return "sucess!"

# updates a users balance
@app.route('/update_user', methods=['POST'])
def user_data():
    try:
        client = MongoClient('mongodb://admin:admin@hackwestern-shard-00-00-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-01-4qcqm.gcp.mongodb.net:27017,hackwestern-shard-00-02-4qcqm.gcp.mongodb.net:27017/test?ssl=true&replicaSet=hackWestern-shard-0&authSource=admin')
        db = client['Dolphin']
        collection = db['Users']
    except:
        return 'error connecting to mongo!'
    finally:
        client.close()
        
    collection.update_one({'wallet_id':request.get_json()['wallet_id']}, 
                           {"$set": {"balance":request.get_json()['balance']}}, upsert=False)
    client.close()


# withdraw money from Dolphin
@app.route('/withdraw', methods=['POST'])
def withdraw_data():
    return credit_bank_account(str(request))

# deposit money to Dolphin
@app.route('/deposit', methods=['POST'])
def deposit_data():
    return charge_credit_card(str(request))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)

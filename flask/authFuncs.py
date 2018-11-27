import requests


"""
Charge a credit card
"""

import imp
import os
import sys

from authorizenet import apicontractsv1
from authorizenet.apicontrollers import createTransactionController

'''
This is the format for the data type for charge_credit_card.
data = {
    "createTransactionRequest": {
        "merchantAuthentication": {
            "name": "API_LOGIN_ID",
            "transactionKey": "API_TRANSACTION_KEY"
        },
                "refId": "123456", 
        "transactionRequest": {
            "transactionType": "authCaptureTransaction",
            "amount": "5",
            "payment": {
                "creditCard": {
                    "cardNumber": "5424000000000015",
                    "expirationDate": "2020-12",
                    "cardCode": "999"
                }
            }
        }
    }
}
'''

def charge_credit_card(data):

    # Create a merchantAuthenticationType object with authentication details
    # retrieved from the constants file
    merchantAuth = apicontractsv1.merchantAuthenticationType()
    merchantAuth.name = "2U6x9AuE"
    merchantAuth.transactionKey = "5KY6z6r64HtK8kgv"

    # Create the payment data for a credit card
    creditCard = apicontractsv1.creditCardType()
    creditCard.cardNumber = data["createTransactionRequest"]["transactionRequest"]["payment"]["creditCard"]["cardNumber"]
    creditCard.expirationDate = data["createTransactionRequest"]["transactionRequest"]["payment"]["creditCard"]["expirationDate"]
    creditCard.cardCode = data["createTransactionRequest"]["transactionRequest"]["payment"]["creditCard"]["cardCode"]

    # Add the payment data to a paymentType object
    payment = apicontractsv1.paymentType()
    payment.creditCard = creditCard
  

    # Create a transactionRequestType object and add the previous objects to it.
    transactionrequest = apicontractsv1.transactionRequestType()
    transactionrequest.transactionType = "authCaptureTransaction"
    transactionrequest.amount = data["createTransactionRequest"]["transactionRequest"]["amount"]
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
    "createTransactionRequest": {
        "merchantAuthentication": {
            "name": "API_LOGIN_ID",
            "transactionKey": "API_TRANSACTION_KEY"
        },
        "refId": "123456",
        "transactionRequest": {
            "transactionType": "refundTransaction",
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

def credit_bank_account(data2):
    """
    Credit a bank account
    """
    # Create a merchantAuthenticationType object with authentication details
    # retrieved from the constants file
    merchantAuth = apicontractsv1.merchantAuthenticationType()
    merchantAuth.name = "2U6x9AuE"
    merchantAuth.transactionKey = "5KY6z6r64HtK8kgv"

    # Create the payment data for a bank account
    bankAccount = apicontractsv1.bankAccountType()
    accountType = apicontractsv1.bankAccountTypeEnum
    bankAccount.accountType = accountType.checking
    bankAccount.routingNumber = data2["createTransactionRequest"]["transactionRequest"]["payment"]["bankAccount"]["routingNumber"]
    bankAccount.accountNumber = data2["createTransactionRequest"]["transactionRequest"]["payment"]["bankAccount"]["accountNumber"]
    bankAccount.nameOnAccount = data2["createTransactionRequest"]["transactionRequest"]["payment"]["bankAccount"]["nameOnAccount"]

    # Add the payment data to a paymentType object
    payment = apicontractsv1.paymentType()
    payment.bankAccount = bankAccount

    # Create a transactionRequestType object and add the previous objects to it.
    transactionrequest = apicontractsv1.transactionRequestType()
    transactionrequest.transactionType = "refundTransaction"
    transactionrequest.amount = data2["createTransactionRequest"]["transactionRequest"]["amount"]
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




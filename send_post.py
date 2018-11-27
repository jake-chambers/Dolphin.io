import requests

credit_info = {"amount" : 5,
        "creditCard": {
                    "cardNumber": "5424000000000015",
                    "expirationDate": "2020-12",
                    "cardCode": "999" }
        }
        
user_info = { "wallet_id":6098949486,
              "balance":2988 }

r = requests.post("http://35.231.228.196:80/update_user", json=user_info)

print(r)
print(r.text)

data = r.text

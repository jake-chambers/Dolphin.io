const { Chirp } = ChirpConnectSDK;
var processData;
var myWallet_id = "1234567589";
var transaction = {};
sendPressed = false;
var balance = 0;
var transactions = [];


var stateText = document.getElementById("state");
var infoText = document.getElementById("info");
var moneyText = document.getElementById("money");
var moneyz;
var whom;



var sendChirp = function () {
  sendPressed = true;
  stateText.innerHTML = "Sending";
  infoText.innerHTML = "awaiting transaction validation"
  receiveChirp();
}
var receiveChirp = function () {

  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    },
    onReceived: data => {
      stateText.innerHTML = "Received"
      if (data.length > 0) {
        console.log(data);
        processData = data;
        convertDataAndSave();
      }
    }
  }).then(sdk => {
    if (sendPressed) {
      //first arg is phone number of person you send to
      var toSend = document.getElementById("amount").value;
      var toSendTo = document.getElementById("phoneNumberToSendTo2").value;

      moneyz = toSend;
      whom = toSendTo;

      sdk.send(toSendTo + "," + toSend);

      sendPressed = false;
    }

  }).catch(console.error)
}
var stopSDK = function () {
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    },
  }).then(sdk => {
    sdk.stop();
  }).catch(console.error)
}

var convertDataAndSave = function () {
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    }
  }).then(sdk => {
    var ASCIIData = hex2a(sdk.asString(processData));
    var splitData = ASCIIData.split(",");

    if (splitData[0] == "1") {
      infoText.innerHTML = "Transaction Success"
      moneyText.innerHTML = "Sent $" + moneyz + " to " + whom;
      sendMoney();

      sdk.stop();
    } else if (splitData[0] == "0") {
      infoText.innerHTML = "Transaction Failure"
      sdk.stop();
    }
    //date: is the current time stamp, type: always received in this case, wallet_id: id for user wallet, amount: is amount $
    else if (myWallet_id == splitData[0]) {
      whom = splitData[0];
      moneyz = splitData[1];
      // localStorage.clear();
      transaction =
        {
          "date": new Date(),
          "type": "received",
          "wallet_id": splitData[0],
          "amount": splitData[1]
        };
        transactions.push(transaction);
      // localStorage.setItem('transaction', JSON.stringify(transactions));
      infoText.innerHTML = "Proceed with transaction"
      moneyText.innerHTML = "Received $" + moneyz + " from " + whom;
      sdk.send("1");


      sdk.stop();
    } else {

      infoText.innerHTML = "Cancel the transaction"
      sdk.send("0");

      sdk.stop();

    }
  }).catch(console.error)
}

var hex2a = function (hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}


var updateWallet = function () {
  var cardNumber = document.getElementById("cardNumber").value;
  var expiryDate = document.getElementById("expiryDate").value;
  var cardCode = document.getElementById("cardCode").value;
  var amountToAdd = document.getElementById("amountToAdd").value;
  balance += parseFloat(amountToAdd);

  const url = 'http://35.243.145.177:80/deposit';
 
  console.log("updated");
  var data = {
    "amount": amountToAdd,
    "creditCard": {
      "cardNumber": cardNumber,
      "expirationDate": expiryDate,
      "cardCode": cardCode
    }
  }

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (err, results) {
    console.log(err, results);
  })
}

var withdrawFromWallet = function () {
  var accountType = document.getElementById("accountType").value;
  var routingNumber = document.getElementById("routingNumber").value;
  var accountNumber = document.getElementById("accountNumber").value;
  var nameOnAccount = document.getElementById("nameOnAccount").value;
  var amountToTakeOut = document.getElementById("amountToTakeOut").value;
  balance -= parseFloat(amountToTakeOut);
  const url = 'http://35.243.145.177:80/withdraw'; //CHECK URL
  console.log("withdraw");
  var data = { "amount": "5", "routingNumber": "121042882", "accountNumber": "1234567890", "nameOnAccount": "jon doe" }

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (err, results) {
    console.log(err, results);
  })
}

var userSignUp = function () {
  var phoneNumber = document.getElementById("phoneNumber").value;
  var password = document.getElementById('registerPassword').value;
  const url = 'http://35.243.145.177:80/create_user';
  console.log("signed up")

  var data = { "wallet_id": phoneNumber, "password": password}

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (err, results) {
    console.log(err, results);
  })
}

//FINISH
var sendMoney = function () {
  var phoneNumber = document.getElementById("phoneNumberToSendTo2").value;
  var amountToTakeOut = document.getElementById("amount").value;
  balance -= parseFloat(amountToTakeOut);

  const url = 'http://35.243.145.177:80//update_transactions'; //CHECK URL
  var data = { "amount": amountToTakeOut, "wallet_id_recipient": phoneNumber, "wallet_id_sender": myWallet_id}

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (err, results) {
    console.log(err, results);
  })
}
/*

*/

/*https://jsonplaceholder.typicode.com/posts   TEST FOR POST METHOD
*/
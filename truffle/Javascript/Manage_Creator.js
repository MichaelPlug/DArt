$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddressPatron = '0x1E13d16F6ee9B5b6a6723d52ce2E68217a520898';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONPatron = "../build/contracts/Patron.json"
// Set the contract address
var contractAddressMain = '0xD16739F53FbB7530Cfe2B9068e155c682Ae8B676';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONMain = "../build/contracts/DArt.json"
// Set the contract address
var contractAddressDCoin = '-'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONDCoin = "../build/contracts/DCoin.json"
// Set the contract address
var contractAddressVerification = '0x60e1FFB72b18e485c6d31E9934B4F62090478faE'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONVerification = "../build/contracts/Verification.json"
// Set the sending address


var senderAddress = '0x0';
// Set contract ABI and the contract
var contractPatron = null;
var contractMain = null;
var contractDCoin = null;

var x = document.getElementById("div_creator");
x.style.display = "none";


var balance = 0;

$(window).on('load', function() {
  initialise(contractAddressPatron,contractAddressMain,contractAddressDCoin,contractAddressVerification);
});

console.log(window.ethereum);

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}


      
// Asynchronous function (to work with modules loaded on the go)
// For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function
async function initialise(contractAddressPatron,contractAddressMain, contractAddressDCoin) {
  // Initialisation of Web3
	if (typeof web3 !== 'undefined') {
	  web3 = new Web3(web3.currentProvider);
	} else {
	  // Set the provider you want from Web3.providers
    // Use the WebSocketProvider to enable events subscription.
	  web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));
	}
	

  // Load the ABI. We await the loading is done through "await"
  // More on the await operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  await $.getJSON(contractJSONPatron,
    function( contractData ) { // Use of IIFEs: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
      // console.log(contractAbi);
      contractPatron = new web3.eth.Contract(contractData.abi, contractAddressPatron);
    }
  ).catch((error) => { console.error(error); });
  // Arrow funcction expression at work. For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

  if (!contractPatron) {
    console.error("No contract loaded.");
    return false;
  }

    // Load the ABI. We await the loading is done through "await"
  // More on the await operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  await $.getJSON(contractJSONMain,
    function( contractData ) { // Use of IIFEs: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
      // console.log(contractAbi);
      contractMain = new web3.eth.Contract(contractData.abi, contractAddressMain);
    }
  ).catch((error) => { console.error(error); });
  // Arrow funcction expression at work. For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

  if (!contractMain) {
    console.error("No contract loaded.");
    return false;
  }

      // Load the ABI. We await the loading is done through "await"
  // More on the await operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  await $.getJSON(contractJSONDCoin,
    function( contractData ) { // Use of IIFEs: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
      // console.log(contractAbi);
      contractDCoin = new web3.eth.Contract(contractData.abi, contractAddressDCoin);
    }
  ).catch((error) => { console.error(error); });
  // Arrow funcction expression at work. For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

  if (!contractDCoin) {
    console.error("No contract loaded.");
    return false;
  }

        // Load the ABI. We await the loading is done through "await"
  // More on the await operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  await $.getJSON(contractJSONVerification,
    function( contractData ) { // Use of IIFEs: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
      // console.log(contractAbi);
      contractVerification = new web3.eth.Contract(contractData.abi, contractAddressVerification);
    }
  ).catch((error) => { console.error(error); });
  // Arrow funcction expression at work. For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

  if (!contractVerification) {
    console.error("No contract loaded.");
    return false;
  }

	// Set the address from which transactions are sent
	accounts = await web3.eth.getAccounts();
	// console.log(accounts[0])
	senderAddress = accounts[0]
	console.log("Sender address set: " + senderAddress)

  $("#myaccountaddress").html(senderAddress);
  
	// Subscribe to all events by the contract
	contractPatron.events.allEvents(
	callback=function(error, event){ // A "function object". Explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#The_function_expression_(function_expression)
      if (error) {
        console.error(error)
      }
      console.log(event);
  });
  
  //VerifyCreator_FirstStep();
  
  VerifyCreator_SecondStep();

}

function VerifyCreator_FirstStep() {
 
  contractVerification.methods.isVerified(senderAddress).call({from:senderAddress, gas: 120000}).then(function(res) { // A promise in action
    
    if (res == true) {
      console.log("okay user verified");
      

    }
    else {
      console.log("No Registered User");
      alert("You Are Not The Creator, Not Possible To Do Anithing Here");
      // Simulate a mouse click:
      window.location.href = "../index.html";
    }
      
  })
  
  
  
  
}

function VerifyCreator_SecondStep(){
  console.log(contractMain);
  contractMain.methods.creator().call().then(function(res) {
    console.log(res)
    if (res == senderAddress) {
      console.log("YOU ARE MY CREATOR !!");
      
      var x = document.getElementById("div_creator");
      x.style.display = "block";
    }
    else {
      console.log("You Are Not My Creator!!");
      alert("You Are Not The Creator, Not Possible To Do Anithing Here");
        // Simulate a mouse click:
        window.location.href = "../index.html";
    }
  });  
}

function setContracts(){
  var contractAddressMain = $('#mainAddress').val();
  var contractAddressPatron = $('#patronAddress').val();
  var contractAddressVerification = $('#verificationAddress').val();
  var contractAddressDcoin = $('#dcoinAddress').val();


  contractMain.methods.setContracts(contractAddressDcoin, contractAddressVerification, contractAddressPatron).call({from:senderAddress}).then(function(res) {
    contractMain.methods.setContracts(contractAddressDcoin, contractAddressVerification, contractAddressPatron).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Dart bridge setted");
    });
  });

  console.log(contractPatron)
  //typo nello smartcontract
  contractPatron.methods.setContrats(contractAddressMain, contractAddressDcoin).call({from:senderAddress}).then(function(res) {
    contractPatron.methods.setContrats(contractAddressMain, contractAddressDcoin).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Patron bridge setted");
    });
  });

  contractVerification.methods.setContracts(contractAddressDcoin).call({from:senderAddress}).then(function(res) {
    contractVerification.methods.setContracts(contractAddressDcoin).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Verification bridge setted");
    });
  });
    //typo nello smartcontract
  contractDCoin.methods.setContrats(contractAddressMain, contractAddressVerification, contractAddressPatron).call({from:senderAddress}).then(function(res) {
    contractDCoin.methods.setContrats(contractAddressMain, contractAddressVerification, contractAddressPatron).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Dcoin bridge setted");
    });
  });
  return false;
}

function setPrices(){
  var artworkPrice = $('#ArtworkPrice').val();
  var exibithionPrice = $('#ExibithionPrice').val();
  var activityPrice = $('#ActivityPrice').val();
  var verificationPrice = $('#VerificationPrice').val();
  console.log(artworkPrice)
  if (artworkPrice == "" || exibithionPrice < ""  || activityPrice < "" || verificationPrice < "") {
    alert("prices cannot be void");
    return false;
};
  if (artworkPrice < 0 || exibithionPrice < 0  || activityPrice < 0 || verificationPrice < 0) {
      alert("prices cannot be negatives");
      return false;
  };
  console.log(artworkPrice);
  contractDCoin.methods.setCostOfServices([artworkPrice, exibithionPrice, activityPrice, verificationPrice]).call({from:senderAddress}).then(function(res) {
    contractDCoin.methods.setCostOfServices([artworkPrice, exibithionPrice, activityPrice, verificationPrice]).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Prices setted");
    });
  });
  return false;
}

function museumCreation(){

  var museumAddress = $('#museumAddress').val();
  var nameRequester = $('#nameRequester').val();
  var role = $('#ROLE').val();
  
  const hash_nameRequester = web3.utils.keccak256(nameRequester);
  
  console.log(contractVerification);
  console.log(senderAddress);
  contractVerification.methods.museumCreation(hash_nameRequester, role, museumAddress).call({from:senderAddress}).then(function(res) {
    contractVerification.methods.museumCreation(hash_nameRequester, role, museumAddress).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Museum created");
    });
  });
  return false;
};

function withdraw(){
  console.log(contractDCoin);
  contractDCoin.methods.burned().call().then(function(res) {
    if (res >= 0) {
      contractDCoin.methods.withdrawETH().call({from:senderAddress}).then(function(res) {
        contractDCoin.methods.withdrawETH().send({from:senderAddress}).on('receipt', function(receipt){
            console.log("Burned coins withdrawn");
        });
      });
  };
  });
  return false;
};

function terminate(){
  console.log(contractDCoin);
  contractDCoin.methods.terminate().call({from:senderAddress}).then(function(res) {
    contractDCoin.methods.withdrawETH().send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Burned coins withdrawn");
    });
  });
  return false;
};


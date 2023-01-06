$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddressPatron = '0x9E17919922a8F54344792AC77a98D6E1612D2f1f';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONPatron = "../build/contracts/Patron.json"
// Set the contract address
var contractAddressMain = '0x4C041750C5352882A90f58b2e19E70DB91AA1791';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONMain = "../build/contracts/DArt.json"
// Set the contract address
var contractAddressDCoin = '0xDdED9496cB974a779b3Bba2114F3cC8DAD25d505'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONDCoin = "../build/contracts/DCoin.json"
// Set the contract address
var contractAddressVerification = '0x49A2Cc98fD54DC09CF990503D7a350B4e4b08ed1'; // Di Michele
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
  
  VerifyCreator_FirstStep();
  
  VerifyCreator_SecondStep();
  
  var x = document.getElementById("div_creator");
      x.style.display = "block";

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

  let sender = contractVerification.creator;
  
  console.log(sender);
  
  if (sender == senderAddress) {
    console.log("YOU ARE MY CREATOR !!");
  }
  
  else {
    console.log("You Are Not My Creator!!");
    alert("You Are Not The Creator, Not Possible To Do Anithing Here");
      // Simulate a mouse click:
      window.location.href = "../index.html";
    
  }
  
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


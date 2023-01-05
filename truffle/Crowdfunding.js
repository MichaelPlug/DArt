$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddressPatron = '0x941D9C0F4788264884a85970f017cf2D1ebF60F6'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONPatron = "./json/Verifcation.json"
// Set the contract address
var contractAddressMain = '0x5Ce39a981b1BFA155Dbd729D4a29C714b6D3aD48'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONMain = "./json/DArt.json"
// Set the contract address
var contractDCoin = '0x5Ce39a981b1BFA155Dbd729D4a29C714b6D3aD48'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONDCoin = "./json/DArt.json"
// Set the sending address
var senderAddress = '0x0';
// Set contract ABI and the contract
var contract = null;

var balance = 0;

$(window).on('load', function() {
  initialise(contractAddress);
});

console.log(window.ethereum);

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}
const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  console.log("clicked")
  ethereum.request({ method: 'eth_requestAccounts' });
});


// Asynchronous function (to work with modules loaded on the go)
// For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function
async function initialise(contractAddress) {
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

	// Set the address from which transactions are sent
	accounts = await web3.eth.getAccounts();
	// console.log(accounts[0])
	senderAddress = accounts[0]
	console.log("Sender address set: " + senderAddress)

	// Subscribe to all events by the contract
	contractPatron.events.allEvents(
	callback=function(error, event){ // A "function object". Explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#The_function_expression_(function_expression)
      if (error) {
        console.error(error)
      }
      console.log(event);
  });

  showBalance();
}

function searchArtwork(){
  var artwork = $('#artworkid').val();
  console.log("Loading your artwork");

  contractMain.methods.verifiedArtworks(artwork).call({from:senderAddress, gas: 120000, value: cost}).then(function(result) { // A promise in action
    //console.log("Guess buy: " + mint);
  // Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
  contractMain.methods.mint().send({from:senderAddress, gas: 120000, value: cost}).on('receipt', function(receipt){
    console.log("Hash?: " + receipt.transactionHash);
    showBalance();
  });
};

function showBalance(){ 
  console.log("Loading your balance");
  contractDCoin.methods.balance(senderAddress).call().then(function(res) {
    document.getElementById("balance").innerHTML = "Your balance is " + res + " DCoins";
    balance = res;
  });
  return false;
}
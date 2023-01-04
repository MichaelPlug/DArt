// Prevent forms from submitting and reloading the page
$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddress = '0x521405d831d3E9c42Ec226acd5B6C5023637060d';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSON = "./json/Verification.json"
// Set the sending address
var senderAddress = '0x0';
// Set contract ABI and the contract
var contract = null;

$(window).on('load', function() {
	initialise(contractAddress);
  });
  
  console.log(window.ethereum)
  console.log("HEY")
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
	await $.getJSON(contractJSON,
	  function( contractData ) { // Use of IIFEs: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
		// console.log(contractAbi);
		contract = new web3.eth.Contract(contractData.abi, contractAddress);
	  }
	).catch((error) => { console.error(error); });
	// Arrow funcction expression at work. For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
	console.log(contract)
	if (!contract) {
	  console.error("No contract loaded.");
	  return false;
	}
  
	  // Set the address from which transactions are sent
	  accounts = await web3.eth.getAccounts();
	  // console.log(accounts[0])
	  senderAddress = accounts[0]
	  console.log("Sender address set: " + senderAddress)
  
	  // Subscribe to all events by the contract
	  contract.events.allEvents(
	  callback=function(error, event){ // A "function object". Explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#The_function_expression_(function_expression)
		if (error) {
		  console.error(error)
		}
		console.log(event);
	});
  }  
  
function test1() {
	console.log(contract)

	contract.method.isVerified().send(senderAddress, {from:senderAddress, gas: 120000}).on('receipt', function(receipt){
		console.log("Hash?: " + receipt.transactionHash);
	});

	console.log("Fatto?")

	contract.methods.museumRequestCreation().call({from:senderAddress, gas: 120000}).then(function(result) { // A promise in action
		console.log("OKino")
	})

	// Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
	contract.methods.museumRequestCreation().send({from:senderAddress, gas: 120000}).on('receipt', function(receipt){
		console.log("Hash?: " + receipt.transactionHash);
	});
  
	  return false;
}

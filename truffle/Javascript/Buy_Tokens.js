$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddress = '0x969129fF2D473C2aDB67EBfbed3Ba4DBb07867b2'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSON = "../build/contracts/DCoin.json"
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

  if (!contract) {
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
	contract.events.allEvents(
	callback=function(error, event){ // A "function object". Explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#The_function_expression_(function_expression)
      if (error) {
        console.error(error)
      }
      console.log(event);
  });

  showBalance();
}

function buy(){
  console.log(contract)
  var tokentobuy = $('#toketobuy').val();

  if (tokentobuy < 1) {
		alert("The given guess should be higher than 0");
		return false;
	}
	// Add the log entry on the console
	console.log("Buying " + tokentobuy + " dcoins");
  const cost = tokentobuy*2*(10**15);
  console.log(cost);
	contract.methods.mint().call({from:senderAddress, gas: 120000, value: cost}).then(function(result) { // A promise in action
      //console.log("Guess buy: " + mint);
    // Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
    contract.methods.mint().send({from:senderAddress, gas: 120000, value: cost}).on('receipt', function(receipt){
      console.log("Hash?: " + receipt.transactionHash);
      showBalance();
    });
  })
	return false;
}

function sell(){
  console.log(contract)
  var tokentosell = $('#toketosell').val();
  console.log("Hai " + balance + " e vendi " + tokentosell);
  console.log(tokentosell > balance);
  if (tokentosell < 1) {
    alert("The amount of tokens to sell should be higher than 0");
    return false;
  }
  if (tokentosell > balance){
    alert("You don't have enough DCoin, check your balance");
    return false;
  }
  contract.methods.balance(senderAddress).call(tokentosell).then(function(res) {
    console.log("Guess sell: " + tokentosell);
  });

	// Add the log entry on the console
	console.log("Selling " + tokentosell + " dcoins");

	contract.methods.withdraw(tokentosell).call({from:senderAddress}).then(function(result) { // A promise in action
    console.log("Guess buy: " + sell);
    // Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
    contract.methods.withdraw(tokentosell).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Hash?: " + receipt.transactionHash);
      showBalance();
    });
  })
	return false;
};

function transfer(){
  
  var tokentotransfer = $('#tokentotrans').val();

  var receiver_address = $('#receiver_address').val()
  if (tokentotransfer < 1) {
    alert("The amount of tokens to transfer should be higher than 0");
    return false;
  }
	// Add the log entry on the console
	console.log("Transferring " + tokentotransfer + " DCoins to: " + receiver_address);

	contract.methods.transfer(tokentotransfer, receiver_address).call({from:senderAddress}).then(function(result) { // A promise in action
    console.log("Guess buy: " + transfer);
    // Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
    contract.methods.transfer(tokentotransfer, receiver_address).send({from:senderAddress}).on('receipt', function(receipt){
      console.log("Hash?: " + receipt.transactionHash);
      showBalance();
    });
  })



	return false;
};

function showBalance(){ 
  console.log("Loading your balance");
  contract.methods.balance(senderAddress).call().then(function(res) {
    document.getElementById("balance").innerHTML = "<h5><b><i>Your balance is " + res + " DCoins</b></i></h5>";
    balance = res;
  });
  return false;
}

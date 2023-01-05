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

	// Subscribe to all events by the contract
	contract.events.allEvents(
	callback=function(error, event){ // A "function object". Explained here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#The_function_expression_(function_expression)
      if (error) {
        console.error(error)
      }
      console.log(event);
  });
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

	contract.methods.mint().call({from:senderAddress, gas: 120000, value: 50000000000000000}).then(function(result) { // A promise in action
      console.log("Guess buy: " + mint);
  })
  // Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
  contract.methods.mint().send({from:senderAddress, gas: 120000, value: 50000000000000000}).on('receipt', function(receipt){
      console.log("Hash?: " + receipt.transactionHash);
  });

	return false;
}


function submit_for_verification() {
	
  var name = $('#name_id').val();
  var role = $('#role_id').val();
  var role_int = 0;
  
  if (role == "MUSEUM") {
    
    role_int = 0;
  }
  
  if (role == "GALLERY") {
    
    role_int = 1;
  }
    
  
  if (role == "PRIVATE_COLLECTOR") {
    
    role_int = 2;
  }
    
  if (role == "ARTIST") {
    
    role_int = 3;
  }
    
  if (role == "PROTECTION_LAB") {
    
    role_int = 4;
  }
  
  console.log(name + " " + role + " " + role_int);
  
  console.log(senderAddress);
  
  contract.methods.isVerified(senderAddress).call({from:senderAddress, gas: 120000}).then(function(result) { // A promise in action
      console.log("Element present in DArt: " + result);
      
      if (result == false) {
        
        contract.methods.hashString(name).call({from:senderAddress, gas: 120000}).then(function(hash) { // A promise in action
        
          console.log("Hash of : " + name + " is: " + hash);
          
          contract.methods.museumRequestCreation(hash, role_int).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
            
            
            // Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
            contract.methods.museumRequestCreation(hash, role_int).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
              console.log("All Good, Registration Done")
            
              alert("All Good, Registration Done, Wait Our Confirmation");
            
            });
            
            
          })
          
          
          
        
        })
        
        
        
      }
      
      
        
        
  })
  
	  return false;
}

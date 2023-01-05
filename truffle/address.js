// Prevent forms from submitting and reloading the page
$("form").submit(function(e){e.preventDefault();});

// Set the sending address
var senderAddress = '0x0';
// Set contract ABI and the contract
var contract = null;

$(window).on('load', function() {
  initialise();
});

// Asynchronous function (to work with modules loaded on the go)
// For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function
async function initialise() {
  // Initialisation of Web3
	if (typeof web3 !== 'undefined') {
	  web3 = new Web3(web3.currentProvider);
	} else {
	  // Set the provider you want from Web3.providers
    // Use the WebSocketProvider to enable events subscription.
	  web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));
	}

 
	// Set the address from which transactions are sent
	accounts = await web3.eth.getAccounts();
    
	senderAddress = accounts[0];
	console.log("Sender address set: " + accounts);
  
  if (accounts == '') {
    console.log("You Are Not Connected To MetaMask: Please Connect Clicking The Button");
    
  }
  else {
  
    console.log("okay");
    displayAccountAddress();
    
  }
  
  
  // Update the information displayed
  
}

// Displays the account address
function displayAccountAddress() {
	$("#myaccountaddress").html(senderAddress);
}


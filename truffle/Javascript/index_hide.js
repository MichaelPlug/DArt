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
	
	const ethereumButton = document.querySelector('.enableEthereumButton');

    ethereumButton.addEventListener('click', () => {
        //Will Start the metamask extension
        console.log("clicked")
        ethereum.request({ method: 'eth_requestAccounts' });
    });


 
	// Set the address from which transactions are sent
	accounts = await web3.eth.getAccounts();
    
	senderAddress = accounts[0];
	console.log("Sender address set: " + accounts);
  
  if (accounts == '') {
    console.log("You Are Not Connected To MetaMask: Please Connect Clicking The Button");
    //$("isShow").hide();
    var x = document.getElementById("isShow");
    x.style.display = "none"; //hide
    var x = document.getElementById("clickable");
    x.style.display = "block"; //show
    var x = document.getElementById("isShowRegistration");
    x.style.display = "none";
    var x = document.getElementById("isShowTokens");
    x.style.display = "none";
    var x = document.getElementById("isShowManagement");
    x.style.display = "none";
    
    //hide(document.getElementById("#clickable"));
  }
  else {
      
    var x = document.getElementById("isShow");
    x.style.display = "block";
    var x = document.getElementById("clickable");
    x.style.display = "none";
    var x = document.getElementById("isShowRegistration");
    x.style.display = "block";
    var x = document.getElementById("isShowTokens");
    x.style.display = "block";
    var x = document.getElementById("isShowManagement");
    x.style.display = "block";
    
    //$("isShow").show();
    //$("#myaccountaddress").html("You Are Not Connected To MetaMask: Please Connect Clicking The Button and Press F5");
    
  }
  
  // Update the information displayed
  displayAccountAddress();
}

// Displays the account address
function displayAccountAddress() {
	$("#myaccountaddress").html(senderAddress);
  $("#clickable").html(senderAddress);
}


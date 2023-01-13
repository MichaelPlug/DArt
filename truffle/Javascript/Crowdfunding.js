$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddressPatron = '0xcd7a9261875DFcc68221d0a93de50fDEB8f3340d';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONPatron = "../build/contracts/Patron.json"
// Set the contract address
var contractAddressMain = '0xD8487F918c94066d5aDe9D0383463626aB538577';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONMain = "../build/contracts/DArt.json"
// Set the contract address
var contractAddressDCoin = '0x969129fF2D473C2aDB67EBfbed3Ba4DBb07867b2'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONDCoin = "../build/contracts/DCoin.json"// Set 

var searchedArtwork = "";

// Set the sending address
var senderAddress = '0x0';
// Set contract ABI and the contract
var contractPatron = null;
var contractDCoin = null;

var balance = 0;

$(window).on('load', function() {
  initialise(contractAddressPatron, contractAddressDCoin);
});

console.log(window.ethereum);

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}

// Asynchronous function (to work with modules loaded on the go)
// For further info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function
async function initialise(contractAddressPatron, contractAddressDCoin) {
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
  };

  console.log(contractAddressDCoin);
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
  };


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
  $("#myaccountaddress").html(senderAddress);

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
  var artwork = $('#artworkname').val();
  var minterArt = $('#minterid').val(); 
  console.log("Loading your artwork");
  //console.log(web3.utils.keccak256(artwork));
  var hashart = web3.utils.keccak256(artwork);
  console.log(hashart);
  contractMain.methods.hashTextAndAddress(hashart).call({from: minterArt}).then(function(id) { 
    contractMain.methods.registeredArtworks(id).call().then(function(result) { // A promise in action
        console.log(result);
        document.getElementById("artworkid").innerHTML = result.hashedName;
        searchedArtwork = id;
        document.getElementById("minter").innerHTML = result.minter;
        document.getElementById("property").innerHTML = result.property;
        document.getElementById("possession").innerHTML = result.possession;
        document.getElementById("exhibition").innerHTML = result.exposedAt;
        document.getElementById("protectionactivity").innerHTML = result.status;
        contractPatron.methods.funds(id).call().then(function(amount) {
           // A promise in action
           document.getElementById("funds").innerHTML = amount;
           return false;
      }); //console.log("Guess buy: " + mint);
    });
  });
  // Notice that call(…) has no side effect on the real contract, whereas send(…) does have a side-effect on the contract state
}

function donate(){
  console.log("donating");
  var toketodonate = $('#toketodonate').val(); 
  contractPatron.methods.crowfunding(searchedArtwork,toketodonate).call({from:senderAddress}).then(function(_) {
    contractPatron.methods.crowfunding(searchedArtwork,toketodonate).send({from:senderAddress}).on('receipt', function(_) {
      console.log("donated");
      return false;
    });
  });
}

function getPatronCredit(){
  var museumAddress = $('#musuemid').val(); 
  contractPatron.methods.hashAddressAndAddress(senderAddress,museumAddress).call().then(function(credit) {
    contractPatron.methods.patronCredit(museumAddress).call().then(function(credit) {
      document.getElementById("patroncredit").innerHTML = credit;
    });
  });
}

function showBalance(){ 
  console.log("Loading your balance");
  contractDCoin.methods.balance(senderAddress).call().then(function(res) {
    document.getElementById("balance").innerHTML = "<h4><b><i>Your balance is " + res + " DCoins</i></b></h4>";
    balance = res;
    console.log("Done..?");
  });
  return false;
}

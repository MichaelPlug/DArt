$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddress = '0xe7EDeefA01a678390eE12FA4427B7BfA13B2458e';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSON = "./build/contracts/DArt.json"
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

function mintArtwork() {
  var artwork_name = $('#artwork_name').val();
  console.log(artwork_name);
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  
  contract.methods.mintArtworkNFT(hash_artwork_name).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.montArtworkNFT(hash_artwork_name).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Insertion of Artwork Done")
      
          alert("All Good, Artwork Inserted");
        
      });
      
  })
  
  return false;
}


function mintExhibition() {
  var exhibition_name = $('#exhibition_name').val();
  var status_int = $('#active_exhibition').val();
  
  var status=true;
  
  if (status_int == 1) {
   
    status = true;
  }
  
  else {
    
    status = false; 
  }
  
  const hash_exhibition_name = web3.utils.keccak256(exhibition_name);
  
  console.log(hash_exhibition_name);
  
  
  
  contract.methods.mintArtworkNFT(hash_exhibition_name, status).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.montArtworkNFT(hash_exhibition_name, status).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Insertion of Exhibition Done")
      
          alert("All Good, Exhibition Inserted");
        
      });
      
  })
  return false;
}


function grantPermission() {
  var address_to = $('#artwork_to_give_possession').val();
  var artwork_name = $('#artwork_name_possession_give').val();
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  contract.methods.allowAccessToArtwork(address_to, artwork_name).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.allowAccessToArtwork(address_to, artwork_name).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Insertion of Exhibition Done")
      
          alert("All Good, Exhibition Inserted");
        
      });
      
  })
  return false;
}


function revokePermission() {
  var artwork_name = $('#artwork_to_revoke_possession').val();
  
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  contract.methods.revokeAccessToArtwork(hash_artwork_name).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.revokeAccessToArtwork(hash_artwork_name).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Revokation of Artwork Done")
      
          alert("All Good, The Possession of Artwork is Revoked");
        
      });
      
  })
  return false;
}


function donateArtwork() {
  var artwork_name = $('#artwork_to_donate').val();
  var address_to = $('#to_address_donation').val();
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  contract.methods.donateWorkOfArt(hash_artwork_name, address_to).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.donateWorkOfArt(hash_artwork_name, address_to).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Donation of Artwork Done")
      
          alert("All Good, The Artwork is Donated. Thanks :)");
        
      });
      
  })
  return false;
}


function createActivity() {
  var artwork_name = $('#artwork_to_restore').val();
  
  var intervention = $('#intervention_id').val();
  
  var extra_info = $('#extra_info').val();
  
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  const hash_extra_info = web3.utils.keccak256(extra_info);
  
  console.log(hash_artwork_name);
  
  console.log(hash_extra_info);
  
  contract.methods.createActivity(hash_artwork_name, intervention, hash_extra_info).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.createActivity(hash_artwork_name, intervention, hash_extra_info).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Creation of Activity Done")
      
          alert("All Good, The Creation of Artwork is Done!");
        
      });
      
  })

}

$("form").submit(function(e){e.preventDefault();});

// Set the contract address
var contractAddress = '0x943038A744b4b3f988b1daF11DAe56eb3327bC31';
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSON = "../build/contracts/DArt.json"


// Set the contract address
var contractAddressVerification = '0xc5f92355177CdD0e07ef4317b5C8Cb83b4B2f3b4'; // Di Michele
// Set the relative URI of the contract’s skeleton (with ABI)
var contractJSONVerification = "../build/contracts/Verification.json"


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
  
  Verify();
  
  Role();
  
}


function Verify() {
 
  contractVerification.methods.isVerified(senderAddress).call({from:senderAddress, gas: 120000}).then(function(res) { // A promise in action
    
    if (res == true) {
      console.log("okay user verified");
      

    }
    else {
      console.log("No Registered User");
      alert("You Are Not Registered, Not Possible To Do Anithing Here");
      // Simulate a mouse click:
      window.location.href = "../index.html";
    }
      
  })
  
  
}


function Role() {

  contractVerification.methods.getRole(senderAddress).call({from:senderAddress, gas: 120000}).then(function(res) { // A promise in action
    
    if (res == 0) {
      console.log("okay museum");
      var x = document.getElementById("museum");
      x.style.display = "block";
      var x = document.getElementById("artist");
      x.style.display = "none";
      var x = document.getElementById("restorer");
      x.style.display = "none";

    }
    if (res == 1) {
      
      console.log("okay private gallery");
      var x = document.getElementById("museum");
      x.style.display = "block";
      var x = document.getElementById("artist");
      x.style.display = "none";
      var x = document.getElementById("restorer");
      x.style.display = "none";
    }
    if (res == 2) {
      console.log("okay PRIVATE_COLLECTOR");
      var x = document.getElementById("museum");
      x.style.display = "none";
      var x = document.getElementById("artist");
      x.style.display = "block";
      var x = document.getElementById("restorer");
      x.style.display = "none";
      
    }
    
    if (res == 3) {
      console.log("okay artist");
      var x = document.getElementById("museum");
      x.style.display = "none";
      var x = document.getElementById("artist");
      x.style.display = "block";
      var x = document.getElementById("restorer");
      x.style.display = "none";
    }
    
    if (res == 4) {
      console.log("okay restorer");
      var x = document.getElementById("museum");
      x.style.display = "none";
      var x = document.getElementById("artist");
      x.style.display = "none";
      var x = document.getElementById("restorer");
      x.style.display = "block";
    }
    
      
  })
  
  
}



function mintArtwork() {
  var artwork_name = $('#artwork_name').val();
  console.log(artwork_name);
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  contract.methods.mintArtworkNFT(hash_artwork_name).call({from:senderAddress}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.mintArtworkNFT(hash_artwork_name).send({from:senderAddress}).on('receipt', function(_){
          console.log("All Good, Insertion of Artwork Done")
      
          alert("All Good, Artwork Inserted");
        
      });
      
  });
  
  return false;
}

function mintArtworkArtist() {
  var artwork_name = $('#artwork_nameArtist').val();
  console.log(artwork_name);
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  
  contract.methods.mintArtworkNFT(hash_artwork_name).call({from:senderAddress}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.mintArtworkNFT(hash_artwork_name).send({from:senderAddress}).on('receipt', function(_){
          console.log("All Good, Insertion of Artwork Done")
      
          alert("All Good, Artwork Inserted");
        
      });
      
  });
  
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
  
    
  contract.methods.mintExibitionNFT(hash_exhibition_name, status).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.mintExibitionNFT(hash_exhibition_name, status).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Insertion of Exhibition Done")
      
          alert("All Good, Exhibition Inserted");
        
      });
      
  })
  return false;
}


function removeExhibition() {
  var exhibition_name = $('#exhibition_to_eliminate').val();
  const hash_exhibition_name = web3.utils.keccak256(exhibition_name);
  contract.methods.hashTextAndAddress(hash_exhibition_name).call({from: senderAddress}).then(function(exhibition_id) {
    contract.methods.endExibition().call({from: senderAddress}).then(function(_) {
      contract.methods.endExibition().send({from: senderAddress}).on('receipt', function(_){
        console.log("Exhibition concluded");
      });
    });
  });
  

  
  return false;
}

function putExhibition() {
  
  var artwork_name = $('#artwork_to_exhibit').val();

  var artwork_minter = $('#artwork_minter_to_exhibit').val();
  
  var exhibition_name = $('#exhibition_for_artwork').val();
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  const hash_exhibition_name = web3.utils.keccak256(exhibition_name);
  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {
    contract.methods.hashTextAndAddress(hash_exhibition_name).call({from: senderAddress}).then(function(exhibition_id) {
      console.log(exhibition_id);
      contract.methods.exposeArtwork(artwork_id, exhibition_id).call({from: senderAddress}).then(function(_) {
        console.log("okay first send");
        contract.methods.exposeArtwork(artwork_id, exhibition_id).send({from: senderAddress}).on('receipt', function(_){
          console.log("All Good, Insertion of Exhibition Done")
        });
      });
    }); 
  });
  
  console.log(hash_artwork_name);
  
  
  return false;
  
}

function toggleExhibition() {
 
  var artwork_name = $('#artwork_to_delete_from_exhibition').val();
  var artwork_minter = $('#artwork_minter_to_delete_from_exhibition').val();
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  //removeArtworkFromExibition
  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {
   contract.methods.removeArtworkFromExibition(artwork_id).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.removeArtworkFromExibition(artwork_id).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Insertion of Exhibition Done")
      
          alert("All Good, Artwork Removed From Exhibition");
        
      });
    }); 
  });
   
  return false;
}

  

function grantPermission() {
  var address_to = $('#artwork_to_give_possession').val();
  var artwork_name = $('#artwork_name_possession_give').val();
  var artwork_minter = $('#artwork_minter_possession_give').val();

  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);

  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {
    contract.methods.allowAccessToArtwork(address_to, artwork_id).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.allowAccessToArtwork(address_to, artwork_id).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Insertion of Exhibition Done")
      
          alert("All Good, Exhibition Inserted");
        
      });
    });
  });
  return false;
}

function grantPermissionArtist() {
  var address_to = $('#artwork_to_give_possession_artist').val();
  var artwork_name = $('#artwork_name_possession_give_artist').val();
  var artwork_minter = $('#artwork_minter_possession_give_artist').val();

  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);

  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {
    contract.methods.allowAccessToArtwork(address_to, artwork_id).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.allowAccessToArtwork(address_to, artwork_id).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Insertion of Exhibition Done")
      
          alert("All Good, Exhibition Inserted");
        
      });
    });
  });
  return false;
}


function revokePermission() {
  var artwork_name = $('#artwork_to_revoke_possession').val();
  var artwork_minter = $('#artwork_minter_revoke_possession').val();
  
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {
    contract.methods.revokeAccessToArtwork(artwork_id).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.revokeAccessToArtwork(artwork_id).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Revokation of Artwork Done")
      
          alert("All Good, The Possession of Artwork is Revoked");
        
      });
    });
  });
  return false;
}

function revokePermissionArtist() {
  var artwork_name = $('#artwork_to_revoke_possession_artist').val();
  var artwork_minter = $('#artwork_minter_revoke_possession_artist').val();
  
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);
  
  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {
    contract.methods.revokeAccessToArtwork(artwork_id).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.revokeAccessToArtwork(artwork_id).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Revokation of Artwork Done")
      
          alert("All Good, The Possession of Artwork is Revoked");
        
      });
    });
  });
  return false;
}


function donateArtwork() {
  var artwork_name = $('#artwork_to_donate').val();
  var artwork_minter = $('#artwork_minter_to_donate').val();
  var address_to = $('#to_address_donation').val();
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);

  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {  
    contract.methods.donateWorkOfArt(hash_artwork_name, address_to).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.donateWorkOfArt(hash_artwork_name, address_to).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Donation of Artwork Done")
      
          alert("All Good, The Artwork is Donated. Thanks :)");
        
      }); 
    });
  });
  return false;
}

function donateArtworkArtist() {
  var artwork_name = $('#artwork_to_donate_artist').val();
  var artwork_minter = $('#artwork_minter_to_donate_artist').val();
  var address_to = $('#to_address_donation_artist').val();
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  console.log(hash_artwork_name);

  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {  
    contract.methods.donateWorkOfArt(hash_artwork_name, address_to).call({from:senderAddress, gas: 120000}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.donateWorkOfArt(hash_artwork_name, address_to).send({from:senderAddress, gas: 120000}).on('receipt', function(_){
          console.log("All Good, Donation of Artwork Done")
      
          alert("All Good, The Artwork is Donated. Thanks :)");
        
      }); 
    });
  });
  return false;
}


function createActivity() {
  var artwork_name = $('#artwork_to_restore').val();
  var artwork_minter = $('#artwork_minter_to_restore').val();
  var intervention = $('#intervention_id').val();
  
  var extra_info = $('#extra_info').val();
  
  
  const hash_artwork_name = web3.utils.keccak256(artwork_name);
  
  const hash_extra_info = web3.utils.keccak256(extra_info);
  
  console.log(hash_artwork_name);
  
  console.log(hash_extra_info);
  
  contract.methods.hashTextAndAddress(hash_artwork_name).call({from: artwork_minter}).then(function(artwork_id) {
    contract.methods.mintActivity(artwork_id, intervention, hash_extra_info).call({from:senderAddress}).then(function(_) { // A promise in action
      console.log("okay first send");
      
      contract.methods.mintActivity(artwork_id, intervention, hash_extra_info).send({from:senderAddress}).on('receipt', function(_){
          console.log("All Good, Creation of Activity Done")
      
          alert("All Good, The Creation of Artwork is Done!");
        
      });
        
    });
  });
}

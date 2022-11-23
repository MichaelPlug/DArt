//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DArt {

    //we have a struct to store the data about artworks
    struct artwork {
        string name;
        string artist;
        string year;
        string additionalNotes;
    }

    //this is the address of the creator MAYBE PRIVATE, namely the owner
    //of the smart contract that it can do some special actions
    address public creator;

    //we have the pending requests for the museums to accept them, by means
    //of the creator
    //address pendingRequestsMuseum[];
    // NOTA: usare un mapping dovrebbe avere un costo computazionale minore
    mapping (address => bool) public isPendingMuseum;
    
    //this is a mapping between museums and artworks related to them
    mapping (address => uint) public museumsArtworks;

    //this is a list that contains all the museums registered to our
    // infrastructure
    address museums[];

    //the first time that we call che smart contract we need to save which is the
    //creator, because it can do after some important actions
    constructor(){
        //so we save the address of the creator, one time and forever
        creator = msg.sender;
    }

    //called by a museum, to add an artwork in blockchain (MAYBE TO DO
    //WITH PENDING REQUESTS TO VERIFY REALLY THE PRESENCE OF THE ARTWORK)
    func artworkCreation(string artwork){
        //declare a variable very large to store an hash, namely the hash
        //that represents the artwork (MAYBE NOT USEFUL TO USE THE HASH)
        bytes32 hash;
        //we compute the hash of the corresponding string, so
        hash = keccak256(artwork)
        //declare a temporary list
        bytes32 tempList[];
        //we extract the list (the value) associated to this specific
        //key of the mapping, so
        tempList = museumArtworks[msg.sender];
        //we add to this extracted list the specific artwork
        tempList.push(artwork);
        //we add this new artwork (string or hash) to the list
        museumArtworks[msg.sender] = tempList;
    }

    //called by a museum that wants to enter in the blockchain
    func museumRequestCreation(){
        //we loop for all the museums
        for (uint i; i < museums.length; i++){ 
            //we see if the specific museum was already been inserted
            if (msg.sender == museums[i]){
                //in this latter case we have an error
                revert()
            }
        }
        //we add the address of the museum to the list of pendings
        pendingRequestsMuseum.push(msg.sender, true);
    }


    //called by a smart contract, given a specificc address
    func museumCreation(address museum){
        //we verify that the address is really the creator
        if (msg.sender != creator){
            //otherwise we end up, an error we have
            revert()
        }
        //we loop all the elements of the pending museums to find
        //really the specific museum that we want
        for (uint i; i < pendingRequestsMuseum.length; i++) {   
            //if it is already exist in our App
            if (pendingRequestsMuseum[i] == museum) {
                //then we revert because we have an error, in fact the
                //museum already exists   
                revert()
            }
        }
        //if the museum does not exist and we are the creator, then we create
        //a list (each museum has associated a list of artworks) of hashes
        bytes32 list[];
        //we add the specific element (empty hash) to this list
        museumArtworks[museum] = list;
    }


    func artworkTransferring(artwork, recipient){
    }

    func artworkRequest(){   
    }

    func artworkRequestDismiss(){    
    }

    func propertyPassage(){   
    }

    func requestProperty(){  
    }

    func putExhibition(){  
    }

    func putWarehouse(){ 
    }

    func beginRestoration(){
    }
}

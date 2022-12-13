//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DArt {

    //we have a struct to store the data about artworks
    struct Artwork {
        bytes32 name;
        bytes32 id;
    }

    // A struct to collect information about exibitions
    struct Exibition {
        bytes32 id;
        bytes32 hashedName;
        bool isOn; // pessimo nome :((((((
    }

    // This enum indicates the type of operation applied to and update of an artwork
    enum Operation {
        PREVENTION,
        PROTECTIOIN,
        MAINTAINANCE,
        RESTAURATION,
        DAMAGE,
        UPDATE
    }

    //this is the address of the creator MAYBE PRIVATE, namely the owner
    //of the smart contract that it can do some special actions
    address public creator;

    //this is a mapping between museums and artworks related to them
    mapping (address => uint) public museumsArtworks;

    mapping (address => Exibtion) public museumExibtions;

    mapping (bytes32 => Artwork) public RegisterdArtworks;

    //the first time that we call che smart contract we need to save which is the
    //creator, because it can do after some important actions
    constructor(){
        //so we save the address of the creator, one time and forever
        creator = msg.sender;
    }

    //called by a museum, to add an artwork in blockchain (MAYBE TO DO
    //WITH PENDING REQUESTS TO VERIFY REALLY THE PRESENCE OF THE ARTWORK)
    //TODO: we have to add some elements as input
    function mintArtworkNFT(string artwork) external {
        if (registeredWallets[msg.sender].verified){
            //we add the artwork to the mapping
            /*
            TODO: all this stuff have to be recoded and we have to decide if use one mapping from address to 
            a list of artworks or a mapping from any artwork to walletts, or both of them
            */
            newArtwork = Artwork(artwork);
            museumsArtworks[msg.sender].push(newArtwork);
        }
        //declare a variable very large to store an hash, namely the hash
        //that represents the artwork (MAYBE NOT USEFUL TO USE THE HASH)
        bytes32 hash;
        //we compute the hash of the corresponding string, so
        hash = keccak256(artwork);
        //declare a temporary list
        bytes32[] tempList;
        //we extract the list (the value) associated to this specific
        //key of the mapping, so
        tempList = museumArtworks[msg.sender];
        //we add to this extracted list the specific artwork
        tempList.push(artwork);
        //we add this new artwork (string or hash) to the list
        museumArtworks[msg.sender] = tempList;
    }
        
    //with this function we want transfer an artwork from a sender (msg.sender) to a recipient one
    function transferArtwork(bytes32 artwork, address recipient) external {
        assert(museums[recipient].verified && museum[msg.sender].verified);

        //we declare something for an hash
        bytes32 hash;

        //we compute the hash of the corresponding string, so
        hash = keccak256(artwork)
        
        //we take the list of all the artworks for the specific museum
        bytes32 list_artworks;
        
        //all the artworks for the specific museum are taken
        list_artworks = museums_artworks[msg.sender]
        
        //we take the modified array, exactly
        uint[] result = delete_element_array_maintaining_order(list_artworks, artwork) 
        
        //if we have an error returned (so the artwork doesn't exist in the specific museum)
        if (result == [-1]) {
        
            //element not found in the specific museum (array associated for the museum) -> in fact we cannot transfer something that doesn't exist
            return;
            
        }
        
        //we need to update the list associated to the specific museum that needs to give the specific artwork, so
        museum_artworks[msg.sender] = result;
        
        //we add the specific artwork to the specific recipient dictionary (it exists for the first check, practically)
        add_element_to_dictionary_list(recipient, artwork, museums_artworks);
    }

    function updateArtwork(bytes32 artwork, bytes32 newArtwork) external {
        assert(museums[msg.sender].verified);

        //we declare something for an hash
        bytes32 hash;

        //we compute the hash of the corresponding string, so
        hash = keccak256(artwork)
        
        //we take the list of all the artworks for the specific museum
        bytes32 list_artworks;
        
        //all the artworks for the specific museum are taken
        list_artworks = museums_artworks[msg.sender]
        
        //we take the modified array, exactly
        uint[] result = delete_element_array_maintaining_order(list_artworks, artwork) 
        
        //if we have an error returned (so the artwork doesn't exist in the specific museum)
        if (result == [-1]) {
        
            //element not found in the specific museum (array associated for the museum) -> in fact we cannot transfer something that doesn't exist
            return;
            
        }
        
        //we need to update the list associated to the specific museum that needs to give the specific artwork, so
        museum_artworks[msg.sender] = result;
        
        //we add the specific artwork to the specific recipient dictionary (it exists for the first check, practically)
        add_element_to_dictionary_list(msg.sender, newArtwork, museums_artworks);
    }

    function artworkRequest(){   
    }

    function artworkRequestDismiss(){    
    }

    function propertyPassage(){ 1\q     1
    }

    function requestProperty(){  

    }

    function putExhibition(){ 
    }

    function putWarehouse(){ 
    }

    function beginRestoration(){
    }
}

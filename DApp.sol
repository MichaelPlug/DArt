//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DArt {

    /* DUBBI:
    Come gestiamo con le nostre strutture dati gli storici? per esempio lo storio delle OPERATIONs.
    Inoltre gli artwork potrebbero avere lo stesso nome, quindi non è univoco, quindi non possiamo usare solo quello
    per hashare, usiamo la data? L'artista? O l'original minter address?

    E se invece dovessimo dire solo lo stato attuale di un artwork?
    */

    //we have a struct to store the data about artworks
    struct Artwork {
        bytes32 name;
        bytes32 id;
        address minter; //the address of the museum that minted the artwork
        address holder;
        address owner;
        exposedAt Exibition; // Da vedere come gestire lo storico delle esposizioni
        status Operation; // Da vedere come gestire lo storico delle operazioni
    }

    // A struct to collect information about exibitions
    struct Exibition {
        bytes32 id;
        bytes32 hashedName;
        address organizer;
        bool isOn; 
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

    //this is a mapping between museums and exibitions related to them
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
    function mintArtworkNFT(string name, string author, string ) external {
        assert(registeredWallets[msg.sender].verified);
        //we add the artwork to the mapping
        /*
        TODO: all this stuff have to be recoded and we have to decide if use one mapping from address to 
        a list of artworks or a mapping from any artwork to walletts, or both of them
        */
        newArtwork = Artwork(artwork);
        museumsArtworks[msg.sender].push(newArtwork);
    }

    function mintExibitionNFT() external {
        
    }
/*
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
*/

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

    function propertyPassage(){
    }

    function requestProperty(){  
    }

    function putExhibition(){ 
    }

    function putWarehouse(){
    }

    function allowAccessToArtwork(address target, bytes32 artwork) external {
        assert(museums[target].verified);
        assert(RegisterdArtworks[artwork].holder == msg.sender);
        RegisterdArtworks[artwork].owner == targert;
    }

    function revokeAccessToArtwork(bytes32 artwork) external {
        assert(RegisterdArtworks[artwork].holder == msg.sender);
        RegisterdArtworks[artwork].owner == 0x0;
    }

    function beginRestoration(){

    }
}

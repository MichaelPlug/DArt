//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DArt {

    //we have a struct to store the data about artworks
    struct Artwork {
        string name;
        string artist;
        string year;
        string additionalNotes;
    }

    struct Wallet{
        address wallet;
        string name;
        string additionalNotes;
        bool verified;
    }

    //this is the address of the creator MAYBE PRIVATE, namely the owner
    //of the smart contract that it can do some special actions
    address public creator;

    //this is a mapping between museums and artworks related to them
    mapping (address => uint) public museumsArtworks;

    //this is a list that contains all the ids registered (true) or pending to be it (false) to DArt
    mapping (address => verifiedWallet) public registeredWallets;

    //the first time that we call che smart contract we need to save which is the
    //creator, because it can do after some important actions
    constructor(){
        //so we save the address of the creator, one time and forever
        creator = msg.sender;
    }

    
    //UTILITY FUNCTIONS
    
    
    //this is an utility function to search, into an array of bytes32 (so of hashes) a specific element (hash element) and if it is found then we return the index, otherwise we return -1 (not found element)
    function search_in_array(bytes32 array, bytes32 element) returns (int) {
        
        //we loop for all the array that we have
        for (uint i; i < array.lenght; i++) {
            
            //if we have found the specific element that we need to find
            if (element == array[i]) {
                    
                //then we return the specific index that it's needed
                return i;
            }
            
        }
        
        //if we don't find anything, then we return an error code, so -1
        return -1;
        
    }
    
    //we delete a specific element (specified by means of an bytes32, NOT index) maintaining the total order of the array that we need to modify
    function delete_element_array_maintaining_order(bytes32 array, bytes32 artwork) returns(uint[]) {
        
        
        //we search the specific element that we need
        int index = search_in_array(list_artworks, artwork)
        
        //if the specific artwork isn't been found then we roll back evertything, maybe also with an error message
        if (index == -1) {
        
            //return a simple error code (we return it like as an array, because the function returns array of elements
            return [-1];
            
        }
        
        //we now loop for all the array from the specified index (the idea is to move all the elements that are after the index position of the array for a position before, obtaining a shifting of all elements, from the index position, to left, so the last position remaining empty and we will remmove this last position -> We do this, otherwise only with the delete operation we will leave a position without values, so a gap, that we will not want and we will preserve the order, so for this reason we don't move only the last element of the array)
        for (uint i = index; i<array.length-1; i++){
        
            //so we shift all the elements from the index position to left
            array[i] = array[i+1];
        
        }
        
        //then we delete the last element of the array
        delete array[array.length-1];
        
        //we decrease the length of the array, because we have removed the last element, exactly
        array.length--;
        
        //we have operated on a local copy of the array, so we need to return the right array modified now
        return array;
            
    }
    
    
    //we add a specific element (hashed artwork) to a dictionary (museums_artworks) for a specific recipient address (recipient museum)
    //the recipient address needs to exist
    function add_element_to_dictionary_list(address recipient, bytes32 artwork, bytes32 museums_artworks) returns (address -> bytes32){
    
        //declare a temporary list
        bytes32 temp_list[];

        //we extract the list (the value) associated to this specific
        //key of the mapping, so
        temp_list = museum_artworks[recipient];

        //we add to this extracted list the specific artwork
        temp_list.push(artwork);

        //we add this new artwork (string or hash) to the list
        museums_artworks[recipient] = temp_list;
        
        return museums_artworks
        
    }

    
    function find_element_list(address list, address recipient) returns (int){
     
        for (uint i; i< list.length; i++){
         
            if (element == list[i]){
             
                return i;
                
            }
        }
        
        return -1;
        
    }

    
    //TERMINATION OF THE UTILITY FUNCTIONS

    
    
    
    
    //called by a museum, to add an artwork in blockchain (MAYBE TO DO
    //WITH PENDING REQUESTS TO VERIFY REALLY THE PRESENCE OF THE ARTWORK)
    func mintArtworkNFT(string artwork){
        if registeredWallets[msg.sender].verified == true{
            //we add the artwork to the mapping
            /*
            TODO: all this stuff have to be recoded and we have to decide if use one mapping from address to 
            a list of artworks or a mapping from any artwork to walletts, or both of them
            */
            newArtwork = Artwork(artwork);
            museumsArtworks[msg.sender] = newArtwork;
        }


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

//mettiamo noi o l'utente queste informazioni? se lo fa l'utente significa che potrebbe richiamare la funzione e resettarle?
    //called by a museum that wants to enter in the blockchain
    func museumRequestCreation(string name, string additionalNotes){
        if registeredWallets[msg.sender].registered == false{
            wallet = Wallet(msg.sender, name, additionalNotes, false);
            registeredwallets[msg.sender] = wallet;
        }
    }


    //called by a smart contract, given a specificc address
    func museumCreation(address museum){
        // veryf the sender is the creator/owner of the smart contract and that there is a pendig reques to register the wallet
        if ((msg.sender == creator && registeredWallets[museum].address != 0x0){
            // change the status of the museum to verified
            registeredWallets[museum].verified = true;
         else {
            revert();
        }
        //if the museum does not exist and we are the creator, then we create
        //a list (each museum has associated a list of artworks) of hashes
        bytes32 list[];
        //we add the specific element (empty hash) to this list
        museumArtworks[museum] = list;
    }
        
    //with this function we want transfer an artwork from a sender (msg.sender) to a recipient one
    function artwork_transferring(bytes32 artwork, address recipient)
    {
        
        int find = find_element_list(museums, recipient)
        
        if (find == -1) {
         
            return;
            
        }
        
        int find = find_element_list(museums, msg.sender)
        
        if (find == -1) {
            
            //we don't need to "revert" because we haven't done anything
            return;
            
        }
        

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

    funcbeginRestoration(){
    }
}

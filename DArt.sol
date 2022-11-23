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

    funcbeginRestoration(){
    }
}

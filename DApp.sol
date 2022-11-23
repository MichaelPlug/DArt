//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DArt {

    /*
    struct artworks
    {
        string name;
        string artist;
        string additional_notes;
    }
    */


    //this is the address of the creator MAYBE PRIVATE, namely the owner
    //of the smart contract that it can do some special actions
    address public creator;

    //we have the pending requests for the museums to accept them, by means
    //of the creator
    address pending_requests_museum;

    //this is a mapping between museums and artworks related to them
    mapping (address => uint) public museums_artworks;

    //this is a list that contains all the museums registered to our
    // infrastructure
    address museums[];

    //the first time that we call che smart contract we need to save which is the
    //creator, because it can do after some important actions
    constructor()
    {

        //so we save the address of the creator, one time and forever
        creator = msg.sender;

    }

    //called by a museum, to add an artwork in blockchain (MAYBE TO DO
    //WITH PENDING REQUESTS TO VERIFY REALLY THE PRESENCE OF THE ARTWORK)
    artwork_creation(string artwork)
    {
        
        //declare a variable very large to store an hash, namely the hash
        //that represents the artwork (MAYBE NOT USEFUL TO USE THE HASH)
        bytes32 hash;

        //we compute the hash of the corresponding string, so
        hash = keccak256(artwork)

        //declare a temporary list
        bytes32 temp_list[];

        //we extract the list (the value) associated to this specific
        //key of the mapping, so
        temp_list = museum_artworks[msg.sender];

        //we add to this extracted list the specific artwork
        temp_list.push(artwork);

        //we add this new artwork (string or hash) to the list
        museum_artworks[msg.sender] = temp_list;


    }

    //called by a museum that wants to enter in the blockchain
    museum_request_creation()
    {

        //we loop for all the museums
        for (uint i; i < museums.length; i++)
        {
            
            //we see if the specific museum was already been inserted
            if (msg.sender == museums[i])
            {

                //in this latter case we have an error
                return

            }

        }
        
        //we add the address of the museum to the list of pendings
        pending_requests_museum.push(msg.sender);

    }


    //called by a smart contract, given a specificc address
    museum_creation(address museum)
    {

        //we verify that the address is really the creator
        if (msg.sender != creator)
        {
            //otherwise we end up, an error we have
            return
        }

        //we loop all the elements of the pending museums to find
        //really the specific museum that we want
        for (uint i; i < pending_requests_museum.length; i++) {
            
            //if it is already exist in our App
            if (pending_requests_museum[i] == museum) {

                //then we return, because we have an error, in fact the
                //museum already exists   
                return
            
            }

        }

        //if the museum does not exist and we are the creator, then we create
        //a list (each museum has associated a list of artworks) of hashes
        bytes32 list[];

        //we add the specific element (empty hash) to this list
        museum_artworks[museum] = list;


    }


    artwork_transferring(artwork, recipient)
    {
        


    }

    artwork_request()
    {
        
    }

    artwork_request-dismiss()
    {
        
    }

    property_passage()
    {
        
    }

    request_property()
    {
        
    }

    put_exhibition()
    {
        
    }

    put_warehouse()
    {
        
    }

    begin_restoration()
    {
        
    }

}

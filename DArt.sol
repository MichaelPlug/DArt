//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

import "./Verification.sol";
import "./Patron.sol";
import "./DCoin.sol";


error Unauthorized(address caller);


//we have objects to work with
contract DArt {

   /*
        Fai event
    */
 
    event ProtectionActivityStarted(Artwork indexed artwork);

    //we have a struct to store the data about artworks
    struct Artwork {
        bytes32 hashedName;
        address minter; //the address of the museum that minted the artwork
        address property;
        address possession;
        bytes32 exposedAt; // Da vedere come gestire lo storico delle esposizioni
        bytes32 status; // Da vedere come gestire lo storico delle operazioni
    }

    // A struct to collect information about exibitions
    struct Exibition {
        bytes32 hashedName;
        address organizer;
        bool isOn; 
    }

    struct Activity{
        // bytes32 artworkId;
        address author;
        uint timestamp;
        ProtectionActivities typology;
        bytes32 extraInfo;
    }
    
    // This enum indicates the type of operation applied to and update of an artwork
    enum ProtectionActivities {
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

    mapping (bytes32 => Artwork) public registeredArtworks;
    mapping (bytes32 => Exibition) public registerdExibitions;
    mapping (bytes32 => Activity) public registerdActivities;

    /*
    address public constant dcoinSmartcontract;
    address public constant verificatioSmartcontract; 
    address public constant patronSmartcontract;
    */

    Verification public verification;
    DCoin public dcoin;
    Patron public patron;   
  


    //the first time that we call che smart contract we need to save which is the
    //creator, because it can do after some important actions
    constructor(){
        //so we save the address of the creator, one time and forever
        /*
        dcoin = dcoinSmartcontract;
        verification = verificatioSmartcontract;
        patron = patronSmartcontract;
        */
        creator = msg.sender;
        //dcoin.setContrats(address(Patron(address(patron))));
    }

    function setContracts(DCoin dcoinad, Verification verificationad, Patron patronad) external{
        require(msg.sender == creator, "Only the creator can set the contracts");
        dcoin = dcoinad;
        verification = verificationad;
        patron = patronad;
    }

    /**
        @notice a pure faction to hash a string and the address of the caller, used to create univoque ids
        @param hashedName the hashed string that have to be hashed with the msg.sender
     */
     // Dovrebbe essere pure ma da errore
    function hashTextAndAddress(bytes32 hashedName) internal view returns(bytes32) {
        return keccak256(abi.encodePacked(hashedName, msg.sender));
    }

    function checkWallet() internal view {
        assert(verification.isVerified(msg.sender));
        /*assert(
            verificationSmartcontract.call(aby.encodingWithSignature("isVerified(address)",msg.sender)),
            "Sender's wallet is not verifed");*/
    }

    //called by a museum, to add an artwork in blockchain (MAYBE TO DO
    /**
        @notice mint an Artwork NFT. The id of the NFT is the hash of its name and the minter address.
        @param hashedName name of the artwork hashed using keccak256
     */    
    function mintArtworkNFT(bytes32 hashedName) external {
        uint role = verification.getRole(msg.sender);
        //role = verificationSmartcontract.call(abi.encodingWithSignature("getRole(address)",msg.sender));
        assert(role < 4);
        //assert(registeredWallets[msg.sender].verified, "Sender's wallet is not verifed");
        bytes32 kek = hashTextAndAddress(hashedName);
        require(registeredArtworks[kek].minter == address(0x0), "A collision during hashing occurred");
        dcoin.burn(0, msg.sender, false);   
        //we add the artwork to the mapping
        /*
        TODO: all this stuff have to be recoded and we have to decide if use one mapping from address to 
        a list of artworks or a mapping from any artwork to walletts, or both of them
        */
        registeredArtworks[kek] = Artwork(hashedName, msg.sender, msg.sender, address(0x0), 0, 0);
    }

    /**
        @notice mint an Exibition NFT. The id of the NFT is the hash of its name and the minter address.
        @param hashedName the Exibition's name hashed using keccak256
        @param status indicates the status of the creare exibition, if it's on or not
     */
    function mintExibitionNFT(bytes32 hashedName, bool status) external {
        //role = verificationSmartcontract.call(abi.encodingWithSignature("getRole(address)",msg.sender));
        uint role = verification.getRole(msg.sender);
        assert(role < 2);
        bytes32 kek = hashTextAndAddress(hashedName);
        assert(registeredArtworks[kek].minter == address(0x0));
        dcoin.burn(1, msg.sender, false);   
        registerdExibitions[kek] = Exibition(hashedName, msg.sender, status);
    }

    function endExibition(bytes32 exibitionID) external {
        require(registerdExibitions[exibitionID].organizer == msg.sender, "You do not have the necessary permissions to end this exibition");
        registerdExibitions[exibitionID].isOn = false;
    }

    function exposeArtwork(bytes32 artworkID, bytes32 exibitionID) external {
        require(registeredArtworks[artworkID].minter == msg.sender, "You do not have the necessary permissions to expose this artwork");
        require(registerdExibitions[exibitionID].isOn, "The exibition is not on");
        require(registerdExibitions[exibitionID].organizer == msg.sender, "The exibition is not on");
        registeredArtworks[artworkID].exposedAt = exibitionID;
    }

    function removeArtworkFromExibition(bytes32 artworkID) external {
        require(registeredArtworks[artworkID].possession == msg.sender, "You do not have the necessary permissions to remove this artwork");
        registeredArtworks[artworkID].exposedAt = bytes32(0x0);
    }

    function mintActivity(bytes32 artworkID, ProtectionActivities oftype, bytes32 extrainfo) external{
        uint role = verification.getRole(msg.sender);
        //role = verificationSmartcontract.call(abi.encodingWithSignature("getRole(address)",msg.sender));
        assert(role == 4);
        require(registeredArtworks[artworkID].possession == msg.sender,  "You do not have the necessary permissions to create an Activity about this artwork");
        bytes32 kek = keccak256(abi.encodePacked(msg.sender, block.timestamp));
        registeredArtworks[artworkID].status =   kek;
        registerdActivities[kek] = Activity(msg.sender, block.timestamp, oftype, extrainfo);  
        dcoin.burn(2, msg.sender, false);   
        if (oftype != ProtectionActivities.UPDATE && oftype != ProtectionActivities.DAMAGE){
        patron.moveFunds(msg.sender, artworkID);
        }
    }

    function allowAccessToArtwork(address target, bytes32 artwork) external {
        //assert(museums[target].verified);
        assert(registeredArtworks[artwork].property == msg.sender);
        registeredArtworks[artwork].possession = target;
    }

    function revokeAccessToArtwork(bytes32 artwork) external {
        assert(registeredArtworks[artwork].property == msg.sender);
        registeredArtworks[artwork].possession = address(0x0);
    }

    function donateWorkOfArt(bytes32 artwork, address _to) external{
        require(registeredArtworks[artwork].property == msg.sender, "You are not the owner of the selected artowork");
        registeredArtworks[artwork].property = _to;
    }

    function getProperty(bytes32 artwork) external view returns(address){
        return registeredArtworks[artwork].property;
    }

    function terminate() public {
        require(msg.sender == creator, "You cannot terminate the contract!");
        selfdestruct(payable(creator));
    }
}

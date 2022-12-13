//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

contract Verification {

    // A struct that collect informations about the wallet that operate with the contact
    struct Wallet{
        //we have to hash also the address?
        bytes32 hashedName;
        bool verified;
        Actors role;
    }

    // This enum indicates the type of actor associated to a registered wallet
    enum Actors {
        MUSEUM,
        PUBLICAUTHORITY,
        GALLERY,
        PRIVATECOLLECTOR,
        ARTIST
    }

        //this is the address of the creator MAYBE PRIVATE, namely the owner
    //of the smart contract that it can do some special actions
    address public creator;

    //this is a list that contains all the ids registered (true) or pending to be it (false) to DArt
    mapping (address => Wallet) public registeredWallets;

    //the first time that we call che smart contract we need to save which is the
    //creator, because it can do after some important actions
    constructor(){
        //so we save the address of the creator, one time and forever
        creator = msg.sender;
    }

//mettiamo noi o l'utente queste informazioni? se lo fa l'utente significa che potrebbe richiamare la funzione e resettarle?
    //called by a museum that wants to enter in the blockchain
    function museumRequestCreation(string calldata name, Actors role) external {
        if (registeredWallets[msg.sender].verified == false){
            bytes32 hashedname = keccak256(abi.encodePacked(name));
            registeredWallets[msg.sender] = Wallet(hashedname, false, role);
        }
    }

    //called by a smart contract, given a specificc address
    function museumCreation(address museum) external {
        // veryf the sender is the creator/owner of the smart contract and that there is a pendig reques to register the wallet
        if (msg.sender == creator && registeredWallets[museum].hashedName != 0){
            // change the status of the museum to verified
            registeredWallets[museum].verified = true;
        }
         else {
            revert();
        }
    }

    // Verify if a wallet is registered in the blockchain as an verified actor
    function isVerified(address museum) external view returns(bool) {
        return registeredWallets[museum].verified;
    }

    function getRole(address museum) external view returns(Actors) {
        if (registeredWallets[museum].verified == false){
            revert();
        }
        else {

            return registeredWallets[museum].role;
        }
    }

    function getHashedName(address museum) external view returns(bytes32) {
        if (registeredWallets[museum].verified == false){
            revert();
        }
        else {
            return registeredWallets[museum].hashedName;
        }
    }

    function verifyHashedName(string calldata name, address museum) external view returns(bool) {
        if (registeredWallets[museum].verified == false){
            revert();
        }
        else {
            return keccak256(abi.encodePacked(name)) == registeredWallets[museum].hashedName;
        }

    }
}
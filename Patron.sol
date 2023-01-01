//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

contract Patron {

    mapping (bytes32 => uint) public patronCredit;
    mapping (bytes32 => uint) public funds;

    
    address public minter;
    //address public constant verificatioSmartcontract; 
    address public dcoinSmartcontract; 
    address public mainSmartcontract; 

    constructor(address dcoin){
     //   verification = verificatioSmartcontract;  
        dcoin   = dcoinSmartcontract;
        minter = msg.sender;
    }

    function setContrats(address main) external {
        assert(msg.sender == minter);
        main = mainSmartcontract;
    }

    function crowfunding(bytes32 artwork, uint amount) external {
        //require(registeredArtworks[artwork].minter == 0x0, "This artwork is not registered");
        dcoinSmartcontract.call(abi.encodingWithSignature("burn(uint,address,bool)", amount, msg.sender, true));
        funds[artwork] += amount;
        address museum = mainSmartcontract.call(abi.encodingWithSignature("getProperty(bytes32)", artwork));
        patronCredit[keccak256(abi.encodePacked(msg.sender,museum))] += amount;
    }

    function viewFunds(bytes32 artwork) external view returns(uint){
        return funds[artwork];
    }

    function viewPatronCredit(address patron, address museum) external view returns(uint){
        return patronCredit[keccak256(abi.encodePacked(patron,museum))];
    }

    function moveFunds(address _to, bytes32 artwork) external {
        assert(msg.sender == mainSmartcontract);
        uint fund = funds[bytes32];
        if (fund != 0) {
            dcoinSmartcontract.call(abi.encodingWithSignature("magicMint(address,amount)",_to,funds[bytes32]));
            funds[bytes32] = 0;
        }
    }
}
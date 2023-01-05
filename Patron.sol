//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//import "Verication.sol";
import "./DCoin.sol";
import "./DArt.sol";

contract Patron {

    mapping (bytes32 => uint) public patronCredit;
    mapping (bytes32 => uint) public funds;

    
    address public minter;
    //address public constant verificatioSmartcontract; 
    
    DCoin public dcoinSmartcontract;
    //address public dcoinSmartcontract; 
    DArt public mainSmartcontract; 
    

    constructor(DArt main, DCoin dcoin){
     //   verification = verificatioSmartcontract;  
        //mainSmartcontract = main ;
        //dcoinSmartcontract = dcoin;
        minter = msg.sender;
    }


    function setContrats(address main, address dcoin) external {
        assert(msg.sender == minter);
        mainSmartcontract = DArt(main);
        dcoinSmartcontract = DCoin(dcoin);
    }

    function crowfunding(bytes32 artwork, uint amount) external {
        //require(registeredArtworks[artwork].minter == 0x0, "This artwork is not registered");
        dcoinSmartcontract.burn(amount, msg.sender, true);
        //dcoinSmartcontract.call(abi.encodingWithSignature("burn(uint,address,bool)", amount, msg.sender, true));
        funds[artwork] += amount;
        address museum = mainSmartcontract.getProperty(artwork);
        //address museum = mainSmartcontract.call(abi.encodingWithSignature("getProperty(bytes32)", artwork));
        patronCredit[keccak256(abi.encodePacked(msg.sender,museum))] += amount;
    }

    function viewFunds(bytes32 artwork) external view returns(uint){
        return funds[artwork];
    }

    function viewPatronCredit(address patron, address museum) external view returns(uint){
        return patronCredit[keccak256(abi.encodePacked(patron,museum))];
    }

    function moveFunds(address _to, bytes32 artwork) external {
        assert(msg.sender == address(mainSmartcontract));
        uint fund = funds[artwork];
        if (fund != 0) {
            dcoinSmartcontract.magicMint(_to, fund);
            //dcoinSmartcontract.call(abi.encodingWithSignature("magicMint(address,amount)",_to,funds[bytes32]));
            funds[artwork] = 0;
        }
    }
    
    function terminate() public {
        require(msg.sender == minter, "You cannot terminate the contract!");
        selfdestruct(payable(minter));
    }
}
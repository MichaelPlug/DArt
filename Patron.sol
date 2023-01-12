//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

import "./Verification.sol";
import "./Patron.sol";
import "./DCoin.sol";

contract Patron {

    mapping (bytes32 => uint) public patronCredit;
    mapping (bytes32 => uint) public funds;

    
    address public minter;
    //address public constant verificatioSmartcontract; 
    
    DCoin public dcoinSmartcontract;
    //address public dcoinSmartcontract; 
    address public mainSmartcontract; 
    

    constructor(){
        minter = msg.sender;
    }


    function setContrats(address main, address dcoin) external {
        assert(msg.sender == minter);
        mainSmartcontract = main;
        dcoinSmartcontract = DCoin(dcoin);
    }

    function crowfunding(bytes32 artwork, uint amount) external {
        dcoinSmartcontract.lock(amount, msg.sender);
        funds[artwork] += amount;
        (bool success_b, bytes memory result_b) = mainSmartcontract.call(abi.encodeWithSignature("getProperty(bytes32)", artwork));
        require(success_b, "DArt failed to get the property");
        address museum = abi.decode(result_b, (address));

        patronCredit[hashAddressAndAddress(msg.sender, museum)] += amount;
    }

    function hashAddressAndAddress(address first, address second) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(first, second));
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
            /*
            (bool success, ) = dcoinSmartcontract.call(
                abi.encodeWithSignature("magicMint(address, uint)", _to, fund)
            );
            require(success, "Dcoin failed to mint the amount");
            */
//            dcoinSmartcontract.magicMint(_to, fund);
            //dcoinSmartcontract.call(abi.encodingWithSignature("magicMint(address,amount)",_to,funds[bytes32]));
            funds[artwork] = 0;
        }
    }
    
    function terminate() public {
        require(msg.sender == minter, "You cannot terminate the contract!");
        selfdestruct(payable(minter));
    }
}
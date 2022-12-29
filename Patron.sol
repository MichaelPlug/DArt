//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

import "DCoin.sol";

contract Patron {

    mapping (bytes32 => uint) public patronCredit;
    mapping (bytes32 => uint) public funds;


    function crowfunding(bytes32 artwork, uint amount) external {

    }

    function viewFunds(bytes32 artwork) external view returns(uint){
        return funds[artwork];
    }

    function viewPatronCredit(address patron, address museum) external view returns(uint){
        return patronCredit[keccak256(abi.encodePacked(patron,museum))];
    }

    function moveFunds(address _to) internal {

    }

    function burn(uint amount){}
}
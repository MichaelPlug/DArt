//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

import "DCoin.sol";
import "DArt.sol";
import "Verification.sol";

contract Patron {

    mapping (bytes32 => uint) public patronCredit;
    mapping (bytes32 => uint) public funds;


    function crowfunding(bytes32 artwork, uint amount) external {
        require(registeredArtworks[artwork].minter == 0x0, "This artwork is not registered");
        burn(amount);
        funds[artwork] += amount;

        museum = registerdartwork.property;
        patronCredit[keccak256(abi.encodePacked(msg.sender,museum))] += amount;
    }

    function viewFunds(bytes32 artwork) external view returns(uint){
        return funds[artwork];
    }

    function viewPatronCredit(address patron, address museum) external view returns(uint){
        return patronCredit[keccak256(abi.encodePacked(patron,museum))];
    }

    function moveFunds(address _to, bytes32 artwork) internal {
        magicMint(_to, funds[bytes32]);
        funds[bytes32] = 0;
    }

    //function burn(uint amount){}
}
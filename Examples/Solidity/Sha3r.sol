// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;

contract Sha3r {
    function shaThree(string calldata shable) public pure returns (bytes32 sha) {
        return (keccak256(bytes(shable)));
    }
}


// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0; // Solidity compiler version
// Inspired by http://truffleframework.com/tutorials/debugging-a-smart-contract
contract SimpleStorage {
    // Variables that the state of the contract consists of
    uint8 public myVar;
    
    function setMyVar(uint8 aValue) public {
        myVar = aValue;
    }
}



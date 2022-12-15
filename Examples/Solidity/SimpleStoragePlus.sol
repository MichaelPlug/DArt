// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0; // Solidity compiler version
// Inspired by http://truffleframework.com/tutorials/debugging-a-smart-contract
contract SimpleStoragePlus {
  // Variables that the state of the contract consists of
  uint8 private myVariable;
  address payable private owner;

  constructor() {
      // Solidity can access meta-info stemming from the transaction and block itself
      owner = payable(msg.sender);
      // The direct cast to payable is one of the new features of Solidity 0.8
  }

  function getMyVariable() view public returns (uint) {
    return myVariable;
  }

  function setMyVariable(uint8 _myVariable) public {
    myVariable = _myVariable;
  }

  function terminate() public {
      if (msg.sender == owner) {
          selfdestruct(owner);
      } else {
          revert("Only the owner can call terminate()");
      }
  }
}





// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;

contract HelloToken {
    address public minter;
    mapping (address => uint) public balance;
    uint public constant PRICE = 2 * 1e15; 
    // uint public constant PRICE = 2 finney; 
    // finney is no longer a supported denomination since Solidity v.0.7.0

    constructor() {
        minter = msg.sender;
    }

    function mint() public payable {
        require(msg.value >= PRICE, "Not enough value for a token!");
        balance[msg.sender] += msg.value / PRICE;
        // Guess guess, where does the remainder of the msg.value end?
    }

    function transfer(uint amount, address to) public {
        require(balance[msg.sender] >= amount, "Not enough tokens!");
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }
}




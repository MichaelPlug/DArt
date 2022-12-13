//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DArt {
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

    function burn(uint amount) public payable returns (bool) {
        require(balance[msg.sender] >= amount, "Not enough tokens!");
        // Take the amount of HelloToken from the sender and give back the amount of ether
        balance[msg.sender] -= amount;
        return true
        // Send the amount of ether to the sender
        }    }

    function transfer(uint amount, address to) public returns (bool){
        require(balance[msg.sender] >= amount, "Not enough tokens!");
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }
}

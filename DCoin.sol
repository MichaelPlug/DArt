//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DCoin {
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

    function burn(uint amount) internal {
        require(balance[msg.sender] >= amount, "Not enough DCoins!");
        // Take the amount of HelloToken from the sender and give back the amount of ether
        balance[msg.sender] -= amount;
        // Send the amount of ether to the sender
        }

    function transfer(uint amount, address to) public {
        require(balance[msg.sender] >= amount, "Not enough DCoins!");
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }

    function withdraw(uint amount) external {
        burn(amount);
        payable(msg.sender).transfer(amount * PRICE);  
    } 

    function magicMint(address _to, uint amount) internal {
        balance[_to] += amount;
    }

    function terminate() public {
        require(msg.sender == minter, "You cannot terminate the contract!");
        selfdestruct(payable(minter));
    }
}

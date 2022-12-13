//for compability reasons, we work only with these versions
pragma solidity >=0.7.0 < 0.9.0;

//we have objects to work with
contract DArt {

    unit public constant PRICE = 2 * 1e15;

    // This a dictonary, any address is mappet do a integer, the amout of this integer is the amount of how much HelloToken this addess has got
    mapping(address => uint) public balance;
    
    constructor(){

    }
    // questa funzione serve per creare un nuovo token
    function mint(){
        // Take the value of the transactin, put it in your pocket, and "give back" super-precius HelloToken
        balance[msc.sender] += msg.value / PRICE;
        // All the amount of the value is goint to the contract wallet
    }

    function burn(uint amount){
        // Take the amount of HelloToken from the sender and give back the amount of ether
        balance[msg.sender] -= amount;
        // Send the amount of ether to the sender
        msg.sender.transfer(amount * PRICE);
    }

    function transfer(uint amount, address target){
        // Take the amount of HelloToken from the sender and give it to the receiver
        balance[msg.sender] -= amount;
        balance[msg.receiver] += amount;
    }
}

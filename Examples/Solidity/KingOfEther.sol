// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title The King of the Ether (inspired by https://kingoftheether.com/)
 * @dev Determines the next King of the Ether for a fortnight.
 */
contract KingOfEther {
    /** The grey eminence behind all this */ 
    address payable private eminenceGrise;
    /** The "NFT" held by the monarch */ 
    /** A small amount to be paid for the service */
    uint private littleFee;
    address payable public crownToken;
    /** Name of the King */
    string public nameOfTheKing;
    /** The price to be King */
    uint public tokenPrice;
    /** The time when the King was anointed */
    uint public anointmentTime;

    /** The time after which the King is divested of Their role */
    // Set to 30 secs for debugging purposes
    // It should have been 2 weeks, i.e., 1209600 seconds
    uint public constant EXPIRY_LAPSE = 30;  
    /** The minimum price for the Crown (token) */
    uint public constant BASE_AMOUNT = 500;

    /** The minimum price for the Crown (token) */
    mapping (address => uint) pendingWithdrawals;

    /** Determine whether a new King is to be proclaimed */
    function wannaBeKing(string memory name) public payable {
        uint leastAmountDue = computeAmountDue();

        if (msg.value >= leastAmountDue) {
            littleFee = tokenPrice /10;
            pendingWithdrawals[eminenceGrise] += littleFee;
            pendingWithdrawals[crownToken] += msg.value - littleFee;
            anointNewKing(name);
        } else {
            revert("Dear pretender to the throne, your pledge is insufficient!");
        }
    }

    /** Compute the fair price for a Crown */
    function computeAmountDue() internal returns (uint amountDue) {
        if (tokenPrice == 0) {
            return BASE_AMOUNT;
        }
        if (block.timestamp > anointmentTime + EXPIRY_LAPSE) {
            pendingWithdrawals[eminenceGrise] += tokenPrice - littleFee;
            tokenPrice = 0;
            return BASE_AMOUNT;
        } else {
            return tokenPrice * 4 / 3;
        }
    }

    /** Anoint the new King */
    function anointNewKing(string memory name) internal {
        tokenPrice = msg.value;
        crownToken = payable(msg.sender);
        anointmentTime = block.timestamp;
        nameOfTheKing = name;
    }

    /** Let the just Kings and eminences retrieve their funds */
    function withdraw() public payable {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    /** Contract deployment */
    constructor() {
        eminenceGrise = payable(msg.sender);
    }

    /** Terminate the game */
    function dissolve() public {
        if (msg.sender == eminenceGrise) {
            selfdestruct(eminenceGrise);
        }
    }
}




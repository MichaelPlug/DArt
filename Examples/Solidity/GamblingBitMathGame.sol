// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;

import "./BitMathGame.sol";

contract GamblingBitMathGame is BitMathGame {
    modifier NoWeiNoGame(uint minimum) {
        require(minimum <= msg.value, "No wei no game");
        _;
    }

    modifier NoTokenNoPlay(uint minimum) {
        require(balance[msg.sender] > minimum,
            "Not enough tokens no play. Try buyAppTokens() ;)");
        _;
    }

    constructor(uint8 seed) NoWeiNoGame(seed) BitMathGame(seed) payable {
        uint remainder = msg.value - seed;
        balance[minter] += remainder;
    }

    function buyAppTokens() public payable {
        // Half of the money is converted in tokens (rounded down, of course)
        balance[msg.sender] += msg.value / 2;
        // The rest is a fair tax to diligently pay to the minter
        minter.transfer(msg.value - (msg.value / 2));
    }

    function play(uint8 guess) NoTokenNoPlay(guess) override public {
        super.play(guess);
    }
}

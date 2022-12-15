// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;

contract ModifierUsage{
    enum PurseLevel {Ok, Rich, VeryRich, UncleScrooge}

    event PurseLevelReached(PurseLevel level, uint why);

    modifier NotCheap {
        require( msg.value >= 1, "Not even two wei? Come on..." );
        _;
    }

    uint myPurse;
    PurseLevel public myPurseLevel;

    constructor() {
        myPurseLevel = PurseLevel.Ok;
    }

    function payMe() external payable NotCheap {
        myPurse += msg.value;

        updatePurseLevel();

        emit PurseLevelReached(myPurseLevel, myPurse);
    }

    function updatePurseLevel() private {
        if (myPurseLevel == PurseLevel.Ok) {
            myPurseLevel = PurseLevel.Rich;
        }
        else if (myPurseLevel == PurseLevel.Rich) {
            myPurseLevel = PurseLevel.VeryRich;
        }
        else { myPurseLevel = PurseLevel.UncleScrooge; }
    }
}

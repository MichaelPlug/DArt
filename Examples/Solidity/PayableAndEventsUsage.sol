// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;

contract PayableAndEventsUsage {
    enum PurseLevel {Ok, Rich, VeryRich, UncleScrooge}

    event PurseLevelReached(PurseLevel level, uint why);

    uint myPurse;
    PurseLevel public myPurseLevel;

    constructor() {
        myPurseLevel = PurseLevel.Ok;
    }

    function payMe() external payable {
        myPurse += msg.value;

        updatePurseLevel(msg.value);

        emit PurseLevelReached(myPurseLevel, myPurse);
    }

    function updatePurseLevel(uint amount) private {
        if (amount > 0) {
            if (myPurseLevel == PurseLevel.Ok) {
                myPurseLevel = PurseLevel.Rich;
            }
            else if (myPurseLevel == PurseLevel.Rich) {
                myPurseLevel = PurseLevel.VeryRich;
            }
            else { myPurseLevel = PurseLevel.UncleScrooge; }
        }
    }
}

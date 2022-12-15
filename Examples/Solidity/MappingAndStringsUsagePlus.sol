// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;
contract MappingAndStringsUsagePlus {
    mapping(address => string) mottos;

    function saySomething(string calldata motto) external {
        address speaker = msg.sender;

        mottos[speaker] = motto;
    }

    function whatDidISay() external view returns (string memory motto) {
        address speaker = msg.sender;

        if (bytes(mottos[speaker]).length > 0) {
            return mottos[speaker];
        } else {
            revert("You said nothing so far");
        }
    }

    function sayItOnceWithAdvancedCheck(string memory motto) external {
        require(
            bytes(motto).length > 0,
            "This function does not enjoy the silence"
            );

        if (bytes(mottos[msg.sender]).length > 0) {
            revert("You already said something");
        }

        mottos[msg.sender] = motto;

        assert(bytes(mottos[msg.sender]).length > 0);
    }
}

// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;
contract MappingAndStringsUsage {
    mapping(address => string) mottos;

    function saySomething(string calldata motto) public {
        address speaker = msg.sender;

        mottos[speaker] = motto;
    }

    function whatDidISay() public view returns (string memory motto) {
        address speaker = msg.sender;

        if (bytes(mottos[speaker]).length > 0) {
            return mottos[speaker];
        } else {
            revert("You said nothing so far");
        }
    }
}



// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;
contract StructsUsage {
    struct Proposal {
        address proposer;
        string slogan;
        string content;
    }

    uint numOfProposals;
    string[] public slogans;
    mapping(bytes32 => Proposal) public proposals;

    function addProposal(string calldata _slogan, string calldata _content) external {
        bytes32 sloganIndex = getSloganIndex(_slogan);
        proposals[sloganIndex] = Proposal({
            proposer: msg.sender,
            slogan: _slogan,
            content: _content
        });
        slogans.push(_slogan);
        numOfProposals++;
    }

    function getSloganIndex(string calldata _slogan) pure public returns (bytes32) {
        bytes32 index = sha256(bytes(_slogan));
        return index;
    }

    function getContentAndProposer (string calldata _slogan) external view
            returns (string memory _content, address _proposer) {
        return (proposals[getSloganIndex(_slogan)].content,
            proposals[getSloganIndex(_slogan)].proposer);
    }
}

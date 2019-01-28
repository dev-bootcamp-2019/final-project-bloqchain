pragma solidity ^0.5.0;

/**
 * @dev These contracts and libraries are imported from 
 * community-vetted code from OpenZeppelin.  These files are 
 * stored locally in node_modules/openzeppelin-solidity
 * directory.
 */

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Voting
 *
 * @dev Base contract 'Voting' inherits from both 
 * OpenZeppelins's Ownable and Pausable contracts.  
 * Voting contract allows users to propose an initiative 
 * to be voted upon, as well as enables users to cast votes 
 */

contract Voting is Ownable, Pausable {

    /**
     * @dev OpenZeppelin library SafeMath is used for all math 
     * calculations
     */

    using SafeMath for uint256;

    /**
     * @dev Struct data type is used to store values re: each voter
     */

    struct Voter {
        uint value;
        bool voted;
    }

    /**
     * @dev Struct data type is used to store 4 regular variables on
     * each proposal, as well as an array for ETH addresses, and a 
     * mapping that links addresses to Voter struct (ie, to learn
     * such info as have they voted yet or not)
     */

    struct Proposal {
        string title;
        uint yVotes;
        uint nVotes;
        uint abstainVotes;
        address[] votersAddress;
        mapping (address => Voter) voters;
    }

    /**
     * @dev Capture issues raised by the populace that they deem 
     * 'voteworthy'
     */

    Proposal[] public proposals;

    /**
     * @dev Two events can be triggered in this contract -- either a 
     * new proposal to vote upon, or a new vote to be tallied on an
     * existing proposal
     */

    event ProposalCreatedEvent();
    event VoteCastEvent();

    /**
     * @dev Returns length of proposals array
     * @dev Also in this and other functions, the 'whenNotPaused' 
     * modifier ensures function only callable when contract is 
     * not paused
     */

    function getNumProposals () public view whenNotPaused returns (uint) {
        return proposals.length;
    }

    /**
     * @dev Returns pertinent info re: specific proposal, such as 
     * what the vote tally is thus far on initiative
     * @param _proposalIndex for specific proposal is input
     */

    function getProposal(uint _proposalIndex) public view whenNotPaused returns (
        uint, 
        string memory, 
        uint, 
        uint, 
        uint, 
        address[] memory
        ) 
    {
        if (proposals.length > 0) {
            Proposal storage p = proposals[_proposalIndex];        
            return (_proposalIndex, p.title, p.yVotes, p.nVotes, p.abstainVotes, p.votersAddress);
        }
    }

    /**
     * @dev Returns true if proposal added to array
     * @param _title is string that represents
     * initiative entered on client web page
     */

    function addProposal(string memory _title) public whenNotPaused returns (bool) {
        
        Proposal memory proposal;
        emit ProposalCreatedEvent();
        proposal.title = _title;
        proposals.push(proposal);
        return true;
    }

    /**
     * @dev Returns true if vote tallied on specific proposal
     * @param _proposalIndex _voteType are inputs for specific
     * proposal and what the vote cast is -- either a vote of 
     * yes (1), no (2), or abstaining from voting (3)
     */

    function vote(uint _proposalIndex, uint _voteType) public whenNotPaused returns (bool) {

        if (proposals[_proposalIndex].voters[msg.sender].voted == false) {      
            require(_voteType >= 1 && _voteType <= 3);                          

            Proposal storage p = proposals[_proposalIndex];                     
            
            if (_voteType == 1) {
                p.yVotes ++;

            } else if (_voteType == 2) {
                p.nVotes ++;

            } else {
                p.abstainVotes ++;
            }

            p.voters[msg.sender].value = _voteType;
            p.voters[msg.sender].voted = true;
            p.votersAddress.push(msg.sender);

            emit VoteCastEvent();

            return true;

        } else {

            return false;
        }
    }
}



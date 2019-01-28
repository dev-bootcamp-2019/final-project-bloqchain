
Title:  UpVote - Decentralized Voting Dapp
Author: Caro
Date:   January 2019
Mail:   ethdapp@protonmail.com
File:   Avoiding_Common_Attacks.md

==================================================================
	
Consensys Academy's 2018-2019 Developer Bootcamp Final Project  
                                                                
==================================================================



## What Are Common Attacks for Solidity? ##
-------------------------------------------

Solidity is host to a slew of known attack vectors.  Our job as coders is to minimize the surface or vulnerability of each attack angle.

In great detail below is an analysis of the safeguards implemented as defensive measures against each known attack vector.



## Race Conditions

The design of the Voting.sol contract in this project does not store or use any Ether, with the exception of an Ether 'gas fee' for transactions, needed both to issue a proposal to be voted upon or cast a vote.



## Re-Entrancy & Pitfalls in Race Condition Solutions

Race conditions can occur across multiple functions and contracts, and thus it's suggested to finish all internal work first before calling other functions.

To prevent a function from being called repeatedly, such as the Voting.sol 'vote' function, there is a check that the voter has not already voted on given proposal for the function to proceed.  

Without this check, this function, as an example, would be vulnerable to a race condition.



## Cross-function Race Conditions

Another similar attack vector presents itself when two different functions share the same state.  In this project, there are no functions that share the same state.



## Transaction-Ordering Dependence (TOD) / Front Running

It is possible to alter the order of transactions, but this can be avoided with the proper use of require statements.

The frontend is designed in such a way that it's not possible to alter the order of the proposal or voter attributes.



## Timestamp Dependence

It's a known attack vulnerability that the timestamp of the block can be manipulated by the miner.

In this project, timestamps are not used for anything mission-critical.  However, if this contract is extended to include such features as 'time-bound' voting -- such as voting on a proposal is limited to three days -- timestamps would need to be considered.



## Integer Overflow and Underflow

If a variable reaches the maximum uint value of (2^256), it will circle back to zero. 

The use of OpenZeppelin's SafeMath library guards against this math error in Solidity, and is used in Voting.sol for all uint256 data types.



## DoS with Block Gas Limit

Even though a dynamic array is used in this Voting.sol, it is not necessary to loop over it.  A getter function will handle the access to the array information.



## Forcibly Sending Ether to a Contract (Fallback Function)

In Voting.sol, there is not a need for a fallback function, as the code is not carrying any contract balance.



## Preventative Techniques to Implement ##
----------------------------------------

## Utilize Online Auditing Systems

The online security tools listed at below URL are a worthy 'general checkup' of contract architecture, as they run an analysis on the Solidity code and structure.  They automatically check contracts for security vulnerabilities and unsafe practices.

https://consensys.github.io/smart-contract-best-practices/security_tools/

Many of the tools listed on this site had not been updated yet to check for Solidity 0.5.0 and later, but still some of these tools were worthwhile.



## Fact: Blockchain Data is Public

The Voting.sol contract does not manage information that can be considered sensitive, at least at this stage, which is still a working and viable 'Proof of Concept.'

However, additional safeguards can be put in place such as encryption if sensitive information is sent over the web in future versions of this project that might add additional functionality, where encryption might be deemed necessary.



## Use of Require

To validate input, require conditions have been used in Voting.sol.  



## Mark Visibility of Functions and State Variables

To make clear who can call functions or access variables, all the functions and state variables are marked.



## Limit Pragma to Narrow Range of Compilers

For security reasons, the pragma version is limited to versions of solidity ^0.5.0.



## Functions and Events

Functions are best if they start with an action requirement -- such as new, delete, update, get, enable, remove, etc.  Events are best if the start with new data or new identity being recognized.  Both safeguards were used in Voting.sol.



## Avoid Use of tx.origin

Within Voting.sol contract, the use of tx.origin was avoided.




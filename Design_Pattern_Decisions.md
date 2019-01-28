
Title:  UpVote - Decentralized Voting Dapp
Author: Caro
Date:   January 2019
Mail:   ethdapp@protonmail.com
File:   Design_Pattern_Decisions.md

==================================================================

Consensys Academy's 2018-2019 Developer Bootcamp Final Project  
                                                                
==================================================================



## What Are Design Considerations for Solidity? ##

As Solidity coders, we know it's not sufficient to single-mindedly guard against the known "attack vectors" of Solidity and believe foolishly that we're in the clear.  With such blindness and "tunnel vision," we naively leave ourselves open to other vulnerabilities.

It's also vital to architect our code in the safest way possible.  Given our code runs on the EVM (or Truffle, which simulates an EVM locally), we must design our code with the understanding that all might not go according to plan when the code is deployed.  Steps we can take to build in design robustness include:

  (1) Test and test again -- both utilizing Truffle and deployed onto testnets
  
  (2) Have the code audited
  
  (3) Use community-vetted, hardened code such as OpenZeppelin for core infrastructure / scaffolding of code architecture
  

Lastly, we must build in safeguards in code to allow contracts to "fail gracefully" in the event an unexpected vulnerability surfaces.  Then, the impact of such "learning experiences" is minimized.



## General Voting.sol Contract Architecture ##

This Voting Dapp comprises one smart contract, Voting.sol, which leverages the community-vetted code of OpenZeppelin libraries for additional functionality:

  - Pausability
  - Ownership
  - SafeMath

As background, OpenZeppelin provides secure, community-audited, and battle-tested code that serves as basic infrastructure for building-in design safety considerations into code.

OpenZeppelin safety is leveraged by importing their contracts or libraries at the beginning of the Voting.sol smart contract and employing OpenZeppelin functionality in the Voting.sol contract.  Thus, Voting.sol is a "child" of these OpenZeppelin contracts and can inherit their functionality.

Each of these design considerations -- SafeMath, Pausability, Ownership -- is discussed below, first in theory and then an explanation of how it was actually implemented in Voting Dapp.



## Circuit Breakers / Emergency Stop / Pausability -- Concept & Implementation in Dapp ##

Concept:  

Deployed smart contracts that are not executing as anticipated can be successfully paused if circuit-breaker functionality is built into code design.

Implementation in Dapp:  

If you check the Voting.sol code, you'll see the OpenZeppelin Pausability library was imported into Voting.sol and the modifier 'whenNotPaused' was added to each function in contract.  Thus, the 'owner' or 'msg.sender' who deployed contract can trigger a pause to the contract if necessary, thereby disabling operation of any of contract's functions.



## Ownership -- Concept & Implementation in Dapp ##

Concept:

The person who deployed the Dapp is considered the 'owner' of the contract, and thus has 'access control' for contract functionality.

Implementation in Dapp:  

If you check the Voting.sol code, you'll see the OpenZeppelin Ownable library was imported into Voting.sol and the modifier 'onlyOwner' is now available for use.  While this modifier was not directly implemented, Pausable contract inherited ownership functionality in a sense, as only the 'Owner' can pause and unpause a contract that the Owner deployed.



## SafeMath -- Concept & Implementation in Dapp ##

Concept:

SafeMath can be included either in this document or the 'Avoiding_Common_Attacks.md' document.  It is included here as it's a library offered by OpenZeppelin, and we are currently discussing OpenZeppelin community-audited code in this document.

Math in Solidity is prone to overlow and underflow errors.  Using SafeMath prevents this error from occurring.

Implementation in Dapp:

If you check the Voting.sol code, you'll see SafeMath library was imported from OpenZeppelin and is used for all uint256 math calculations.   



## Modifiers for Access Control ##

If you check the Voting.sol code, you'll see the explicit use of modifier 'whenNotPaused' with each function.  So, provided an 'emergency stop' or 'circuit breaker' has not been activated by Owner, it's business as usual for Dapp operation.  In the event an emergency does present itself, Voting.sol contract can be halted or paused by the Owner, and the functions will no longer operate.



## Use of Structs ##

The Voting.sol contract uses two Structs to store information.  In the Voter struct, no personal attributes of the end user are stored.  The same can be said of those end users who create proposals to be voted upon.  Only the content of the proposals are stored in the Proposals struct, and not any identifiable information on the user who created the initiative, aside from their ETH address.








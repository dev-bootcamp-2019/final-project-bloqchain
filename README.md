
Title:  UpVote - Decentralized Voting Dapp
Author: Caro
Date:   January 2019
Mail:   ethdapp@protonmail.com
File:   README.md

==================================================================
	
Consensys Academy's 2018-2019 Developer Bootcamp Final Project  
                                                                
==================================================================


## Why Is Decentralized, Blockchain-Based Voting Necessary? ##

We're well aware of the initial inroads blockchain has made into traditional "fintech" (financial technology) industries.  

However, any sector -- including voting -- can benefit from the transparent, verifiable register of transaction data that blockchain provides.  Blockchain infrastructure also requires no central supervision, thus making it resistant to fraud.  Other advantages of blockchain-based voting include:

 - A voter can verify that their vote was cast as intended, and have at hand a verifiable audit trail with a blockchain recording every transaction.  This reduces chances of voter fraud.

 - As blockchain provides an immutable ledger, governments / independent agencies can confirm vote results, facilitating election transparency, and also ensuring no illegitimate votes are added.

 - Decentralized blockchain-based voting system means voting data is distributed across many servers, so it's harder to destroy or alter results by hacking a single centralized system.

In summary, blockchain-based voting provides the democratizing infrastructure for casting, tracking, and counting votes!



## Voting DApp ##

UpVote is a slick voting Dapp that delivers "Democracy Now!"  

Anyone with an ETH address can both propose an issue to be voted upon (referred to interchangeably as both a "proposal" or an "initiative") by the masses.  Then the masses can vote themselves -- either casting a vote in favor of initiative, against proposal, or abstaining from the vote if they don't feel strongly one way or the other.

This Dapp can be run locally courtesy of the Truffle Framework, which simulates an Ethereum blockchain.  It is also deployed to the Rinkeby testnet.



## Use Cases ##

This voting Dapp is straight-forward and easy to use, and two use cases will further illustrate its use.  

   - Use Case #1 - You're in the US House of Representatives, and you would like to know how your fellow Congressmen and Congresswomen feel about impeaching the sitting president.  You can issue the impeachment initiative before your colleagues and tally how each vote rolls in, and in the end have a summary of who voted for impeachment, who against, and who is abstaining from casting a vote.

   - Use Case #2 - On a community level, say you wanted to know how your neighbors feel about when quiet hours should begin.  Each community member could issue their own initiative, such as "Quiet hours 10pm?," while another might propose "Quiet hours 11:30pm?"  Each member is empowered to initiate their own proposal and put it up for vote, and likewise, each community member can exercise their democratic right to vote.



## Environment ##

This Dapp was built leveraging the flagship Truffle tutorial, the "Pet Shop Tutorial."  One can either use Ganache or ganache-cli to simulate the locally run blockchain.  (Take note though -- while I was running Dapp on ganache-cli, Truffle kept changing the port between either 8545 or 9545.  Thus, I primarily used the Ganache GUI full-fledged app for stability sake, as it's always port 7545.)

MetaMask is used to interface with the end user, as MetaMask is called to sign a transaction -- thus either to confirm a proposal submission by the end user / client or to cast a vote by the end user / client.  Thus, gas is used on the Ethereum network to both initiate a proposal to be voted upon and to actually cast a vote.



## Deployment ##

Quick guideline to fire up this dapp:

  * git clone this repository
  * cd into local directory	(with repository)
  * npm install -g truffle 	(if Truffle not already installed)
  * npm install
  * truffle compile --all
  * truffle migrate --reset
    - Note: Before migration, be sure truffle-config.js (if MacOS) 
      or truffle.js is showing right port for either Ganache GUI 
      app (7545) or Ganache-cli at 8545 or 9545 (see above)
  * enable MetaMask 
	  - use seed words from Ganache or Ganache-cli 
        (with preference for Ganache GUI full-fledged app; see above)
	  - get all 10 accounts created and ready to go
  * clear browser cache
  * npm run dev



## How to Operate the Dapp as an End User? ##

(1) Get MetaMask going; ensure it's registering the accounts associated with your locally run blockchain.

   - The easiest way to do that is to use Ganache, enter in the Ganache seed phrase into MetaMask, then do 'create account' for each of the   10 accounts with 100 fake ETH each.  
   - For whatever reason, using Ganache full-fledged app (the non-cli one) works more easily; maybe it's the port issue, as Ganache-cli on my system bounces back-n-forth between port 8545 and 9545
   - Yes, it's also a good idea to clear the browser cache in advance....

(2) Then enter in 'npm run dev,' which loads a web page locally using lite-server and registers as

   - 'localhost: 3000' in the URL bar.
	 - It's a blank page awaiting your proposal or initiative to be voted upon!

(3) Enter in what you deem 'voteworthy,' that you wish to be voted on by the populace, and click the "Save" button.  

   - This will bring up MetaMask to approve the transaction or "sign" the transaction
   - Yes, it costs gas to add a proposal to be voted on!  
	 - We'll assume you're doing all of this from Account #1 in MetaMask -- but any account can propose initiatve...

(4) Now you see the proposal showing up to be voted on.  

  - If you're still in Account #1, go ahead and vote for your initiative.
  - Note that web page also reflects which Eth address just voted.
  - Then click "Confirm" transaction on MetaMask, which is "signing" the transaction with MetaMask
  - Yes, a vote also incurs a gas fee to simulate what occurs on the real Ethereum blockchain!
  - Note that any chance for Account #1 to cast a vote again on this initiative is eliminated, with the voting buttons of yes, no, and abstain now 'grayed out.'

(5) Next, go to MetaMask in browser bar, switch to Account #2, and refresh page.

  - Account #2 can now cast its vote.

(6) Cycle through the remaining accounts in the same way.

   - In summary:  Be sure you're in desired MetaMask account, refresh web page, cast vote, see it recorded on web page which Eth address just voted, be prompted by MetaMask to approve vote / transaction, go to MetaMask to move onto next account, refresh web page, etc.  
   - You'll see the Dapp keeps track of votes for proposal, against proposal, and abstaining from voting on proposal in real-time with each new vote that is cast.  This information is available on web page in real-time.

(7) Once an initiative has received 10 votes (constrained only by MetaMask's 10 accounts), add another proposal to be voted upon.  

   - Yes, it's possible to add a new proposal directly below the existing proposal but...
   - The web page can quickly get crowded, so one can always clear the browser cache and do an 'npm run dev' again to get an empty web page and start anew.

(8) In summary, any account can propose an initiative or proposal to be voted upon -- at any time, in fact -- so multiple proposals can be voted on at once.  

   - The Dapp keeps track of which account has already voted on any given proposal, so the Dapp might gray out some voting buttons for one proposal but be fully enable voting buttons for another proposal.  
   - However, to keep voting on any initiative clear and transparent, it's best to just keep one initiative on web page at a time.

(9) Thanks for using the Voting Dapp!  If you have any ideas on how to extend its functionality further, please let me know your input by emailing me at ethdapp@protonmail.com.  I've got three features I'd like to add to the Dapp myself, and I am eager to add your ideas as well.



## Potential Minor Issues with MetaMask ##

It's possible you might run into an error associated with 'nonce' when using MetaMask as interface for your transactions with Ganache locally run blockchain.  

If so, the simplest way to remedy the issue is to be in desired account with MetaMask, go into "Settings," and then "Reset Account," which clears the transaction history for said account.  



## Ganache Configuration ##

Since the Voting Dapp was built off of Truffle's pet-shop tutorial, it utilizes the full-fledged Ganache downloaded app that is used in that tutorial.  Please see:
https://truffleframework.com/ganache.

This version of Ganache uses http://127.0.0.1:7545 as its network and port configuration.

You're welcome to use Ganache-cli, but as mentioned above, it presented problems with my system as the port would sometimes require 8545 and at other times request 9545, so my preference was for Ganache-GUI, as it was always content with port 7545.



## What Do You Need to Know as an Evaluator? ##

  * Dapp is straight-forward to use with ample instructions provided if needed.

  * Feel free to email me at ethdapp@protonmail.com if you have any questions.

  * Inherent in all Truffle projects, when "Truffle compile" is run successfully, it generates a "Build" directory in the main directory.  The presence of this directory may cause unintended bugs, so the "Build" directory in main directory can be safely deleted before running:
  
  	$ truffle compile --all  

  * Testing:  I have written a total of 7 test cases, and they all execute successfully.  However, the test cases have been broken up into 2 separate files,  They are entitled:
    - 1_voting.js
    - 2_voting.js
    
    For some reason that Support and I have not been able to troubleshoot and resolve, if all test cases are in one file, they run into an execution glitch.  If divided into two files, all execute beautifully.  
    - Therefore, before you run "truffle test," please ensure one of files is in test directory.  
    - See that it executes fine by issuing command "truffle test."
    - Then put other test file into test directory, while removing the initial test file.  (While not in test directory,           spare test file can sit in main directory.)  
    - Again, enter in "truffle test," and see that this file executes successfully.
    - In total, 7/7 tests pass successfully.
    - ...My utmost, sincere apologies for this [hopefully minor] inconvenience...!



## Rinkeby TestNet ##

The Voting Dapp has been deployed to the Rinkeby Testnet.  All details are in the document 'Deployed_Addresses.txt.'  

If you need some test ether on Rinkeby network to interact with the Dapp, feel free to hit me up at ethdapp@protonmail.com.



## Design Decisions ##

All details related to design and architecture for Dapp are in the document 'design_pattern_decisions.md.'



## Avoiding Common Attack Vectors ##

Dapps are prone to numerous attack vectors, and the steps taken to avoid such attacks with this Dapp are outlined in the document 'avoiding_common_attacks.md.'




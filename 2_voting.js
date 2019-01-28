var Voting = artifacts.require("./Voting.sol");

contract('Voting', function(accounts) {

  /*

  // (1) This test evaluates if a proposal or initiative can be successfully added or saved so that it can be voted upon

  it("Successfully added a proposal that can be voted upon", function() {
    return Voting.deployed().then(function(instance) {
      return instance.addProposal.call("Sample initiative");
    }).then(function(data) {
      assert.equal(data, true, "Initiative was saved and recorded by system");
    });
  });

  // (2) This test evaluates if a "Yes" vote can be successfully cast on a proposal

  it("Successfully cast a 'Yes' vote on an initiative", function() {

    var votingInstance;
    return web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account1 = accounts[0];
      return Voting.deployed().then(function(instance) {
        votingInstance = instance;
        return votingInstance.addProposal.call("Mock initiative 1");
      }).then(function(data) {
        return votingInstance.vote.call(0, 1, { from: account1 });
      }).then(function(data) {
        assert.equal(data, true, "Vote was cast and recorded by system");
      });
    });
  });

   // (3) This test evaluates if a "No" vote can be successfully cast on a proposal

  it("Successfully cast a 'No' vote on an initiative", function() {
    var votingInstance;
    return web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account2 = accounts[1];
      return Voting.deployed().then(function(instance) {
        votingInstance = instance;
        return votingInstance.addProposal.call("Mock initiative 2");
      }).then(function(data) {
        return votingInstance.vote.call(0, 2, { from: account2 });
      }).then(function(data) {
        assert.equal(data, true, "Vote was cast and recorded by system");
      });
    });
  });

   // (4) This test evaluates if an "Abstain" vote can be successfully cast on a proposal

  it("Successfully cast an 'Abstain' vote on an initiative", function() {
    var votingInstance;
    return web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account3 = accounts[2];
      return Voting.deployed().then(function(instance) {
        votingInstance = instance;
        return votingInstance.addProposal.call("Mock initiative 3");
      }).then(function(data) {
        return votingInstance.vote.call(0, 3, { from: account3 });
      }).then(function(data) {
        assert.equal(data, true, "Vote was cast and recorded by system");
      });
    });
  });

  */

  // Test #5 - This test evaluates if a vote can be counted if it is not a Y, N, or Abstain

  it("Successfully was unable to cast an invalid vote", function() {
    var votingInstance;
    return web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account4 = accounts[3];
      return Voting.deployed().then(function(instance) {
        votingInstance = instance;
        return votingInstance.addProposal.call("Fly a kite?");
      }).then(function(data) {
        return votingInstance.vote.call(0, 9, { from: account4 });  // Note here the vote cast is a "9" -- not allowed 1, 2, or 3
      }).then(function(data) {
        assert.equal(data, false, "Vote was not cast");
      });
    });
  });

  // Test #6 - Throws an error if same account tries to vote twice on same initiative 

  it("Successfully throws an exception for double voting", function() {
    var votingInstance;
    return web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account5 = accounts[4];

      return Voting.deployed().then(function(instance) {
        votingInstance = instance;
        return votingInstance.addProposal.call("Impeach Trump?");   // Initiative is the same for both votes 
      }).then(function(data) {
        return votingInstance.vote.call(0, 1, { from: account5 });   // Note here account is voting a 1 or Yes
      }).then(function(data) {
        assert.equal(data, true, "Accepts first vote");

        // Same account tries to vote again on same proposal

        return votingInstance.addProposal.call("Impeach Trump?");   // Same initiative is being queued up here for voting
      }).then(function(data) {
        return votingInstance.vote.call(0, 3, { from: account5 });   // Note here account is voting a 3 or Abstain
      }).then(assert.fail).catch(function(error) {
        assert(error.message.indexOf('revert') >= 0, "Error message must contain revert");
      });
    });
  });

  // Test #7 0 Test to see that new initiative can be queued up to be voted on, even if initial initiative received only one vote

  it("Successfully allows voting to begin on new initiative even if only one vote cast on first proposal", function() {
    var votingInstance;
    return web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      return Voting.deployed().then(function(instance) {
        votingInstance = instance;
        return votingInstance.addProposal.call("Build sandcastles?");   // Note here that initiatives are different; here proposal #1
      }).then(function(data) {
        return votingInstance.vote.call(0, 1, { from: account });       // Note here account is voting a 1 or Yes
      }).then(function(data) {
        assert.equal(data, true, "Accepts first vote on initial proposal");

        // Same account votes again but this time on another proposal
        
        return votingInstance.addProposal.call("Blow bubbles?");        // Note here initiatives are different; here proposal #2
      }).then(function(data) {
        return votingInstance.vote.call(0, 1, { from: account });       // Note here account is again voting a 1 or Yes
      }).then(function(data) {
        assert.equal(data, true, "Accepts first vote on new proposal");
      });
    });
  });
});
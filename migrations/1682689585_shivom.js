var shivomMigration = artifacts.require("./shivomContract.sol");

module.exports = function(deployer) {
  deployer.deploy(shivomMigration, "This is the first migration");
};
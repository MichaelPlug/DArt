const dart = artifacts.require("DArt");
const dcoin = artifacts.require("DCoin");
const verification = artifacts.require("Verification");
const patron = artifacts.require("Patron");

module.exports = function(deployer) {
  deployer.deploy(dart);
  deployer.deploy(dcoin);
  deployer.deploy(verification);
  deployer.deploy(patron);

  dart.deployed().then(function(dartInstance) {
    dcoin.deployed().then(function(dcoinInstance) {
      verification.deployed().then(function(verificationInstance) {
        patron.deployed().then(function(patronInstance) {
          dartInstance.setContracts(dcoinInstance.address, verificationInstance.address, patronInstance.address);
          dcoinInstance.setContracts(dartInstance.address, verificationInstance.address, patronInstance.address);
          verificationInstance.setContracts(dcoinInstance.address);
          patronInstance.setContracts(dartInstance.address, dcoinInstance.address);
        });
      });
    });
  });
};

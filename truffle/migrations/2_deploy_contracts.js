const dart = artifacts.require("DArt");
const dcoin = artifacts.require("DCoin");
const verification = artifacts.require("Verification");
const patron = artifacts.require("Patron");

module.exports = async function(deployer) {
  await deployer.deploy(dart);
  dartInstance = await dart.deployed();
  await deployer.deploy(dcoin);
  dcoinInstance = await dart.deployed();
  await deployer.deploy(verification);
  verificationInstance = await dart.deployed();
  await deployer.deploy(patron);
  patronInstance = await dart.deployed();

  await dartInstance.setContracts(dcoinInstance.address, verificationInstance.address, patronInstance.address);
  await dcoinInstance.setContracts(dartInstance.address, verificationInstance.address, patronInstance.address);
  await verificationInstance.setContracts(dcoinInstance.address);
  await patronInstance.setContracts(dartInstance.address, dcoinInstance.address);

};

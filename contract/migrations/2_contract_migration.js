const FilePatent = artifacts.require("./FilePatent.sol");

module.exports = function (deployer) {
  deployer.deploy(FilePatent);
};

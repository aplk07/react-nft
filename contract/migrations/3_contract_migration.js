const TransferPatent = artifacts.require("TransferPatent");
module.exports = function (deployer) {
  deployer.deploy(TransferPatent);
};

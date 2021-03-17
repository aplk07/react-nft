const CreateGameCard = artifacts.require("./CreateGameCard.sol");
// const GameCards = artifacts.require("./Game")
module.exports = function (deployer) {
  deployer.deploy(CreateGameCard);
};

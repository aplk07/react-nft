const CardsToken = artifacts.require("./CardsToken.sol");

module.exports = function (deployer){
    deployer.deploy(CardsToken);
}
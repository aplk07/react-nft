// SPDX-License-Identifier: MIT
pragma solidity >=0.4.17 <0.9.0;

import "./GameCards.sol";

contract CreateGameCard {
    // GameCards public gameCard
    mapping(address => GameCards) public gameCard;

    function createCard(string memory name, string memory symbol) public {
        gameCard[msg.sender] = new GameCards(name, symbol);
        // gameCard = new GameCards(name, symbol);
    }

    function createNewTokenForCard(address player, string memory tokenURI)
        public
    {
        gameCard[msg.sender].awardItem(player, tokenURI);
        // gameCard.awardItem(player, tokenURI);
    }
}

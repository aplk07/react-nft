// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.2;
import "./FilePatent.sol";

contract TransferPatent {
    FilePatent fp;
    event transferPatentEvent(
        address indexed from,
        address indexed to,
        uint256 id
    );

    function checkOwner(address contractAddress, uint256 tokenId)
        public
        returns (bool)
    {
        fp = FilePatent(contractAddress);
        return fp.ownerOf(tokenId) == msg.sender;
    }

    function transferPatent(
        address to,
        address contractAddress,
        uint256 id
    ) public {
        require(
            checkOwner(contractAddress, id),
            "You cant Transfer this patent"
        );
        emit transferPatentEvent(msg.sender, to, id);
    }
}

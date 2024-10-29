// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract RwaToken is Ownable, ERC1155 {
    uint256 public constant PROPERTY_NFT = 1;
    uint256 public constant PROPERTY_DIGITAL_COIN = 2;

    constructor(
        address _owner,
        uint256 mintAmount,
        string memory uri
    ) ERC1155(uri)Ownable(_owner) {
        _mint(_owner, PROPERTY_NFT, 1, "");
        _mint(_owner, PROPERTY_DIGITAL_COIN, mintAmount**18, "");
    }

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAuction {

    /* ============ Events ============ */
    event AuctionEnded(address winner, uint256 amount);

    /* ============ Functions ============ */

    function bid() external payable;

    function endAuction() external;
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Auction {
    error AuctionHasEnded();
    error AuctionHasNotEnded();
    error BidNotHighEnough();
    error OnlyOwnerCanEndAuction();


    address public auctioneer;
    address public highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndTime;
    uint256 public property_value;
    bool public ended;
    ERC20 public pmpToken;
    
    event EventBid(
        address _bidder,
        uint256 _bid
    );

    event AuctionEnded(address winner, uint256 amount);
    
    constructor(address _property_owner, uint256 _auctionEndTime, uint256 _property_value, address _pmpToken) {
        auctioneer = payable(_property_owner);
        auctionEndTime = _auctionEndTime;
        property_value = _property_value;
        pmpToken = ERC20(_pmpToken);
    }
    
    function bid() external payable {
        if (block.timestamp >= auctionEndTime) revert AuctionHasEnded();
        if (msg.value <= property_value || msg.value <= highestBid) revert BidNotHighEnough();

        //if(highestBidder != address(0) || highestBid != 0) pmpToken.transferFrom(address(this), highestBidder, highestBid);
        pmpToken.transferFrom(msg.sender, address(this), msg.value);
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit EventBid(msg.sender, msg.value);
    }
    
    function endAuction() external {
        if (msg.sender == auctioneer) revert OnlyOwnerCanEndAuction();
        if (block.timestamp >= auctionEndTime) revert AuctionHasNotEnded();
        if (!ended) revert AuctionHasEnded();
        
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        pmpToken.transferFrom(address(this), auctioneer, property_value);
    }

}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";


contract Auction {
    error ErrorAuctionHasEnded();
    error ErrorAuctionHasNotEnded();
    error ErrorBidNotHighEnough();
    error ErrorOnlyOwnerCanEndAuction();
    error ErrorApprovalFail();



    address public auctioneer;
    address public highestBidder;
    uint256 public highestBid;
    uint256 public auctionEndTime;
    uint256 public property_value;
    bool public ended;
    IERC20 public pmpToken;
    
    event EventBid(
        address indexed _bidder,
        uint256 indexed _bid
    );

    event AuctionEnded(address winner, uint256 amount);
    
    constructor(address _property_owner, uint256 _auctionEndTime, uint256 _property_value, address _pmpToken) {
        auctioneer = payable(_property_owner);
        auctionEndTime = _auctionEndTime;
        property_value = _property_value * 1e18;
        pmpToken = IERC20(_pmpToken);
    }
    
    function bid(uint256 amount) external  {
        if (block.timestamp >= auctionEndTime) revert ErrorAuctionHasEnded();
        if (amount <= property_value || amount <= highestBid) revert ErrorBidNotHighEnough();

        if(highestBidder != address(0) && highestBid != 0) pmpToken.transfer(highestBidder, highestBid);
        // give approval to this contract from msg.sender
        pmpToken.transferFrom(msg.sender, address(this), amount);
        highestBidder = msg.sender;
        highestBid = amount;
        emit EventBid(msg.sender, amount);
    }
    
    function endAuction() external {
        if (msg.sender != auctioneer) revert ErrorOnlyOwnerCanEndAuction();
        if (block.timestamp <= auctionEndTime) revert ErrorAuctionHasNotEnded();
        if (ended == true) revert ErrorAuctionHasEnded();
        
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
        pmpToken.transfer(auctioneer, property_value);
    }
}

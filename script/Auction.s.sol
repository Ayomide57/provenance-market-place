// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Auction} from "../src/Auction.sol";

contract AuctionScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        address _property_owner = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        uint256 _auctionEndTime= block.timestamp + 1 weeks;
        uint256 _property_value = 5;
        address _pmpToken = 0x6b1797Fe0B29025DE916AD525024AC83EE6Be8F1;

        Auction auction = new Auction(_property_owner, _auctionEndTime, _property_value, _pmpToken);

        vm.stopBroadcast();
    }
}

// To load the variables in the .env file
//source .env

//To deploy and verify our contract
//forge script --chain sepolia script/PMPToken.s.sol:PMPTokenScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv


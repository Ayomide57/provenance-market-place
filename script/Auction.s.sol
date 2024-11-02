// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Auction} from "../src/Auction.sol";

contract AuctionScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        address _property_owner = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        uint256 _auctionEndTime= block.timestamp + 4 weeks;
        uint256 _property_value = 10;
        address _pmpToken = 0x4F35fcF14D021a0890A32eC19f339287Dcd3FCfA;

        Auction auction = new Auction(_property_owner, _auctionEndTime, _property_value, _pmpToken);

        vm.stopBroadcast();
    }
}

// To load the variables in the .env file
//source .env

//To deploy and verify our contract
//forge script --chain sepolia script/PMPToken.s.sol:PMPTokenScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv


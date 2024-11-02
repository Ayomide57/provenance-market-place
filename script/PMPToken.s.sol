// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {PMPToken} from "../src/PMPToken.sol";

contract PMPTokenScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        PMPToken pmptoken = new PMPToken("PPOVENANCE MARKETPLACE TOKEN", "PMP", 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef, 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef);

        vm.stopBroadcast();
    }
}

// To load the variables in the .env file
//source .env

//To deploy and verify our contract
//forge script --chain sepolia script/PMPToken.s.sol:PMPTokenScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv

// "PPOVENANCE MARKETPLACE TOKEN", "PMP", 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

// pmp 0xddaAd340b0f1Ef65169Ae5E41A8b10776a75482d

// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, 1730376073, 10, 0xddaAd340b0f1Ef65169Ae5E41A8b10776a75482d

//mint 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 100

// transfer 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 15000000000000000000

// transfer2 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, 15000000000000000000

// aprrove contract 0xBBa767f31960394B6c57705A5e1F0B2Aa97f0Ce8, 15000000000000000000

// aprrove contract 0xBBa767f31960394B6c57705A5e1F0B2Aa97f0Ce8, 14000000000000000000

// allowance 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 0xBBa767f31960394B6c57705A5e1F0B2Aa97f0Ce8

// allowance2 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, 0xBBa767f31960394B6c57705A5e1F0B2Aa97f0Ce8




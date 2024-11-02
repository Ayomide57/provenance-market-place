// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Registrar} from "../src/Registrar.sol";

contract RegistrarScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        //_pmpToken
        Registrar registrar = new Registrar(0xCa03230E7FB13456326a234443aAd111AC96410A);

        vm.stopBroadcast();
    }
}

// New

// function Register  - Lightout, lekan, Nigeria, +2348147643756

// function invest
// function withdraw investment

// function add collateral - 20, ipfs://QmbzMs3gHZ4XKpvxMgvVB15BfXtqq3ebSRv24GGGsFrrTP/Homework1.pdf, 1000000, 123, 100112, 133, land, los angeles, 100000
// prop_reg_Id 123
// borrower address 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db

// function loanRequest - 123, 200000

// function create loan - 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 10, 100, 100000, 500000, 123, 120ert, 2

// function updateLoan 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 0, 2

// function paymentDisbursal 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 0


//10800000000000000000
//1800000000000000000

//forge script --chain neo script/Registrar.s.sol:RegistrarScript --rpc-url $NEO_RPC_URL --broadcast --verify -vvvv

//forge create Registrar --rpc-url $RPC_URL --private-key $PRIVATE_KEY
//forge create --rpc-url $NEO_RPC_URL --private-key $PRIVATE_KEY src/Registrar.sol:Registrar

//forge script --chain 11155111 script/PMPToken.s.sol:PMPTokenScript --rpc-url $SEPOLIA_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --gas-price 40000000000 --legacy -vvvv

//ipfs://QmVxQ5djvZJ5TSx1MEpb8C7HcYn7fkuubtKyJTB1W93pWD/Homework2.pdf


//forge script --chain sepolia script/PMPToken.s.sol:PMPTokenScript --rpc-url $SEPOLIA_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --legacy --verify $ETHERSCAN_API_KEY -vvvv

//forge script --chain 84532 script/PMPToken.s.sol:PMPTokenScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --verify $BASESEPOLIA_SCAN_API_KEY --legacy -vvvv

//forge script --chain sepolia script/Auction.s.sol:AuctionScript --rpc-url $SEPOLIA_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --legacy -vvvv

//forge script --chain sepolia script/Registrar.s.sol:RegistrarScript --rpc-url $SEPOLIA_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --verify $ETHERSCAN_API_KEY --legacy -vvvv

//forge script --chain sepolia script/PMPToken.s.sol:PMPTokenScript --rpc-url $ARBITRUM_SEPOLIA_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --legacy --verify $ARBITRUMSEPOLIA_SCAN_API_KEY -vvvv

//forge script --chain sepolia script/Registrar.s.sol:RegistrarScript --rpc-url $SEPOLIA_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --verify $ETHERSCAN_API_KEY --legacy -vvvv



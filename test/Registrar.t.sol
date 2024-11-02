// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Registrar} from "../src/Registrar.sol";

contract RegistrarTest is Test {
    Registrar public registrar;

    function setUp() public {
        registrar = new Registrar(0xCa03230E7FB13456326a234443aAd111AC96410A);
    }

    function test_Verification_Request() public {
        assertEq(registrar.verification_request(
            0x08d4cBA7460bAc481D1dc37CE5298942d3626273, 1234, "ipfs://QmbzMs3gHZ4XKpvxMgvVB15BfXtqq3ebSRv24GGGsFrrTP/Homework1.pdf"
        ), true);
    }

    function test_get_timestamp() public view {
        console.log(block.timestamp + 1 weeks);
        //assertEq(registrar.findAssets(0x08d4cBA7460bAc481D1dc37CE5298942d3626273, 67), 67);
    }
}

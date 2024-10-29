// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Registrar} from "../src/Registrar.sol";

contract RegistrarTest is Test {
    Registrar public registrar;

    function setUp() public {
        registrar = new Registrar();
    }

    function test_Verification_Request() public {
        assertEq(registrar.verification_request(
            0x08d4cBA7460bAc481D1dc37CE5298942d3626273, 67, 1234, 234, "ipfs://QmbzMs3gHZ4XKpvxMgvVB15BfXtqq3ebSRv24GGGsFrrTP/Homework1.pdf"
        ), true);
    }

    function test_find_assets() public view {
        //assertEq(registrar.findAssets(0x08d4cBA7460bAc481D1dc37CE5298942d3626273, 67), 67);
    }
}

## Provenance Marketplace

## Title
Provenance Marketplace is a platform that transforms real-world assets into collateral using ERC1155 standard. The tokens generated will include both fungible and non-fungible tokens. The fungible tokens can be traded on other platforms for different digital assets and can also serve various purposes, such as acting as collateral for loans. Additionally, the platform plans to introduce a feature that allows users to list their properties for sale, enabling potential buyers to place bids. Ownership transfers and document signing will be conducted entirely online, streamlining the buying and selling process.
## Problem

Title: Traditional Lending Limitations
Bullets:
Lack of accessibility to loans for many individuals and businesses.
Lengthy approval processes and high interest rates.
Limited transparency and trust in traditional lending institutions.
Inadequate collateral options for borrowers.

## Project Information

- **Name:** Provenance Marketplace
- **Title:** Provenance Marketplace
- **Version:** 0.0.1
- **Summary:** is a platform that transforms real-world assets into collateral using ERC1155 standard.

## Author Information

- **Author:** Quadri Lekan Ayomide Aderojuola
- **GitHub:** [Ayomide](https://github.com/Ayomide57/)
- **Email:** [aderojuolaayomide57@gmail.com](mailto:aderojuolaayomide57@gmail.com)
- **Email:** [quadriaderojuola@gmail.com](mailto:quadriaderojuola@gmail.com)
- **Git Repository:** [rwa-loan-collateral](https://github.com/Ayomide57/rwa-loan-collateral)


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contract Addresses

Registrar Contract is deployed to [0x1bddabb544fffd89ed263b28cf5827635b60e345] on Neo X
Deployer: [0x15427D97E45e3374DF934B0f1292C8556D1B79DD]
Transaction hash: 0x8c1403f83620bc37d931749198ad78000de1957aeb8a8b2c4c85d21536921919
(https://neoxt4scan.ngd.network/tx/0x8c1403f83620bc37d931749198ad78000de1957aeb8a8b2c4c85d21536921919) on Shardeum.

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge create --legacy --rpc-url https://sphinx.shardeum.org/ --private-key <your_private_key> src ChainCreditContract.sol:ChainCreditContract
$ forge create --legacy --rpc-url https://sphinx.shardeum.org/ --private-key <your_private_key> src/Registrar.sol:Registrar

```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

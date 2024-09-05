🚧 Work in progress, not ready for production 🚧

<div align="center">
  <h1> Evmos Burn Auction Instant dApp </h1>
</div>

<div align="center">
<a href="https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE">
<img alt="License: ENCL-1.0" src="https://img.shields.io/badge/license-ENCL--1.0-orange" />
</a>
<a href="https://discord.gg/evmos">
<img alt="Discord" src="https://img.shields.io/discord/809048090249134080.svg" />
</a>
<a href="https://twitter.com/EvmosOrg">
<img alt="Twitter Follow Evmos" src="https://img.shields.io/twitter/follow/EvmosOrg"/>
</a>
</div>

The instant dapp for the Burn Auction module of Evmos.

> https://store.evmos.org/dapps/defi/burn-auction

## Documentation

Pre-requisites:

- [Node.js](https://nodejs.org/en/download/) (v20.16.0 or higher)
- [Pnpm](https://pnpm.io/installation)

### Installation

```bash
pnpm install

cp .env.example .env
# edit the .env file with your own values
```

### Development

```bash
pnpm dev
pnpm dev:dappstore # to run the dappstore sdk preview that handles the wallet connection
```

### Build

```bash
pnpm build
```

### Test with a local node

Follow the instructions described in this issue in order to run a local node with the Burn Auction module enabled: https://github.com/evmos/burn-auction-dapp/issues/5

### Indexing Endpoints

To index blockchain events into the database, you can use the following endpoints:

- `/api/index/index-bid-event`: Indexes bid events from the blockchain to the database.
- `/api/index/auction-end-event`: Indexes auction end events from the blockchain to the database.

These endpoints will index events from the block number specified in `process.env.FIRST_AUCTION_BLOCK` to the latest block number in batches of 10000 blocks.

## Community

The following chat channels and forums are a great spot to ask questions about Evmos:

- [Evmos Twitter](https://twitter.com/EvmosOrg)
- [Evmos Discord](https://discord.gg/evmos)
- [Evmos Forum](https://commonwealth.im/evmos)

## Contributing

Looking for a good place to start contributing?
Check out some
[`good first issues`](https://github.com/evmos/burn-auction-dapp/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

For additional instructions, standards and style guides, please refer to the [Contributing](./CONTRIBUTING.md) document.

## Careers

See our open positions on [Greenhouse](https://boards.eu.greenhouse.io/evmos).

## Disclaimer

The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

## Licensing

Starting from April 21th, 2023, this repository will update its license to Evmos Non-Commercial License 1.0 (ENCL-1.0). For more information see [LICENSE](/LICENSE).

### SPDX Identifier

The following header including a license identifier in SPDX short form has been added in all ENCL-1.0 files:

```js
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)
```

### License FAQ

Find below an overview of Permissions and Limitations of the Evmos Non-Commercial License 1.0. For more information, check out the full ENCL-1.0 FAQ [here](/LICENSE_FAQ.md).

| Permissions                                                                                                                                                                  | Prohibited                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| - Private Use, including distribution and modification<br />- Commercial use on designated blockchains<br />- Commercial use with Evmos permit (to be separately negotiated) | Commercial use, other than on designated blockchains, without Evmos permit |

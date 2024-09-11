# Develop with local node

## Start local chain

1. Pull this branch https://github.com/evmos/evmos/tree/release/v20.0.x
2. Copy the following script in `local_node.sh`

```sh
#!/bin/bash

CHAINID="${CHAIN_ID:-evmos_9000-1}"
MONIKER="localtestnet"
# Remember to change to other types of keyring like 'file' in-case exposing to outside world,
# otherwise your balance will be wiped quickly
# The keyring test does not require private key to steal tokens from you
KEYRING="test"
KEYALGO="eth_secp256k1"
LOGLEVEL="info"
# Set dedicated home directory for the evmosd instance
HOMEDIR="$HOME/.tmp-evmosd"
# to trace evm
#TRACE="--trace"
TRACE=""

# feemarket params basefee
BASEFEE=1000000000

# Path variables
CONFIG=$HOMEDIR/config/config.toml
APP_TOML=$HOMEDIR/config/app.toml
GENESIS=$HOMEDIR/config/genesis.json
TMP_GENESIS=$HOMEDIR/config/tmp_genesis.json

# validate dependencies are installed
command -v jq >/dev/null 2>&1 || {
	echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"
	exit 1
}

# used to exit on first error (any non-zero exit code)
set -e

# Parse input flags
install=true
overwrite=""

while [[ $# -gt 0 ]]; do
	key="$1"
	case $key in
	-y)
		echo "Flag -y passed -> Overwriting the previous chain data."
		overwrite="y"
		shift # Move past the flag
		;;
	-n)
		echo "Flag -n passed -> Not overwriting the previous chain data."
		overwrite="n"
		shift # Move past the argument
		;;
	--no-install)
		echo "Flag --no-install passed -> Skipping installation of the evmosd binary."
		install=false
		shift # Move past the flag
		;;
	*)
		echo "Unknown flag passed: $key -> Exiting script!"
		exit 1
		;;
	esac
done

if [[ $install == true ]]; then
	# (Re-)install daemon
	make install
fi

# User prompt if neither -y nor -n was passed as a flag
# and an existing local node configuration is found.
if [[ $overwrite = "" ]]; then
	if [ -d "$HOMEDIR" ]; then
		printf "\nAn existing folder at '%s' was found. You can choose to delete this folder and start a new local node with new keys from genesis. When declined, the existing local node is started. \n" "$HOMEDIR"
		echo "Overwrite the existing configuration and start a new local node? [y/n]"
		read -r overwrite
	else
		overwrite="y"
	fi
fi

# Setup local node if overwrite is set to Yes, otherwise skip setup
if [[ $overwrite == "y" || $overwrite == "Y" ]]; then
	# Remove the previous folder
	rm -rf "$HOMEDIR"

	# Set client config
	evmosd config keyring-backend "$KEYRING" --home "$HOMEDIR"
	evmosd config chain-id "$CHAINID" --home "$HOMEDIR"

	# myKey address 0x7cb61d4117ae31a12e393a1cfa3bac666481d02e | evmos10jmp6sgh4cc6zt3e8gw05wavvejgr5pwjnpcky
	VAL_KEY="mykey"
	VAL_MNEMONIC="gesture inject test cycle original hollow east ridge hen combine junk child bacon zero hope comfort vacuum milk pitch cage oppose unhappy lunar seat"

	# dev0 address 0xc6fe5d33615a1c52c08018c47e8bc53646a0e101 | evmos1cml96vmptgw99syqrrz8az79xer2pcgp84pdun
	USER1_KEY="dev0"
	USER1_MNEMONIC="copper push brief egg scan entry inform record adjust fossil boss egg comic alien upon aspect dry avoid interest fury window hint race symptom"

	# dev1 address 0x963ebdf2e1f8db8707d05fc75bfeffba1b5bac17 | evmos1jcltmuhplrdcwp7stlr4hlhlhgd4htqh3a79sq
	USER2_KEY="dev1"
	USER2_MNEMONIC="maximum display century economy unlock van census kite error heart snow filter midnight usage egg venture cash kick motor survey drastic edge muffin visual"

	# dev2 address 0x40a0cb1C63e026A81B55EE1308586E21eec1eFa9 | evmos1gzsvk8rruqn2sx64acfsskrwy8hvrmafqkaze8
	USER3_KEY="dev2"
	USER3_MNEMONIC="will wear settle write dance topic tape sea glory hotel oppose rebel client problem era video gossip glide during yard balance cancel file rose"

	# dev3 address 0x498B5AeC5D439b733dC2F58AB489783A23FB26dA | evmos1fx944mzagwdhx0wz7k9tfztc8g3lkfk6rrgv6l
	USER4_KEY="dev3"
	USER4_MNEMONIC="doll midnight silk carpet brush boring pluck office gown inquiry duck chief aim exit gain never tennis crime fragile ship cloud surface exotic patch"

	# Import keys from mnemonics
	echo "$VAL_MNEMONIC" | evmosd keys add "$VAL_KEY" --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOMEDIR"
	echo "$USER1_MNEMONIC" | evmosd keys add "$USER1_KEY" --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOMEDIR"
	echo "$USER2_MNEMONIC" | evmosd keys add "$USER2_KEY" --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOMEDIR"
	echo "$USER3_MNEMONIC" | evmosd keys add "$USER3_KEY" --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOMEDIR"
	echo "$USER4_MNEMONIC" | evmosd keys add "$USER4_KEY" --recover --keyring-backend "$KEYRING" --algo "$KEYALGO" --home "$HOMEDIR"

	# Set moniker and chain-id for Evmos (Moniker can be anything, chain-id must be an integer)
	evmosd init $MONIKER -o --chain-id "$CHAINID" --home "$HOMEDIR"

	# Change parameter token denominations to aevmos
	jq '.app_state["staking"]["params"]["bond_denom"]="aevmos"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
	jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="aevmos"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
	# When upgrade to cosmos-sdk v0.47, use gov.params to edit the deposit params
	jq '.app_state["gov"]["params"]["min_deposit"][0]["denom"]="aevmos"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
	jq '.app_state["evm"]["params"]["evm_denom"]="aevmos"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
	jq '.app_state["inflation"]["params"]["mint_denom"]="aevmos"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
	jq '.app_state["epochs"]["epochs"][0]["duration"]="25s"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

  # Add token pair for uatom
  jq '.app_state["erc20"]["token_pairs"][1]["erc20_address"]="0x5db67696C3c088DfBf588d3dd849f44266ff0ffa"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
  jq '.app_state["erc20"]["token_pairs"][1]["denom"]="uatom"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
  jq '.app_state["erc20"]["token_pairs"][1]["enabled"]=true' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
  jq '.app_state["erc20"]["token_pairs"][1]["contract_owner"]=1' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

	# Set gas limit in genesis
	jq '.consensus_params["block"]["max_gas"]="10000000"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

	# Set base fee in genesis
	jq '.app_state["feemarket"]["params"]["base_fee"]="'${BASEFEE}'"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"

	if [[ $1 == "pending" ]]; then
		if [[ "$OSTYPE" == "darwin"* ]]; then
			sed -i '' 's/timeout_propose = "3s"/timeout_propose = "30s"/g' "$CONFIG"
			sed -i '' 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' "$CONFIG"
			sed -i '' 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' "$CONFIG"
			sed -i '' 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' "$CONFIG"
			sed -i '' 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' "$CONFIG"
			sed -i '' 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' "$CONFIG"
			sed -i '' 's/timeout_commit = "5s"/timeout_commit = "150s"/g' "$CONFIG"
			sed -i '' 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' "$CONFIG"
		else
			sed -i 's/timeout_propose = "3s"/timeout_propose = "30s"/g' "$CONFIG"
			sed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' "$CONFIG"
			sed -i 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' "$CONFIG"
			sed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' "$CONFIG"
			sed -i 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' "$CONFIG"
			sed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' "$CONFIG"
			sed -i 's/timeout_commit = "5s"/timeout_commit = "150s"/g' "$CONFIG"
			sed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' "$CONFIG"
		fi
	fi

	# enable prometheus metrics and all APIs for dev node
	if [[ "$OSTYPE" == "darwin"* ]]; then
		sed -i '' 's/prometheus = false/prometheus = true/' "$CONFIG"
		sed -i '' 's/prometheus-retention-time = 0/prometheus-retention-time  = 1000000000000/g' "$APP_TOML"
		sed -i '' 's/enabled = false/enabled = true/g' "$APP_TOML"
		sed -i '' 's/enable = false/enable = true/g' "$APP_TOML"
		# Don't enable memiavl by default
		grep -q -F '[memiavl]' "$APP_TOML" && sed -i '' '/\[memiavl\]/,/^\[/ s/enable = true/enable = false/' "$APP_TOML"
	else
		sed -i 's/prometheus = false/prometheus = true/' "$CONFIG"
		sed -i 's/prometheus-retention-time  = "0"/prometheus-retention-time  = "1000000000000"/g' "$APP_TOML"
		sed -i 's/enabled = false/enabled = true/g' "$APP_TOML"
		sed -i 's/enable = false/enable = true/g' "$APP_TOML"
		# Don't enable memiavl by default
		grep -q -F '[memiavl]' "$APP_TOML" && sed -i '/\[memiavl\]/,/^\[/ s/enable = true/enable = false/' "$APP_TOML"
	fi

	# Change proposal periods to pass within a reasonable time for local testing
	sed -i.bak 's/"max_deposit_period": "172800s"/"max_deposit_period": "30s"/g' "$GENESIS"
	sed -i.bak 's/"voting_period": "172800s"/"voting_period": "30s"/g' "$GENESIS"

	# set custom pruning settings
	sed -i.bak 's/pruning = "default"/pruning = "custom"/g' "$APP_TOML"
	sed -i.bak 's/pruning-keep-recent = "0"/pruning-keep-recent = "2"/g' "$APP_TOML"
	sed -i.bak 's/pruning-interval = "0"/pruning-interval = "10"/g' "$APP_TOML"

	# Allocate genesis accounts (cosmos formatted addresses)
	evmosd add-genesis-account "$(evmosd keys show "$VAL_KEY" -a --keyring-backend "$KEYRING" --home "$HOMEDIR")" 100000000000000000000000000aevmos --keyring-backend "$KEYRING" --home "$HOMEDIR"
	evmosd add-genesis-account "$(evmosd keys show "$USER1_KEY" -a --keyring-backend "$KEYRING" --home "$HOMEDIR")" 1000000000000000000000aevmos,100000000uatom --keyring-backend "$KEYRING" --home "$HOMEDIR"
	evmosd add-genesis-account "$(evmosd keys show "$USER2_KEY" -a --keyring-backend "$KEYRING" --home "$HOMEDIR")" 1000000000000000000000aevmos --keyring-backend "$KEYRING" --home "$HOMEDIR"
	evmosd add-genesis-account "$(evmosd keys show "$USER3_KEY" -a --keyring-backend "$KEYRING" --home "$HOMEDIR")" 1000000000000000000000aevmos --keyring-backend "$KEYRING" --home "$HOMEDIR"
	evmosd add-genesis-account "$(evmosd keys show "$USER4_KEY" -a --keyring-backend "$KEYRING" --home "$HOMEDIR")" 1000000000000000000000aevmos --keyring-backend "$KEYRING" --home "$HOMEDIR"

	# Sign genesis transaction
	evmosd gentx "$VAL_KEY" 1000000000000000000000aevmos --gas-prices ${BASEFEE}aevmos --keyring-backend "$KEYRING" --chain-id "$CHAINID" --home "$HOMEDIR"
	## In case you want to create multiple validators at genesis
	## 1. Back to `evmosd keys add` step, init more keys
	## 2. Back to `evmosd add-genesis-account` step, add balance for those
	## 3. Clone this ~/.evmosd home directory into some others, let's say `~/.clonedEvmosd`
	## 4. Run `gentx` in each of those folders
	## 5. Copy the `gentx-*` folders under `~/.clonedEvmosd/config/gentx/` folders into the original `~/.evmosd/config/gentx`

	# Collect genesis tx
	evmosd collect-gentxs --home "$HOMEDIR"

	# Run this to ensure everything worked and that the genesis file is setup correctly
	evmosd validate-genesis --home "$HOMEDIR"

	if [[ $1 == "pending" ]]; then
		echo "pending mode is on, please wait for the first block committed."
	fi
fi

# Start the node
evmosd start \
	--metrics "$TRACE" \
	--log_level $LOGLEVEL \
	--minimum-gas-prices=0.0001aevmos \
	--json-rpc.api eth,txpool,personal,net,debug,web3 \
	--home "$HOMEDIR" \
	--chain-id "$CHAINID"
```

3. Run `./local_node.sh -y` the first time

## Other

### Get tokens pair

```sh
evmosd q erc20 token-pairs --home ~/.tmp-evmosd
pagination:
  next_key: null
  total: "2"
token_pairs:
- contract_owner: OWNER_MODULE
  denom: aevmos
  enabled: true
  erc20_address: 0xD4949664cD82660AaE99bEdc034a0deA8A0bd517
- contract_owner: OWNER_MODULE
  denom: uatom
  enabled: true
  erc20_address: 0x5db67696C3c088DfBf588d3dd849f44266ff0ffa
```

### Change epoch duration

```sh
jq '.app_state["epochs"]["epochs"][0]["duration"]="25s"' "$GENESIS" >"$TMP_GENESIS" && mv "$TMP_GENESIS" "$GENESIS"
```

## Gets tests accounts private keys

### List accounts

```sh
evmosd keys list --keyring-backend test --home ~/.tmp-evmosd
- address: evmos1cml96vmptgw99syqrrz8az79xer2pcgp84pdun
  name: dev0
  pubkey: '{"@type":"/ethermint.crypto.v1.ethsecp256k1.PubKey","key":"AtXCpR7zQkJ2tZ3oiKA3V9ugfBEkUUmw6dC1bQAX8f3v"}'
  type: local
- address: evmos1jcltmuhplrdcwp7stlr4hlhlhgd4htqh3a79sq
  name: dev1
  pubkey: '{"@type":"/ethermint.crypto.v1.ethsecp256k1.PubKey","key":"ArMvs2q6M7Tu0EoohH+TvZGcHe3KWuaAJJeRpEp6jskn"}'
  type: local
- address: evmos1gzsvk8rruqn2sx64acfsskrwy8hvrmafqkaze8
  name: dev2
  pubkey: '{"@type":"/ethermint.crypto.v1.ethsecp256k1.PubKey","key":"A6q73mavKf+3Su1r9Ks6Y3w6T+17Ety5opH7/lFW99ek"}'
  type: local
- address: evmos1fx944mzagwdhx0wz7k9tfztc8g3lkfk6rrgv6l
  name: dev3
  pubkey: '{"@type":"/ethermint.crypto.v1.ethsecp256k1.PubKey","key":"A0KzLfOTKvyCPfvxSz7xAMzCzmJNkSIpfI1JrDCxbmUW"}'
  type: local
- address: evmos10jmp6sgh4cc6zt3e8gw05wavvejgr5pwjnpcky
  name: mykey
  pubkey: '{"@type":"/ethermint.crypto.v1.ethsecp256k1.PubKey","key":"A5LuwPzowaWjWd3y1cekZnOLw/w4twRtgbgU05gR1a/d"}'
  type: local
```

### Export private key

```sh
evmosd keys unsafe-export-eth-key dev0 --home ~/.tmp-evmosd
88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305
```

### Add network to metamask

RPC - `http://127.0.0.1:8545/`
chainId - `9000`

### Check balance uatom

`evmosd q bank balances evmos1cml96vmptgw99syqrrz8az79xer2pcgp84pdun --home ~/.tmp-evmosd`

## Disable pruning

There should be 3 lines with pruning options on `local_node.sh`

```
sed -i.bak 's/pruning = "default"/pruning = "custom"/g' "$APP_TOML"
sed -i.bak 's/pruning-keep-recent = "0"/pruning-keep-recent = "2"/g' "$APP_TOML"
sed -i.bak 's/pruning-interval = "0"/pruning-interval = "10"/g' "$APP_TOML"
```

remove the bottom 2 and on the first one replace custom with nothing

## Load precompile on remix

![Image](/docs/assets/load-precompile-1.png)
![Image](/docs/assets/load-precompile-2.png)
![Image](/docs/assets/load-precompile-3.png)

Deposit line:

```
"0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101", "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa", "10000000"
```

## Warnings

⚠️ When restarting the chain from genesis clear data and reset nonce in metamask

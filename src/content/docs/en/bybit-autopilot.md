---
title: "Bybit AutoPilot"
description: "AutoPilot Software — Bybit automation: registration, trading, withdrawals, TokenSplash, Puzzle Hunt"
---

# AutoPilot Software — Maximum Automation on Bybit

**Supports AdsPower & Dolphin & Vision**
**Windows / MacOS / Linux**

---

## Forget about manual work: the solution is here

Bybit is one of the world's leading cryptocurrency exchanges with earning opportunities through Airdrops, TokenSplash events, and special promotions.

Managing accounts manually requires a lot of time, effort, and carries the risk of errors. AutoPilot Software turns routine tasks into an automated process. Integration with AdsPower, Dolphin, and Vision ensures digital fingerprint protection and secure multi-account management.

---

## How AutoPilot Works

```mermaid
flowchart LR
    A["📋 Fill in the table"] --> B["⚙️ Configure settings"]
    B --> C["🚀 Launch AutoPilot"]
    C --> D["✅ Results in the table"]

    style A fill:#4CAF50,color:#fff,stroke:none,rx:12
    style B fill:#2196F3,color:#fff,stroke:none,rx:12
    style C fill:#FF9800,color:#fff,stroke:none,rx:12
    style D fill:#9C27B0,color:#fff,stroke:none,rx:12
```

---

## Key Advantages

**Time savings:**
Automation allows you to manage hundreds of accounts simultaneously

**Ease of use:**
Go about your day while AutoPilot automates actions in the background

**Integration with AdsPower / Dolphin / Vision:**
Safe and anonymous account usage. AutoPilot automatically launches and integrates into the anti-detect browser session with unique fingerprints

**Parallel automation:**
Automate many accounts at the same time

**Convenient account tracking table:**
Keep track of all accounts in a single Excel table. You can add new columns, rearrange the order — just don't rename the columns from the template

**Speed modes:**
- **FAST** — maximum speed with minimal delays
- **MEDIUM** — moderate speed, human behavior simulation, Smart Cursor, Human Typing
- **SLOW** — slow speed, full human behavior simulation

**Multi-functionality:**
Configure any actions for each account. For example, AutoPilot can retrieve deposit addresses for some accounts while withdrawing funds from others

**Automatic action chains:**
Choose any action — AutoPilot will automatically log in if a login is required. It will also enable 2FA protection automatically if it hasn't been set up yet

**Auto-generated passwords:**
During registration, AutoPilot will generate a strong password if none is provided

**Full asset liquidation:**
Complete withdrawal with automatic conversion of all assets to USDT

**Logging:**
Full result logging in `logs/` and automatic table backups in `backup/`

---

## Bybit AutoPilot Features

```mermaid
mindmap
  root((Bybit AutoPilot))
    Accounts
      Registration
      Login
      KYC Check
      2FA Setup
      Learn & Avatar
    Wallets
      Deposit Address
      Address Whitelist
      Withdrawal
      Full Withdrawal
    Spot Trading
      Market Trading
      Limit Trading
      Buy / Sell
      Volume Boosting
    Futures
      Futures Trading
      Smart Futures
    Staking
      Earn / Stake
      Unearn / Unstake
    Events
      TokenSplash
      LaunchPad
      Puzzle Hunt
      Claim Rewards
    Utilities
      API Keys
      Profit Calculation
      Referral Code
      KYC Link
```

AutoPilot supports a wide range of automated actions for Bybit:

- **Registration** of accounts on Bybit: standard method, via referral link
- **Login**: signing into an account, checking verification and balance
- **KYC Check**: verification level check displaying country, name, and document
- **2FA Management**: setting up two-factor authentication
- **Learn & Avatar**: completing learning modules and setting profile avatar
- **Retrieving deposit addresses** for each account
- **Adding addresses to the whitelist** with support for various networks
- **Withdrawing funds** from an account, including full withdrawal with conversion of all assets
- **Obtaining API keys** for trading
- **Automated trading**: market and limit trading, volume boosting on specified pairs
- **Buy / Sell**: buying assets and selling all coins to USDT
- **Futures trading**: standard and smart futures with post-only orders (32% fee savings)
- **Staking**: USDT Flexible Savings (earn / unearn)
- **TokenSplash**: automatic participation in events with deposit task completion
- **LaunchPad**: automatic registration in active LaunchPad events
- **Puzzle Hunt**: automatic completion of puzzle tasks
- **Claiming rewards**: coupons, batch claims, activity rewards
- **Referral codes**: automatic extraction of account referral codes
- **KYC link**: getting SUMSUB verification link
- **Profit calculation**: automatic WITHDRAW - DEPOSIT analysis
- Automatic captcha solving, email verification code retrieval, and more

---

## Full List of Actions (ACTION)

### General Action Workflow

```mermaid
flowchart TD
    START["🎯 Select ACTION in the table"] --> AUTO{"AutoPilot running?"}
    AUTO -->|Yes| LOGIN{"Login needed?"}
    LOGIN -->|Yes| DO_LOGIN["🔑 Automatic login"]
    LOGIN -->|No| TFA{"2FA needed?"}
    DO_LOGIN --> TFA
    TFA -->|Not enabled| DO_2FA["🔐 Auto-enable 2FA"]
    TFA -->|Enabled| ACTION["⚡ Execute action"]
    DO_2FA --> ACTION
    ACTION --> RESULT["📊 Result saved to table"]

    style START fill:#FF9800,color:#fff,stroke:none,rx:10
    style DO_LOGIN fill:#2196F3,color:#fff,stroke:none,rx:10
    style DO_2FA fill:#9C27B0,color:#fff,stroke:none,rx:10
    style ACTION fill:#4CAF50,color:#fff,stroke:none,rx:10
    style RESULT fill:#607D8B,color:#fff,stroke:none,rx:10
```

> All actions except registration will automatically log in if needed. The whitelist and withdraw actions will automatically enable 2FA if it is not set up.

---

### `register` — Account Registration on Bybit

Account registration with automatic captcha solving and email confirmation

```mermaid
flowchart LR
    A["Open page"] --> B["Enter email and password"]
    B --> C["Solve captcha"]
    C --> D["Confirm email"]
    D --> E["✅ Success"]

    style E fill:#4CAF50,color:#fff,stroke:none,rx:8
```

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[EMAIL] mail_provider` | Email service (yahoo, rambler, icloud, outlook, gmail...) |
| **Required** | `[PROFILE] mail` | Email address |
| **Required** | `[EMAIL] mail_password` | Email password / IMAP password |
| Optional | `[PROFILE] bybit_password` | Account password (AutoPilot generates one if empty) |
| Optional | `[REG] referral_code` | Referral code |
| **Updates** | `[REG] is_registered` | Registration status (1 — registered) |
| **Updates** | `[RESULT] status` | `[REGISTER] SUCCESS` or error description |

> To start registration, you only need to fill in 4 columns: profile_id, mail_provider, mail, mail_password

---

### `login` — Account Login

Sign into an account, check verification and balance

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[REG] is_registered` | 1 (registered) |
| **Required** | `[PROFILE] mail` | Email address |
| **Required** | `[PROFILE] bybit_password` | Account password |
| Optional | `[2FA] totp_secret_code` | 2FA secret code |
| **Updates** | `[KYC] kyc_status` | Verification level |
| **Updates** | `[BALANCE] account_balance` | Account balance in USDT |
| **Updates** | `[RESULT] status` | `[LOGIN] SUCCESS` |

---

### `2fa` — Enable 2FA

Automatic setup of Google Authenticator on the account

```mermaid
flowchart LR
    A["Security settings"] --> B["Retrieve QR code"]
    B --> C["Extract secret"]
    C --> D["Generate TOTP"]
    D --> E["Confirm with codes"]
    E --> F["✅ 2FA enabled"]

    style F fill:#4CAF50,color:#fff,stroke:none,rx:8
```

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[2FA] totp_secret_code` | 2FA secret code (saved automatically) |
| **Updates** | `[RESULT] status` | `[2FA] SUCCESS` |

---

### `deposit` — Get Deposit Address

Retrieve the deposit address for funding the account

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[DEPOSIT] deposit_coin` | Coin for deposit (e.g.: `USDT`) |
| **Required** | `[DEPOSIT] deposit_chain` | Network (e.g.: `TRC20`, `Aptos`, `Mantle`) |
| **Updates** | `[DEPOSIT] deposit_address` | Deposit address |
| **Updates** | `[RESULT] status` | `[DEPOSIT] SUCCESS` |

---

### `whitelist` — Add Address to Whitelist

Enable whitelist mode and add a withdrawal address

```mermaid
flowchart LR
    A["Enable Whitelist"] --> B["Confirm 2FA"]
    B --> C["Add address"]
    C --> D["Select network and memo"]
    D --> E["✅ Address added"]

    style E fill:#4CAF50,color:#fff,stroke:none,rx:8
```

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[WHITELIST] whitelist_address` | Wallet address |
| **Required** | `[WHITELIST] whitelist_chain` | Network (e.g.: `TRC20`, `Aptos`, `Mantle`) |
| Optional | `[WHITELIST] whitelist_memo` | Memo/Tag (if required by the network) |
| **Updates** | `[WHITELIST] whitelist_status` | 1 — successfully added |
| **Updates** | `[RESULT] status` | `[WHITELIST] SUCCESS` |

> If 2FA is not enabled — AutoPilot will automatically set it up before adding to the whitelist

---

### `withdraw` — Withdraw Funds

Withdraw funds from the account with automatic confirmation

```mermaid
flowchart LR
    A["Select coin"] --> B["Enter address and network"]
    B --> C["Specify amount"]
    C --> D["Confirm with codes"]
    D --> E["✅ Funds sent"]

    style E fill:#4CAF50,color:#fff,stroke:none,rx:8
```

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[WITHDRAW] withdraw_coin` | Coin to withdraw (e.g.: `USDT`) |
| **Required** | `[WITHDRAW] withdraw_chain` | Withdrawal network (e.g.: `TRC20`, `Aptos`) |
| **Required** | `[WITHDRAW] withdraw_address` | Recipient wallet address |
| Optional | `[WITHDRAW] withdraw_memo` | Memo/Tag |
| Optional | `[WITHDRAW] withdraw_amount` | Amount in % (100 = all, 50 = half) |
| **Updates** | `[RESULT] status` | `[WITHDRAW] SUCCESS` |

> If 2FA is not enabled — AutoPilot will automatically set it up before withdrawal

---

### Full Withdrawal Algorithm (`full_withdraw=YES`)

If `full_withdraw=YES` is enabled in the config, AutoPilot will perform a complete sale of all assets before withdrawal:

```mermaid
flowchart TD
    A["Transfer from FUNDING to TRADING"] --> B["Sell all assets for USDT"]
    B --> C["Convert remaining dust to MNT"]
    C --> D["Buy more MNT if needed"]
    D --> E["Sell MNT for USDT"]
    E --> F["Return USDT to FUNDING"]
    F --> G["✅ Withdraw"]

    style A fill:#2196F3,color:#fff,stroke:none,rx:8
    style B fill:#FF9800,color:#fff,stroke:none,rx:8
    style G fill:#4CAF50,color:#fff,stroke:none,rx:8
```

---

### Master Wallet System — Auto-Whitelists, $0 Fees, Untraceable Withdrawals

Withdraw from hundreds of accounts without touching a single address manually. AutoPilot creates a **unique wallet for every account**, whitelists it automatically, withdraws with **zero fees**, and collects everything to your master wallet. Every account withdraws to a **different address** — no way to link them together.

```mermaid
flowchart TD
    A["🔐 setup_aptos_hd"] --> B["🏷️ whitelist_aptos_hd"]
    B --> C["💳 withdraw"]
    C --> D["📥 Distribute"]

    style A fill:#9C27B0,color:#fff,stroke:none,rx:8
    style B fill:#FF5722,color:#fff,stroke:none,rx:8
    style C fill:#FF9800,color:#fff,stroke:none,rx:8
    style D fill:#4CAF50,color:#fff,stroke:none,rx:8
```

#### `setup_aptos_hd` — Create Master Wallet

Run once. Creates your master wallet and shows a secret phrase (12 words). Save it — it controls all your addresses.

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | Config: `activation_key` | Used as encryption password |
| **Output** | File: `aptos_master_seed.enc` | Encrypted secret phrase |
| **Output** | File: `aptos_hd_wallet_data.csv` | All addresses and private keys |

> ⚠️ **Save your secret phrase!** Shown once. Lost phrase = lost access to all addresses and funds.

#### `whitelist_aptos_hd` — Automatic Whitelisting

Run on all your profiles. For each account, AutoPilot:
1. Creates a unique Aptos address (different for every account)
2. Opens Bybit, adds it to the withdrawal whitelist
3. Confirms email/2FA — fully automatic
4. Saves everything to the table

No manual work. You don't need to create wallets, copy addresses, or fill in the table — AutoPilot does it all.

| Parameter | Column | Description |
|-----------|--------|-------------|
| Auto-created | `[WHITELIST] whitelist_address` | Unique Aptos address |
| Auto-set | `[WHITELIST] whitelist_network` | `APTOS` |
| **Updates** | `[RESULT] status` | `[WHITELIST_HD] SUCCESS` |

> 🔁 **Safe to re-run:** already has an address? AutoPilot will reuse it — no duplicates.

#### Collecting Funds: Distribute Tab

After withdrawal, your USDT is spread across individual addresses. Open the **Distribute** tab in the desktop app:
- Select profiles → Preview → One click → All funds collected to your master wallet
- Gas: ~0.002 APT per profile (fractions of a cent)
- Works both ways: collect from accounts or distribute to them

**Why Aptos?**

| Network | Bybit Fee | Speed |
|---------|-----------|-------|
| **Aptos** | **$0** | ~1 sec |
| Arbitrum | $0.1 | ~1 sec |
| TRC20 | $1 | ~3 min |
| ERC20 | $1-5 | ~5 min |

> 💰 **The more accounts you have — the more you save. Every withdrawal on TRC20/ERC20 costs $1-5. On Aptos = $0.**

> 🕵️ **Privacy:** each account → unique address → no shared addresses → accounts can't be linked to each other.

---

### `sell` — Sell All Assets

Convert all coins on the account to USDT with market orders

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[BALANCE] account_balance` | Balance after selling |
| **Updates** | `[RESULT] status` | `[SELL] SUCCESS` |

---

### `api` — Get API Keys

Create an API key with permissions for SPOT and Futures trading

| Parameter | Column | Description |
|-----------|--------|-------------|
| Optional | `[API] api_whitelist_ip` | IP for whitelist (optional) |
| **Updates** | `[API] api_key` | Obtained API key |
| **Updates** | `[API] api_secret` | API secret key |
| **Updates** | `[RESULT] status` | `[API] SUCCESS` |

---

### `trading` — Automated Trading

Trading and volume boosting with market orders, supporting multiple coins

```mermaid
flowchart TD
    START["⚡ Start trading"] --> COIN["Select pair from list"]
    COIN --> BUY["📈 Market buy"]
    BUY --> WAIT1["⏳ Random delay"]
    WAIT1 --> SELL["📉 Market sell"]
    SELL --> CHECK{"All cycles complete?"}
    CHECK -->|No| WAIT2["⏳ Delay between cycles"]
    WAIT2 --> BUY
    CHECK -->|Yes| NEXT{"More coins?"}
    NEXT -->|Yes| COIN
    NEXT -->|No| DONE["✅ Report: volume and fees"]

    style START fill:#FF9800,color:#fff,stroke:none,rx:10
    style BUY fill:#4CAF50,color:#fff,stroke:none,rx:8
    style SELL fill:#f44336,color:#fff,stroke:none,rx:8
    style DONE fill:#607D8B,color:#fff,stroke:none,rx:10
```

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Asset to trade (e.g.: `BTC` or `BTC,ETH,SOL`) |
| **Required** | `[TRADING] trading_amount` | Order size in USDT (e.g.: `10` or `10,20,5`) |
| **Required** | `[TRADING] trading_cycles` | Number of buy-sell cycles (e.g.: `3` or `3,5,2`) |
| **Updates** | `[RESULT] status` | `[TRADING] VOLUME: volume, FEES: fees` |

> **Multi-coins**: specify multiple coins, sizes, and cycles separated by commas — AutoPilot will trade them sequentially.
> Example: `BTC,ETH` + `10,20` + `3,5` = 3 cycles of BTC at 10 USDT, then 5 cycles of ETH at 20 USDT

> **Volume formula**: cycles x order size x 2 (buy + sell)
> Example: 3 cycles at 10 USDT = 3 x 10 x 2 = **60 USDT** volume

---

### `ts` — TokenSplash

Automatic participation in TokenSplash events on Bybit

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TS] code` | TokenSplash event code |
| **Updates** | `[RESULT] status` | `[TS] SUCCESS` |

> If the account balance is > 100 USDT — AutoPilot will automatically complete the deposit task

---

### `puzzle_hunt` — Puzzle Hunt

Automatic completion of Puzzle Hunt tasks on Bybit: registration, social tasks, trading, daily check-ins

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[PUZZLE] event_code` | Puzzle code (comma-separated for multiple) |
| **Updates** | `[RESULT] status` | `DONE`, `5/10` (progress), `ENDED`, or `FAIL` |

> Specify multiple puzzles at once: `code1,code2,code3`. Make the column **text** type to avoid Excel truncating long codes.

> See [FAQ → Puzzle Hunt](/docs/faq/#62--puzzle-hunt-puzzle_hunt) for detailed flow, statuses, and tips.

---

### `link` — Get KYC Verification Link

Extract the SUMSUB verification link for the account

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[LINK] SUCCESS` with the verification URL |

---

### `learn` — Learn Articles & Set Avatar

Complete Bybit learning modules and set a profile avatar automatically

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[LEARN] SUCCESS` |

---

### `profit` — Profit Calculation

Calculate profit per account: total withdrawals - total deposits + current balance

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[PROFIT] profit_value` |

---

### `buy` — Buy Asset

Buy a specific asset with USDT

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Asset to buy (e.g.: `BTC`) |
| **Required** | `[TRADING] trading_amount` | Amount in USDT |
| **Updates** | `[RESULT] status` | `[BUY] SUCCESS` |

---

### `limit_buy` — Limit Buy Order

Place a limit buy order for an asset

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Asset to buy (e.g.: `ETH`) |
| **Required** | `[TRADING] trading_amount` | Amount in USDT |
| **Updates** | `[RESULT] status` | `[LIMIT_BUY] SUCCESS` |

---

### `limit` — Random Limit Trading

Automated limit trading with randomized orders for natural volume generation

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Asset to trade (e.g.: `BTC`) |
| Optional | `[TRADING] trading_amount` | Order size in USDT |
| Optional | `[TRADING] trading_cycles` | Number of cycles |
| **Updates** | `[RESULT] status` | Volume and fees report |

---

### `trading_limit` — Limit Trading Volume

Volume boosting with limit orders instead of market orders

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Asset to trade (e.g.: `BTC` or `BTC,ETH`) |
| **Required** | `[TRADING] trading_amount` | Order size in USDT (e.g.: `10` or `10,20`) |
| Optional | `[TRADING] trading_cycles` | Number of cycles (e.g.: `3` or `3,5`) |
| **Updates** | `[RESULT] status` | `[TRADING] VOLUME: volume, FEES: fees` |

> Same multi-coin syntax as `trading`, but uses limit orders for better execution prices.

---

### `limit_sell` — Limit Sell on Funding

Sell assets on the Funding account for USDT using limit orders

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Asset to sell (e.g.: `ETH`) |
| **Updates** | `[RESULT] status` | `[LIMIT_SELL] SUCCESS` |

---

### `futures` — Futures Trading

Leveraged futures trading with market orders

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Futures coin (e.g.: `BTC`) |
| **Required** | `[TRADING] trading_amount` | Position size with leverage in USDT |
| **Required** | `[TRADING] trading_cycles` | Number of trading cycles |
| **Updates** | `[RESULT] status` | Volume and fees report |

> Configure leverage with `leverage` parameter in config (default: `10`).

---

### `futures_smart` — Smart Futures Trading

Automated futures trading with market analysis, post-only limit orders, and position management. **32% cheaper** than market orders.

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Futures coin (e.g.: `BTC`) |
| **Required** | `[TRADING] trading_amount` | Position size with leverage in USDT |
| **Required** | `[TRADING] trading_cycles` | Number of trading cycles |
| **Updates** | `[RESULT] status` | Volume and fees report |

> `trading_amount` is the position size **including leverage**. Real balance per trade = `trading_amount / leverage`.

> See [FAQ → Smart Futures](/docs/faq/#61--smart-futures-trading-futures_smart) for algorithms, formulas, and config parameters.

---

### `stake` / `earn` — USDT Staking (Flexible Savings)

Send USDT to the Bybit Flexible Savings pool. `stake` and `earn` are aliases — same action.

| Parameter | Column | Description |
|-----------|--------|-------------|
| Optional | `[WITHDRAW] withdraw_amount` | Fixed USDT amount (default: all available) |
| **Updates** | `[RESULT] status` | `[STAKE] SUCCESS - stake 150.25` |

> Automatically transfers USDT from Trading → Funding before staking.

---

### `unstake` / `unearn` — Withdraw from Staking

Withdraw USDT from the Flexible Savings pool back to Funding. `unstake` and `unearn` are aliases.

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[STAKE] SUCCESS - unstake 150.25` |

> See [FAQ → Bybit Earn](/docs/faq/#63--bybit-earn--usdt-staking-earn--unearn) for detailed flow.

---

### `lp` — LaunchPad Event Registration

Automatic registration in the current active LaunchPad event on Bybit. Fully automatic — no columns needed.

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[LP] SUCCESS` |

---

### `claim` — Claim Coupons

Automatically claim available coupons on the account

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[CLAIM] SUCCESS` |

---

### `claim_batch` — Batch Claim Coupons

Claim all available coupons in batch mode

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[CLAIM] SUCCESS` |

---

### `claim_activity` — Claim Activity Rewards

Claim rewards from activity events, bypassing face verification

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[CLAIM_ACTIVITY] SUCCESS` |

---

### `ref_code` — Extract Referral Code

Automatically extract the account's referral code

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[RESULT] status` | `[REF_CODE] code_value` |

---

## Action Summary Table

```mermaid
flowchart TD
    subgraph REG ["🟢 Getting Started"]
        R["register — Registration"]
        L["login — Login"]
    end

    subgraph SEC ["🔐 Security"]
        FA["2fa — 2FA Protection"]
        API["api — API Keys"]
    end

    subgraph WALLET ["💰 Wallets"]
        D["deposit — Deposit Address"]
        W["whitelist — Whitelist"]
        HD["whitelist_aptos_hd — Master Wallet"]
        WD["withdraw — Withdrawal"]
        S["sell — Sell Assets"]
    end

    subgraph TRADE ["📊 Trading"]
        T["trading — Market Trading"]
        TL["trading_limit — Limit Trading"]
        B["buy — Buy Asset"]
        FU["futures_smart — Smart Futures"]
    end

    subgraph EVENTS ["🎯 Events & Rewards"]
        TS["ts — TokenSplash"]
        LP["lp — LaunchPad"]
        PZ["puzzle_hunt — Puzzle Hunt"]
        CL["claim — Claim Rewards"]
    end

    subgraph STAKE ["🏦 Staking"]
        ST["stake — Earn"]
        UST["unstake — Unearn"]
    end

    R --> L
    L --> FA
    FA --> W
    FA --> HD
    FA --> API
    W --> WD
    HD --> WD
    S --> WD
    L --> D
    L --> T
    L --> TL
    L --> B
    L --> FU
    L --> TS
    L --> LP
    L --> PZ
    L --> CL
    L --> ST
    ST --> UST

    style R fill:#4CAF50,color:#fff,stroke:none,rx:8
    style L fill:#2196F3,color:#fff,stroke:none,rx:8
    style FA fill:#9C27B0,color:#fff,stroke:none,rx:8
    style API fill:#673AB7,color:#fff,stroke:none,rx:8
    style D fill:#FF9800,color:#fff,stroke:none,rx:8
    style W fill:#FF5722,color:#fff,stroke:none,rx:8
    style HD fill:#E040FB,color:#fff,stroke:none,rx:8
    style WD fill:#f44336,color:#fff,stroke:none,rx:8
    style S fill:#E91E63,color:#fff,stroke:none,rx:8
    style T fill:#009688,color:#fff,stroke:none,rx:8
    style TL fill:#00897B,color:#fff,stroke:none,rx:8
    style B fill:#43A047,color:#fff,stroke:none,rx:8
    style FU fill:#E65100,color:#fff,stroke:none,rx:8
    style TS fill:#00BCD4,color:#fff,stroke:none,rx:8
    style LP fill:#0097A7,color:#fff,stroke:none,rx:8
    style PZ fill:#795548,color:#fff,stroke:none,rx:8
    style CL fill:#AB47BC,color:#fff,stroke:none,rx:8
    style ST fill:#66BB6A,color:#fff,stroke:none,rx:8
    style UST fill:#81C784,color:#fff,stroke:none,rx:8
```

| Action | Description | Auto-login | Auto-2FA |
|--------|-------------|:----------:|:--------:|
| `register` | Account registration | — | — |
| `login` | Sign into account | — | — |
| `2fa` | Enable 2FA | ✅ | — |
| `link` | Get KYC verification link | ✅ | — |
| `learn` | Learn articles & set avatar | ✅ | — |
| `deposit` | Deposit address | ✅ | — |
| `whitelist` | Add to whitelist | ✅ | ✅ |
| `withdraw` | Withdraw funds | ✅ | ✅ |
| `sell` | Sell all assets | ✅ | — |
| `api` | Create API keys | ✅ | — |
| `trading` | Market trading | ✅ | — |
| `trading_limit` | Limit trading | ✅ | — |
| `buy` | Buy asset | ✅ | — |
| `limit_buy` | Limit buy order | ✅ | — |
| `limit` | Random limit trading | ✅ | — |
| `limit_sell` | Limit sell on Funding | ✅ | — |
| `futures` | Futures trading | ✅ | — |
| `futures_smart` | Smart futures (32% cheaper) | ✅ | — |
| `stake` / `earn` | USDT staking | ✅ | — |
| `unstake` / `unearn` | Withdraw from staking | ✅ | — |
| `ts` | TokenSplash events | ✅ | — |
| `lp` | LaunchPad events | ✅ | — |
| `puzzle_hunt` | Puzzle Hunt | ✅ | — |
| `claim` | Claim coupons | ✅ | — |
| `claim_batch` | Batch claim coupons | ✅ | — |
| `claim_activity` | Claim activity rewards | ✅ | — |
| `profit` | Profit calculation | ✅ | — |
| `ref_code` | Extract referral code | ✅ | — |

---

## Configuration Setup

The `AutoPilot.config` file contains the main settings:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `activation_key` | Activation key | `XXXX-XXXX-XXXX` |
| `speed_mode` | Speed mode | `FAST`, `MEDIUM`, `SLOW` |
| `captcha_key` | Captcha service API key | `abc123...` |
| `captcha_provider` | Captcha provider (⭐ `capsolver`, `capmonster`, `2captcha`, `capguru`) | `capsolver` |
| `parallel_limit` | Parallel account limit | `3` |
| `shuffle_order` | Shuffle account order | `YES` / `NO` |
| `window_size` | Browser window size | `1280x720` |
| `close_tabs` | Close tabs after completion | `YES` / `NO` |
| `close_after` | Close profile after completion | `YES` / `NO` |
| `email_delay_check` | Email check delay (sec) | `5` |
| `language` | Interface language | `EN`, `RU` |
| `full_withdraw` | Full asset sale before withdrawal | `YES` / `NO` |
| `show_credentials` | Show KYC data | `YES` / `NO` |
| `bot_mode` | Telegram bot integration | `YES` / `NO` |

---

## KYC Statuses

During login, AutoPilot checks the verification status:

| Status | Description |
|--------|-------------|
| `UNSUBMITTED` | Verification not submitted |
| `REJECT` | Rejected (reason is specified) |
| `1 [COUNTRY]` | Verified (e.g.: `1 RU`) |

If `show_credentials=YES`, the following are also recorded: first name, last name, document type, document number.

---

## Email Setup (IMAP)

AutoPilot uses the IMAP protocol to retrieve verification codes from email.

**Supported providers:** Yahoo, Rambler, iCloud, Outlook, Gmail, Mail.ru, First Mail, and others

> For Gmail, Outlook, Yahoo, and iCloud, you need to create an **App Password** — a regular password won't work for IMAP. Alternatively, set up email forwarding to a mailbox with direct IMAP access.

---

## Quick Start After Purchase

1. **Download** `AutoPilot.zip` from the pinned message in the [@buykyc_bot](https://t.me/buykyc_bot) chat
2. **Extract** the archive into a new folder
3. **Configure** `AutoPilot.config`:
   - Set the `activation_key` (received upon purchase)
   - Set `captcha_provider` and `captcha_key` — 4 providers supported: ⭐ [CapSolver](https://www.capsolver.com/) (recommended), [CapMonster](https://capmonster.cloud/), [2Captcha](https://2captcha.com/), [CapGuru](https://cap.guru/). See [FAQ → section 4](/docs/en/faq/#4--proxy-and-captcha) for details
4. **Fill in** `AutoPilot_table.xlsx` with account data
5. **Launch** the application

> Management is also available via the [@AutoPilotManager_bot](https://t.me/AutoPilotManager_bot) bot (requires `bot_mode=YES` in the config)

---

## Purchase

Immediately after purchase, you receive a ready-to-use build.

Buy an activation key for Bybit AutoPilot: [https://t.me/buykyc_bot](https://t.me/buykyc_bot)

Along with the key, you get access to the AutoPilot community chat where you can ask questions, discuss, and get tips.

The key lifetime starts counting from the first launch.

---

**Manager:** [@OxViktor](https://t.me/OxViktor)
**Developer:** [@axelenvy](https://t.me/axelenvy)

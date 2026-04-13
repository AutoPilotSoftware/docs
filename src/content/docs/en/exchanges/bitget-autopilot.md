---
title: "Bitget AutoPilot"
description: "AutoPilot Software — Bitget automation: registration, trading, withdrawal"
sidebar:
  order: 3
  label: "Bitget AutoPilot"
---

# AutoPilot Software — Maximum Automation on Bitget

**Supports AdsPower & Dolphin & Vision & Afina**
**Windows / MacOS / Linux**

---

## Forget about manual work: the solution is here

Managing accounts manually takes a lot of time, effort, and is prone to errors. To scale your operations you need to:
- Regularly perform repetitive actions
- Optimize your time

AutoPilot Software solves these problems by turning routine tasks into an automated process. Integration with AdsPower & Dolphin ensures fingerprint protection and secure multi-account management.

---

## Bitget AutoPilot Features

AutoPilot supports a wide range of automated actions:

- **Registration** of Bitget accounts: standard method, via partner link, via referral link
- **Login**: account login, verification and balance check
- **KYC check**: verification level check, status recording for rejected KYC
- **2FA management**: enabling two-factor authentication and entering codes
- **Getting deposit address**
- **Withdrawal** from account
- **Adding addresses to whitelist**
- **Getting API keys** for trading
- **Auto transfer**: moving funds between accounts
- **Auto cache clearing**: clearing Bitget cache when needed
- **Auto trading**: trading and volume generation in a specified pair
- **CandyBomb** event participation: event registration, label checking
- Email verification before launch
- Email forwarding support and confirmation code checking in Spam folder
- Total account profit calculation
- And much more under the hood

---

## 🧩 Captcha Setup

AutoPilot uses captcha-solving providers for registration and login. **4 providers** are supported:

- ⭐ **CapSolver** — [capsolver.com](https://www.capsolver.com/) — **recommended**
- **CapMonster** — [capmonster.cloud](https://capmonster.cloud/)
- **2Captcha** — [2captcha.com](https://2captcha.com/)
- **CapGuru** — [cap.guru](https://cap.guru/) — visual captcha only

Configure in `AutoPilot.config`:

```
captcha_provider=capsolver
captcha_key=CAP-YOUR_KEY_HERE
```

> ⭐ **CapSolver** is recommended — the most stable and fastest on Bitget (token-based GeeTest v4). For detailed provider comparison — see [FAQ → section 4: Proxy and Captcha](/docs/en/faq/#4--proxy-and-captcha).

---

## Full List of Actions (ACTION)

### `REGISTER` — Account Registration

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[EMAIL] mail_provider` | Email service |
| **Required** | `[PROFILE] mail` | Email address |
| **Required** | `[EMAIL] mail_password` | Email password / IMAP password |
| Optional | `[PROFILE] bitget_password` | Account password (AutoPilot generates if empty) |
| Optional | `[REG] referral_code` | Referral code or partner link |
| **Updates** | `[REG] is_registered` | Successful registration |

### `LOGIN` — Account Login

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[REG] is_registered` | 1 (registered) |
| **Required** | `[PROFILE] mail` | Email address |
| **Required** | `[PROFILE] bitget_password` | Account password |
| Optional | `[2FA] totp_secret_code` | 2FA secret code |
| **Updates** | `[KYC] kyc_status` | Verification level and country |
| **Updates** | `[BALANCE] account_balance` | Account balance in USDT |

### `DEPOSIT` — Getting Deposit Address

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[DEPOSIT] deposit_coin` | Deposit currency |
| **Required** | `[DEPOSIT] deposit_chain` | Network (as shown on Bitget, e.g.: `BSC`) |
| **Updates** | `[DEPOSIT] deposit_address` | Deposit address (format: `address:memo`) |

### `2FA` — Enabling 2FA

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Updates** | `[2FA] totp_secret_code` | 2FA secret code |

### `WHITELIST` — Adding to Whitelist

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[WHITELIST] whitelist_address` | Wallet address |
| **Required** | `[WHITELIST] whitelist_chain` | Network (as shown on Bitget, e.g.: `BSC`) |
| Optional | `[WHITELIST] whitelist_memo` | Memo (optional) |
| **Updates** | `[WHITELIST] whitelist_status` | Successfully added |

### `WITHDRAW` — Withdrawal

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[WITHDRAW] withdraw_coin` | Withdrawal currency |
| **Required** | `[WITHDRAW] withdraw_chain` | Network (as shown on Bitget, e.g.: `BSC`) |
| **Required** | `[WITHDRAW] withdraw_address` | Wallet address |
| Optional | `[WITHDRAW] withdraw_memo` | Memo (optional) |
| Optional | `[WITHDRAW] withdraw_amount` | Amount in % (100 = all, 50 = half) |

### `TRADING` — Trading

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[TRADING] trading_coin` | Asset to trade (e.g.: `BTC`) |
| **Required** | `[TRADING] trading_amount` | Order size in USDT |
| **Required** | `[TRADING] trading_cycles` | Number of buy-sell cycles |

### `CB` — CandyBomb

| Parameter | Column | Description |
|-----------|--------|-------------|
| **Required** | `[CB] code` | Event code from the link |

### `SELL` — Sell All Assets

Sells all assets on the SPOT account at market price for USDT.

### `PROFIT` — Profit Calculation

Formula: total withdrawals - total deposits + account balance.

---

## Summary Table

| Action | Description | Auto-login | Auto-2FA |
|--------|-------------|:----------:|:--------:|
| `REGISTER` | Registration | — | — |
| `LOGIN` | Login | — | — |
| `DEPOSIT` | Deposit address | ✅ | — |
| `2FA` | Enable 2FA | ✅ | — |
| `WHITELIST` | Whitelist | ✅ | ✅ |
| `WITHDRAW` | Withdrawal | ✅ | ✅ |
| `TRADING` | Trading | ✅ | — |
| `CB` | CandyBomb | ✅ | — |
| `SELL` | Sell assets | ✅ | — |
| `PROFIT` | Profit calculation | ✅ | — |

---

## Purchase

Right after purchase you receive a ready-to-use build.

Buy an activation key for Bitget AutoPilot: [https://t.me/buykyc_bot](https://t.me/buykyc_bot)

Along with the key you get access to the AutoPilot topic chat. The key lifetime starts from the first launch.

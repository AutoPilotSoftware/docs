---
title: "NVS Upload — FAQ"
description: "Step-by-step guide for uploading accounts to AutoPilot KYC bot after purchasing from NVS Shop"
---

# 📤 NVS Upload — FAQ

You purchased accounts in **NVS Shop** and received a link. Now you need to upload accounts to the bot so that KYC verification can start.

**This page explains every step, every button, and every error you might see.**

---

**Contents:**

1. [🔗 How to Activate Your Link](#1--how-to-activate-your-link)
2. [📋 Main Menu — What the Buttons Do](#2--main-menu--what-the-buttons-do)
3. [📤 Upload Methods — Which One to Choose](#3--upload-methods--which-one-to-choose)
4. [📄 Method 1: AdsPower TXT File](#4--method-1-adspower-txt-file)
5. [📡 Method 2: Manual (Proxies + Cookies)](#5--method-2-manual-proxies--cookies)
   - [5.1 Step 1 — Sending Proxies](#51-step-1--sending-proxies)
   - [5.2 Step 2 — Sending Cookie Files](#52-step-2--sending-cookie-files)
6. [✅ Confirmation and Order Creation](#6--confirmation-and-order-creation)
7. [🚨 Common Errors and How to Fix Them](#7--common-errors-and-how-to-fix-them)
8. [❓ Frequently Asked Questions](#8--frequently-asked-questions)

---

### 1. 🔗 How to Activate Your Link

After paying in NVS Shop, you receive a link like this:

```
https://t.me/AutoPilotKYC_bot?start=nvs_abc123def456
```

**What to do:**
1. Click the link — Telegram opens the bot
2. Press **Start** (or the link opens automatically)
3. You see a message: **"✅ Welcome to AutoPilot KYC!"**

**That's it — your order is activated.**

The bot shows you:
- 🌍 **Country** — the country you selected
- 💱 **Exchange** — Bybit or MEXC
- 📦 **Accounts** — how many accounts you purchased

> ⚠️ **"Invalid or expired link"** — The link is wrong or expired. Go back to NVS Shop and get a new one.
>
> ⚠️ **"This link has expired"** — Too much time has passed. Request a new link in NVS Shop.

---

### 2. 📋 Main Menu — What the Buttons Do

After activation, you see the NVS menu with these buttons:

| Button | What It Does |
|-|-|
| 📤 **Upload Accounts** | Start uploading your accounts (this is the main action) |
| 📊 **My Orders** | Check status of your orders |
| 🔙 **Back** | Return to the previous screen |

**You always want to press "Upload Accounts" to begin.**

---

### 3. 📤 Upload Methods — Which One to Choose

The bot gives you two upload methods:

| Method | When to Use | Difficulty |
|-|-|-|
| 📄 **AdsPower TXT** | You use AdsPower browser and exported a .txt file | Easy |
| 📡 **Manual** | You have proxies + cookie .json files separately | Medium |

```mermaid
flowchart TD
    A[You press Upload Accounts] --> B{Do you use AdsPower?}
    B -->|Yes| C[Choose AdsPower TXT]
    B -->|No| D[Choose Manual]
    C --> E[Send one .txt file]
    D --> F[Step 1: Send proxies as text]
    F --> G[Step 2: Send .json cookie files]
    E --> H[Bot validates accounts]
    G --> H
    H --> I[Press Confirm]
    I --> J[✅ Order created!]
```

---

### 4. 📄 Method 1: AdsPower TXT File

**What is it?** AdsPower is a browser manager. It can export all your accounts into a single .txt file.

**How to export from AdsPower:**

1. Open AdsPower
2. Select the profiles you want to export
3. Click **Export** → choose **TXT format**
4. Save the file to your computer

📖 [Detailed AdsPower export guide](https://teletype.in/@buykyc_bot/ADS_Pilot_export)

**How to send to the bot:**

1. Press **Upload Accounts** in the bot
2. Choose **📄 AdsPower TXT**
3. Send the `.txt` file as a **document** (using the paperclip 📎 icon)

> ⚠️ **IMPORTANT:** Send as a **document**, not as a photo or text message. Use the paperclip icon 📎 in Telegram.

**What happens next:**
- The bot parses the file and finds accounts
- It validates each account (checks proxy, cookies, exchange access)
- You see progress: `✅ Passed: 3 | ❌ Failed: 1`
- If at least one account passes, you can confirm

**File format example:**
```
acc_id=348
id=k1894g0a
group=Share-1224
name=4623 RWANDA
cookie=[{"name":"token","value":"abc123"}]
proxytype=http
proxy=123.45.67.89:8080:user:pass
countrycode=rw
ua=Mozilla/5.0 ...
******************
acc_id=349
...
```

---

### 5. 📡 Method 2: Manual (Proxies + Cookies)

If you don't use AdsPower, you upload proxies and cookies separately. This happens in **two steps**.

---

#### 5.1 Step 1 — Sending Proxies

**What is a proxy?** A proxy is a server address that hides your real location. Your proxy provider gave you text like `123.45.67.89:8080:mylogin:mypassword`.

**What to do:**
1. Press **Upload Accounts** → choose **📡 Manual**
2. The bot asks for proxies
3. **Paste the proxy text** directly into the chat (as a regular text message, not a file!)

**How many proxies?** Exactly as many as accounts you purchased. If you bought 3 accounts — send 3 proxy lines.

**Supported formats (all work):**
```
123.45.67.89:8080:mylogin:mypassword
mylogin:mypassword@123.45.67.89:8080
http://mylogin:mypassword@123.45.67.89:8080
socks5://mylogin:mypassword@123.45.67.89:8080
```

> 💡 **Just copy-paste what your proxy provider gave you.** Any common format works.

**Example for 3 accounts:**
```
185.123.45.1:8080:user1:pass1
185.123.45.2:8080:user2:pass2
185.123.45.3:8080:user3:pass3
```

> ⚠️ **"Could not read your proxies"** — Nothing looked like a proxy. Check for extra spaces, incorrect format, or missing parts.
>
> ⚠️ **"Wrong number of proxies"** — You sent too many or too few. Each account needs exactly one proxy.

**After sending proxies:**
- The bot tests each proxy (connects to it)
- Working proxies are kept ✅
- Failed proxies are shown ❌
- If all proxies fail — you need to get new ones from your provider

---

#### 5.2 Step 2 — Sending Cookie Files

**What are cookies?** Cookies are small files that keep you logged into an account. They are `.json` files your account provider gave you.

**What to do:**
1. After proxies pass, the bot asks for cookie files
2. Send `.json` files as **documents** (using the paperclip 📎 icon)
3. You can send them one at a time or all at once

> ⚠️ **IMPORTANT:** Use the **paperclip 📎 icon** to send files. Do NOT paste cookie content as text — it won't work.

**How many cookie files?** The same number as working proxies. If 3 proxies passed — send 3 cookie files.

**Cookie file format:**

Each file is a `.json` file that looks like this inside:
```json
[
  {"name": "token", "value": "abc123", "domain": ".bybit.com"},
  {"name": "session", "value": "xyz789", "domain": ".bybit.com"}
]
```

You can also send a **single file with all cookies** as a nested array:
```json
[
  [{"name": "token", "value": "abc123"}],
  [{"name": "token", "value": "def456"}]
]
```

> 💡 **You don't need to open or edit cookie files.** Just send them as they are.

---

### 6. ✅ Confirmation and Order Creation

After validation, you see a summary:

```
📋 Validation Complete

✅ Passed: 3
❌ Failed: 1

🌍 Country: KE
💱 Exchange: BYBIT

❓ Create order with 3 account(s)?
```

- Press **✅ Confirm** to create the order
- Press **❌ Cancel** to go back without creating

**After confirming:**
- 📦 Order is created
- 👥 Sellers are notified and will start working on your KYC
- ⏳ You can check status with **My Orders**

---

### 7. 🚨 Common Errors and How to Fix Them

#### ❌ "This file is not valid JSON"

**What happened:** The file you sent is not a proper `.json` cookie file.

**Common causes:**
| Problem | What You Did | Fix |
|-|-|-|
| Wrong file | Sent a screenshot, PDF, or text file | Send the `.json` file from your provider |
| Pasted text | Pasted cookie text or JWT token as a message | Use 📎 to send the file as document |
| Empty file | File has no content | Get a fresh cookie file from provider |
| BOM encoding | File has invisible characters at start | Re-save the file as UTF-8 without BOM |

---

#### ❌ "Could not read your proxies"

**What happened:** The text you sent doesn't look like proxy addresses.

**Fix:**
- Make sure each line has: `IP:PORT:USERNAME:PASSWORD`
- Don't add extra text or descriptions
- Just paste the proxy lines, nothing else

---

#### ❌ "All proxies failed the check"

**What happened:** The bot tried to connect through each proxy and all failed.

**Common causes:**
- Proxies expired — ask your provider for new ones
- Wrong credentials (login/password) — double-check with provider
- Proxy server is down — try again later or contact provider

---

#### ❌ "All accounts failed validation"

**What happened:** Accounts were assembled (proxy + cookies) but none passed the exchange check.

**The bot shows specific reasons, for example:**
- `No KYC provider` — The exchange account was not set up properly
- `Session expired` — Cookies are old, account is logged out
- `Proxy blocked` — The exchange blocks this proxy IP
- `Country mismatch` — Proxy country doesn't match the ordered country

**Fix:** Get fresh cookies and working proxies from your provider. The accounts must be logged in and accessible through the proxy.

---

#### ❌ "Wrong number of proxies"

**What happened:** You sent more or fewer proxy lines than accounts purchased.

**Fix:** Count your proxy lines. If you bought 5 accounts, send exactly 5 proxy lines.

---

#### ❌ "Too many cookie files"

**What happened:** You sent more cookie files than there are proxies.

**Fix:** Each proxy needs exactly one cookie file. If you have 3 proxies, send 3 cookie files.

---

#### ❌ "Invalid or expired link"

**What happened:** The activation link doesn't work.

**Fix:** Go back to NVS Shop and request a new link. Links expire after a certain time.

---

### 8. ❓ Frequently Asked Questions

#### What files do I need?

| Method | What You Need |
|-|-|
| AdsPower TXT | One `.txt` file exported from AdsPower |
| Manual | Proxy text (one per line) + `.json` cookie files (one per account) |

#### Where do I get proxies?

From your proxy provider (the company/person that sells you proxy access). They give you text like `IP:PORT:USER:PASS`.

#### Where do I get cookie files?

From your account provider (the company/person that provides exchange accounts). They give you `.json` files.

#### Can I send cookies as text?

**No.** You must send `.json` files as documents using the 📎 paperclip icon. Pasting cookie text will not work.

#### What if some accounts fail validation?

You can still create an order with the accounts that passed. Only failed accounts are excluded.

#### Can I upload more accounts later?

Yes! If your order allows more accounts, press **Upload Accounts** again to add more.

#### What does "No KYC provider" mean?

The exchange account doesn't have a KYC verification session. This usually means:
- The account wasn't set up for KYC
- The cookies are from a different account
- Contact your account provider

#### How long until KYC is done?

After your order is created, sellers receive it and start working. Typical time: **a few hours to 1-2 days**, depending on seller availability and country.

#### Something went wrong — who do I contact?

Contact support through NVS Shop or the bot admin. Describe your problem and include screenshots of any error messages.

---

> 💡 **Summary:** Activate link → Upload Accounts → Choose method → Send files → Confirm → Done! Sellers will handle the rest.

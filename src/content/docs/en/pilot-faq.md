---
title: "NVS Pilot Guide"
description: "Comprehensive guide for NVS pilots — upload methods, validation, order lifecycle, MiniApp dashboard"
---

# NVS Pilot Guide — AutoPilot KYC Bot

Comprehensive guide for NVS (New Verification System) users of the `@AutoPilotKYC_bot` and the Admin MiniApp dashboard.

---

## Table of Contents

1. [What is NVS?](#what-is-nvs)
2. [Getting Started](#getting-started)
3. [NVS Complete Flow](#nvs-complete-flow)
4. [Upload Methods](#upload-methods)
5. [Account Validation Pipeline](#account-validation-pipeline)
6. [Order Lifecycle](#order-lifecycle)
7. [NVS Menu Reference](#nvs-menu-reference)
8. [Admin MiniApp Dashboard](#admin-miniapp-dashboard)
9. [Task Status Tracking](#task-status-tracking)
10. [Error Troubleshooting](#error-troubleshooting)
11. [Security & Privacy](#security--privacy)
12. [FAQ](#faq)

---

## What is NVS?

NVS (New Verification System) is a streamlined KYC order flow for pilots who purchase verification slots through the **NVS Shop**. Instead of managing orders directly in the bot, NVS users receive a one-time deeplink that activates a pre-configured order with country, exchange, and quantity already set.

**Key differences from regular pilot orders:**

| Feature | Regular Pilot | NVS Pilot |
|-|-|-|
| Order creation | In-bot menu | Via NVS Shop deeplink |
| Pricing | Standard platform pricing | NVS Shop pricing |
| License required | Yes | No (deeplink-based) |
| Menu options | Full pilot dashboard | 5-button focused menu |
| MiniApp access | Full tabs | Orders, Tasks, History, Analytics |
| Account upload | Same methods | Same methods |
| Seller assignment | FCFS global pool | FCFS global pool |

---

## Getting Started

### Step 1: Get Your Deeplink

Purchase a verification order from the NVS Shop. You'll receive a link:

```
https://t.me/AutoPilotKYC_bot?start=nvs_abc123def456
```

### Step 2: Activate in Telegram

Click the link — it opens the bot. New users select a language (English / Russian / Ukrainian). The bot displays your order details:

```
✅ Order Activated
🌍 Country: BR (Brazil)
💱 Exchange: Bybit
📦 Accounts: 4
```

### Step 3: Upload Accounts

Choose a method (AdsPower TXT or Manual), upload your data, confirm — sellers begin working.

### How It Works

```mermaid
flowchart TD
    subgraph Shop["🛒 NVS Shop"]
        NS["Purchase verification order"] --> DL["Receive deeplink"]
    end

    subgraph Bot["🤖 AutoPilot KYC Bot"]
        DL --> ACT["Activate order in Telegram"]
        ACT --> UPLOAD["Upload accounts"]
        UPLOAD --> VAL["Automatic validation"]
        VAL --> ORD["Order confirmed"]
    end

    subgraph Work["👥 Verification"]
        ORD --> SEL["Sellers complete KYC"]
        SEL --> DONE["✅ Accounts verified"]
    end

    DONE --> TRACK["📊 Track progress in bot or MiniApp"]
```

---

## NVS Complete Flow

```mermaid
flowchart TD
    A["🔗 NVS Shop generates deeplink"] --> B["📱 Pilot clicks link"]
    B --> C{"New user?"}
    C -->|Yes| D["🌐 Language selection"]
    C -->|No| E["✅ Order activated"]
    D --> E

    E --> F["📋 NVS Main Menu"]
    F --> G["📤 Upload Accounts"]
    G --> L{"Method?"}

    L -->|AdsPower| M["📄 Send .txt export"]
    L -->|Manual| N["✏️ Paste proxies"]
    N --> O["📎 Send .json cookies"]

    M --> P["🔍 Validation"]
    O --> P

    P --> Q["📊 Results: ✅ Passed N | ❌ Failed M"]
    Q --> R{"Confirm?"}
    R -->|Yes| S["📦 Order created — sellers notified"]
    R -->|No| F
    S --> T["⏳ Sellers work tasks"]
    T --> U["✅ VERIFIED"]
```

---

## Upload Methods

### Method 1: AdsPower TXT (Recommended)

Best if you use AdsPower anti-detect browser.

**Export steps:**
1. Open AdsPower → select profiles
2. Export → choose **TXT** format
3. Enable **User Agent** in export settings
4. Save the `.txt` file

**Send to bot:**
- Bot menu → **Upload Accounts** → **AdsPower TXT**
- Send the `.txt` file as a **document** (via 📎)

**File format (account blocks separated by `******************`):**
```
acc_id=348
id=k1a2ge6p
group=Share-1224
name=4623 RWANDA
cookie=[{"name":"token","value":"abc123","domain":".bybit.com"}]
proxytype=http
proxy=123.45.67.89:8080:user:pass
countrycode=rw
ua=Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
******************
acc_id=349
...
```

### Method 2: Manual (Proxy + Cookies)

Use when you have separate proxy lists and cookie files.

**Step 1 — Send proxies as text** (one per line, count must match accounts):

```
185.123.45.1:8080:user1:pass1
185.123.45.2:8080:user2:pass2
185.123.45.3:8080:user3:pass3
```

**Supported proxy formats:**
| Format | Example |
|-|-|
| `IP:PORT:LOGIN:PASS` | `185.1.2.3:8080:user:pass` |
| `LOGIN:PASS@IP:PORT` | `user:pass@185.1.2.3:8080` |
| `http://LOGIN:PASS@IP:PORT` | `http://user:pass@185.1.2.3:8080` |
| `socks5://LOGIN:PASS@IP:PORT` | `socks5://user:pass@185.1.2.3:8080` |

**Step 2 — Send cookie files** via 📎 paperclip (one `.json` per account):

```json
[
  {"name": "token", "value": "abc123", "domain": ".bybit.com"},
  {"name": "session", "value": "xyz789", "domain": ".bybit.com"}
]
```

**Alternative:** Single file with nested array for all accounts:
```json
[
  [{"name":"token","value":"abc1","domain":".bybit.com"}],
  [{"name":"token","value":"abc2","domain":".bybit.com"}]
]
```

> **Important:** Always send cookies as document files via 📎 — never paste cookie content as text.

### Method Comparison

| Feature | AdsPower TXT | Manual |
|-|-|-|
| Difficulty | Easy | Medium |
| Files needed | 1 `.txt` | Proxies (text) + N `.json` files |
| Proxy included | Yes (in file) | Separate step |
| User agent | Yes (if enabled) | Not included |
| Best for | AdsPower users | Separate proxy/cookie sources |

---

## Account Validation Pipeline

Every uploaded account goes through a 3-stage validation before order creation.

```mermaid
flowchart TD
    A["📎 Account uploaded"] --> B["Step 1: Proxy check"]

    B -->|"✅ Connected"| C["Step 2: Exchange access"]
    B -->|"❌ Failed"| X1["❌ Proxy not working"]

    C -->|"✅ Accessible"| D["Step 3: Account status"]
    C -->|"❌ Blocked"| X2["❌ Proxy blocked by exchange"]

    D -->|"Session active"| E{"KYC status?"}
    D -->|"Session invalid"| X3["❌ Cookies expired"]

    E -->|"Not started"| F["✅ Ready for order"]
    E -->|"In progress"| G["⚠️ Already submitted"]
    E -->|"Completed"| H["⚠️ KYC already done"]
    E -->|"No provider"| X4["❌ Account not configured"]
```

**After validation, the bot shows:**

```
📋 Verification Complete
✅ Passed: 3
❌ Failed: 1
🌍 Country: BR
💱 Exchange: BYBIT

❓ Create order for 3 account(s)?
[✅ Confirm]  [❌ Cancel]
```

Only passed accounts are included in the order. Failed accounts are excluded with specific error reasons.

---

## Order Lifecycle

```mermaid
stateDiagram-v2
    [*] --> PENDING: NVS Shop creates order
    PENDING --> ACTIVATED: Pilot clicks deeplink
    ACTIVATED --> UPLOADING: Upload starts
    UPLOADING --> PROCESSING: Confirmed
    PROCESSING --> COMPLETED: All tasks terminal
    ACTIVATED --> EXPIRED: 48h no upload
```

**Status definitions:**

| Status | Meaning |
|-|-|
| PENDING | Token generated, waiting for pilot activation |
| ACTIVATED | Pilot opened deeplink, ready to upload |
| UPLOADING | Upload in progress |
| PROCESSING | Sellers working on tasks (auto-verification in progress) |
| COMPLETED | All tasks reached terminal status |
| EXPIRED | 48h passed without upload |

**Timeline:** From upload to completion takes **several minutes to 1 day**, depending on country and seller availability.

---

## NVS Menu Reference

After activation, the bot presents 5 action buttons:

| Button | Function | When to Use |
|-|-|-|
| 📤 **Upload Accounts** | Start AdsPower or Manual upload flow | First action after activation |
| 🔄 **Order reKYC** | Face re-verification requested by the exchange | When exchange requests re-verification |
| 📋 **My Tasks** | View all tasks and their statuses | Track progress after order creation |
| 💳 **Deposit** | BSC USDT deposit address | Fund account for paid uploads |
| 🚀 **Get Full Access** | Upgrade to full pilot license | Access all bot features |

### Task Status Icons

| Status | Icon | Meaning |
|-|-|-|
| Available | ⏳ | Waiting for seller to claim |
| Taken | 📋 | Seller assigned, not started |
| In Progress | 🔄 | Seller working on KYC |
| Completed | ✅ | KYC submitted, awaiting verification |
| Verified | ✅ | KYC confirmed by exchange |
| Rejected | ❌ | KYC rejected by exchange |
| Country Mismatch | ❌ | KYC country doesn't match order |
| Deadline Cancelled | ⏰ | Seller didn't complete in time |

---

## MiniApp Dashboard

MiniApp at `app.pilot.monster` — a visual dashboard right inside Telegram.

### MiniApp Tabs

| Tab | Pilot | NVS User |
|-|-|-|
| 📦 Orders | Your orders | Your NVS orders |
| 📋 Tasks | Tasks from your orders | Your tasks |
| 📜 History | Your history | Your history |
| 📊 Analytics | Your analytics | Your analytics |
| 👥 Sellers | Workers + anonymized global | — |
| 🌍 Globe | Country map | — |
| ➕ New Order | Create order | NVS order flow |
| 💬 Chat | Chat with seller (anonymous) | — |

### Orders Tab

- **Search** by order number, country
- **Filter** by status (active / completed)
- **Order cards** show: country flag, product, quantity, completion progress
- **Tap order** → detail view: task funnel (Available → Taken → In Progress → Verified), seller assignments, health warnings

### Tasks Tab

- **Filters**: product type, status, seller
- **Task cards**: task number, seller, country, status, date
- **Sort**: by created date, status, or seller
- **Detail view**: account validation stages, seller history, face verification data

### Analytics Tab

- **Overview cards**: Total verified, current balance, avg price/task, trend sparkline
- **Period filters**: 7 days, 30 days, All time
- **Order type filters**: All, Global (FCFS), Workers (assigned)
- **Charts**:
  - Daily verified trend (line chart)
  - Balance trend (sparkline)
  - Product breakdown (donut chart)
  - Country distribution (horizontal bar chart)

### Sellers Tab (Pilot View)

- **Workers section**: Your registered sellers with full `@username`, task counts, success rates
- **Global section**: Anonymous sellers from FCFS orders shown as `Seller #UID` — no identity disclosed
- **Tier badges**: Gold / Silver / Bronze based on performance

### Globe Tab

Interactive D3 globe visualization:
- Touch/drag rotation
- Country highlighting by task/order volume
- Continent grouping
- Country rankings with real-time sparklines

### Chat Tab

Task-linked messaging between pilots and sellers:
- **Mutual anonymity**: Pilot sees `Seller #UID`, seller sees `Customer #ID`
- **AI moderation**: Contact information automatically censored
- **Task context**: Messages tagged with task details (ID, AdsPower, country, product)
- Unread badge counter (polls every 5 seconds)

---

## Task Status Tracking

### Task State Machine

```mermaid
flowchart LR
    A["⏳ Waiting"] --> B["📋 Assigned"]
    B --> C["🔄 In Progress"]
    C --> D["✅ Verified"]
    C --> E["❌ Rejected"]
```

### Checking Status

**In bot:** Press **📋 My Tasks** to see all task statuses.

**In MiniApp:** Open the **Tasks** tab for a visual dashboard with filters and sorting.

**Auto-updates:** Task statuses update automatically. The NVS Shop displays current progress in real time.

---

## Error Troubleshooting

Use the table below to quickly resolve issues.

### Error Quick Reference

| Error | Cause | Fix |
|-|-|-|
| File is not valid JSON | Wrong file type or pasted as text | Save to `.json` file, send via 📎 |
| Could not recognize proxy | Wrong format or extra text | One proxy per line: `IP:PORT:LOGIN:PASS` |
| All proxies failed | Expired, wrong credentials, server down | Request fresh proxies from provider |
| No KYC provider | Account not configured for verification | Contact account provider |
| Session expired | Old cookies, logged out | Re-export cookies while logged in |
| Proxy blocked | Exchange blocks the IP | Use proxy from different region |
| Country mismatch | Proxy country ≠ order country | Use proxy matching your order country |
| Incorrect proxy quantity | Line count ≠ account count | Send exactly N proxies for N accounts |
| Too many cookie files | More cookies than proxies | One `.json` per working proxy |
| Invalid/expired link | Token expired (48h) or already used | Get new deeplink from NVS Shop |

### ReKYC Flow

Sometimes an exchange requests face re-verification for an already verified account. In this case, use **🔄 Order reKYC**:

1. Select the order where the exchange requested re-verification
2. The bot creates a new reKYC task with current data
3. The same seller who completed the initial KYC performs the face re-verification
4. Results are updated automatically

> ReKYC is assigned to the same seller who completed the initial verification — this is required since the exchange expects the same face.

---

## Security & Privacy

### What Sellers Can Access

Sellers receive **only a unique one-time SumSub verification link**. They **cannot**:

- Log in to your exchange account
- View balance, trade history, or positions
- Execute trades or withdrawals
- Change account settings or passwords
- Access your cookies or proxy credentials

### Data Handling

| Data | Storage | Access |
|-|-|-|
| Cookies | Encrypted in bot system | Bot only — never shared with sellers |
| Proxies | Bot system | Bot only — used for validation and link generation |
| Account email | Bot system | Hidden from sellers — they see task # only |
| KYC name | Extracted during validation | Shown to seller for face verification tasks only |
| Verification link | One-time URL | Seller gets unique link, expires after use |

### Tips

- **Use the same IP/proxy** that the account was created with to avoid suspicion
- **Cookies expire** — export fresh cookies shortly before uploading
- **Don't share deeplinks** — each link is tied to your Telegram account

---

## FAQ

**Q: Which files do I need?**
- AdsPower TXT: One `.txt` file (contains everything)
- Manual: Proxies (text in chat) + `.json` cookie files (one per account)

**Q: Where do I get proxies?**
From any proxy provider. Format: `IP:PORT:LOGIN:PASSWORD`. The proxy country should match your order country.

**Q: Where do I get cookie files?**
Export via the **Cookie Editor** browser extension (Chrome/Firefox/Edge) or your anti-detect browser's export feature.

**Q: Can I send cookies as text in chat?**
No. Always save cookies to a `.json` file and send as a document via the 📎 paperclip button.

**Q: What if some accounts fail validation?**
The bot creates an order with only the passed accounts. Failed ones are excluded with specific error reasons.

**Q: Can I upload more accounts later?**
Yes — press **📤 Upload Accounts** again to add more accounts to your order.

**Q: How long does KYC take?**
From several minutes to 1 day, depending on country and seller availability.

**Q: What does "No KYC provider" mean?**
The account isn't configured for KYC verification, or the cookies are from a different account. Contact your account provider.

**Q: How do I check task progress?**
- **In bot**: Press **📋 My Tasks**
- **In MiniApp**: Open `app.pilot.monster` → Tasks tab

**Q: How do I access the MiniApp?**
Open `app.pilot.monster` in Telegram's built-in browser. It authenticates automatically via your Telegram session.

**Q: Who do I contact for issues?**
Contact support via the NVS Shop or bot admin. Include screenshots of any errors.

---

## Quick Reference

```
Activate link → Upload accounts → Choose method → Send files → Confirm → Done!
```

### Upload Checklist

- [ ] Deeplink activated (order shows in bot)
- [ ] Proxy country matches order country
- [ ] Cookies freshly exported (not expired)
- [ ] Files sent as documents via 📎 (not pasted as text)
- [ ] Proxy count = account count
- [ ] Validation passed for at least 1 account
- [ ] Order confirmed

### Upload Flow

```mermaid
flowchart LR
    A["🔗 Open link"] --> B["📤 Choose method"]
    B --> C["📎 Send files"]
    C --> D["🔍 Validation"]
    D --> E["✅ Confirm order"]
```

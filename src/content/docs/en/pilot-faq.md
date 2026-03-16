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
| Pricing | 35% platform markup | 95% NVS markup |
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

### Architecture Overview

```mermaid
flowchart TD
    subgraph External["🌐 NVS Shop"]
        NS[NVS Shop Website] -->|"POST /api/nvs/create-order"| API[AutoPilot API]
        API -->|"Returns deeplink"| NS
        NS -->|"Polls status"| POLL["GET /api/nvs/order/TOKEN/status"]
    end

    subgraph Bot["🤖 AutoPilot KYC Bot"]
        DL["Pilot clicks deeplink"] --> USR["User created / activated"]
        USR --> MENU["NVS Menu"]
        MENU --> UPLOAD["Upload accounts"]
        UPLOAD --> VAL["Validate proxy + cookies + exchange"]
        VAL --> ORD["Order + tasks created"]
    end

    subgraph Sellers["👥 Seller Bot"]
        ORD -->|"FCFS broadcast"| SEL["Sellers take tasks"]
        SEL --> WORK["Complete KYC via SumSub"]
        WORK --> MON["KYC Monitor auto-verifies"]
    end

    MON -->|"Status updates"| POLL
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
    A["📎 Account received"] --> B["Stage 1: Proxy Check\nip-api.com connectivity"]

    B -->|"✅ IP responds"| C["Stage 2: Exchange Endpoint\nBybit/MEXC API test"]
    B -->|"❌ Timeout"| X1["❌ Proxy failed"]

    C -->|"✅ 200 OK"| D["Stage 3: KYC Status\nExchange API with cookies"]
    C -->|"❌ 403"| X2["❌ Proxy blocked by exchange"]

    D -->|"Session valid"| E{"KYC Status?"}
    D -->|"Auth failed"| X3["❌ Session expired"]

    E -->|"Not started"| F["✅ Ready — queued for order"]
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
| PROCESSING | Sellers working on tasks (KYC Monitor auto-verifies) |
| COMPLETED | All tasks reached terminal status |
| EXPIRED | 48h passed without upload |

**Timeline:** From upload to completion takes **several minutes to 1 day**, depending on country and seller availability.

---

## NVS Menu Reference

After activation, the bot presents 5 action buttons:

| Button | Function | When to Use |
|-|-|-|
| 📤 **Upload Accounts** | Start AdsPower or Manual upload flow | First action after activation |
| 🔄 **Order reKYC** | Resubmit failed accounts with fresh proxy/cookies | When accounts fail validation |
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

## Admin MiniApp Dashboard

The **Admin MiniApp** at `app.pilot.monster` provides a visual dashboard accessible directly from Telegram.

### Tech Stack

Built with **Svelte 5** + TypeScript + Vite 6 + TailwindCSS v4, with D3 globe visualization. Authenticates via Telegram `init_data` → JWT token.

### Navigation

```mermaid
flowchart LR
    subgraph Tabs["📱 Bottom Tab Navigation"]
        direction TB
        T1["📦 Orders"]
        T2["📋 Tasks"]
        T3["📜 History"]
        T4["📊 Analytics"]
        T5["👥 Sellers"]
        T6["🌍 Globe"]
        T7["➕ New Order"]
        T8["💬 Chat"]
    end
```

### Tab Access by Role

| Tab | Admin | Pilot | NVS User |
|-|-|-|-|
| Orders | All orders | Own orders | Own NVS orders |
| Tasks | All tasks | Tasks from own orders | Own tasks |
| History | Platform-wide | Own history | Own history |
| Analytics | Platform-wide | Own analytics | Own analytics |
| Sellers | All (full identity) | Workers + anonymized global | Hidden |
| Globe | Full access | Full access | Hidden |
| New Order | Full access | Full access | NVS order flow |
| Chat | Admin→any seller | Task-linked, mutual anonymity | Hidden |
| NVS | Full management | Hidden | Hidden |
| AI | Anomaly detection | Hidden | Hidden |

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
stateDiagram-v2
    [*] --> AVAILABLE: Order created
    AVAILABLE --> TAKEN: Seller claims (FCFS)
    TAKEN --> IN_PROGRESS: Seller starts KYC
    IN_PROGRESS --> COMPLETED: Seller uploads proof
    COMPLETED --> VERIFIED: KYC Monitor confirms

    AVAILABLE --> DEADLINE_CANCELLED: No seller claimed in time
    TAKEN --> DEADLINE_CANCELLED: Seller didn't start in time
    IN_PROGRESS --> REJECTED: Exchange rejects KYC
    IN_PROGRESS --> COUNTRY_MISMATCH: KYC country ≠ order country
    IN_PROGRESS --> ACCOUNT_REJECTED: Account-level rejection
```

### Checking Status

**In bot:** Press **📋 My Tasks** to see all task statuses.

**In MiniApp:** Open the **Tasks** tab for a visual dashboard with filters and sorting.

**NVS Shop polling:** The NVS Shop automatically polls the API for updates and can trigger refund webhooks for failed tasks.

---

## Error Troubleshooting

```mermaid
flowchart TD
    ERR["🔴 Error"] --> T{"Error type?"}

    T -->|"File is not valid JSON"| J1["Sent as text?"]
    J1 -->|Yes| J1F["✅ Save to .json, send via 📎"]
    J1 -->|No| J2["Empty or BOM encoding?"]
    J2 --> J2F["✅ Re-export cookies, save UTF-8"]

    T -->|"Could not recognize proxy"| P1["✅ Use IP:PORT:LOGIN:PASS\none per line, no extra text"]

    T -->|"All proxies failed"| P2["✅ Get fresh proxies\nfrom provider"]

    T -->|"All accounts failed"| A1{"Reason?"}
    A1 -->|"No KYC provider"| A1F["✅ Account not configured\ncontact provider"]
    A1 -->|"Session expired"| A2F["✅ Re-export fresh cookies"]
    A1 -->|"Proxy blocked"| A3F["✅ Use different proxy IP"]
    A1 -->|"Country mismatch"| A4F["✅ Match proxy country to order"]

    T -->|"Incorrect proxy quantity"| Q1["✅ Count must equal accounts"]
    T -->|"Invalid/expired link"| L1["✅ Get new link from NVS Shop"]
```

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

If accounts fail after order creation, use **🔄 Order reKYC**:

1. Select the failed order
2. Choose resubmit method (Manual only — fresh proxy + cookies)
3. Upload new proxy and cookies for failed accounts
4. Bot re-validates and updates the existing tasks

> ReKYC keeps the same task assignment — the original seller continues working if one was assigned.

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
The bot creates an order with only the passed accounts. Failed ones are excluded. You can use **🔄 Order reKYC** later to retry with fresh data.

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

### FSM State Flow

```mermaid
stateDiagram-v2
    [*] --> language_selection: New user
    [*] --> select_order: Existing user

    language_selection --> select_order
    select_order --> select_method

    select_method --> uploading_file: AdsPower TXT
    select_method --> uploading_proxies: Manual

    uploading_proxies --> uploading_cookies: Proxies OK
    uploading_file --> validating: File parsed
    uploading_cookies --> validating: Cookies received

    validating --> confirming: Results shown
    confirming --> [*]: Confirmed
    confirming --> select_method: Cancelled
```

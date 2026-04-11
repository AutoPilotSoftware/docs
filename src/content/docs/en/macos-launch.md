---
title: "Launching AutoPilot on macOS"
description: "Complete guide for first-run AutoPilot on macOS — Gatekeeper quarantine removal, chmod, warp.dev, troubleshooting"
---

# 🍎 Launching AutoPilot on macOS

Complete instructions for the first run of AutoPilot on a Mac (Apple Silicon / Intel).

> 💡 **Short version** is available in [FAQ → Launching on macOS](/docs/en/faq/#16--launching-on-macos). This page is the full guide with all troubleshooting cases.

---

## Why It's Harder Than on Windows

By default, macOS blocks the execution of unsigned binary files downloaded from the internet:

- The `AutoPilot` file in Finder looks like a "document", not a program
- The system places it in **Gatekeeper quarantine** — double-click doesn't work
- You may see: `cannot be opened because the developer cannot be verified`
- You may see: `killed: 9` when trying to launch

This is fixed with two terminal commands. Once — and subsequent launches are easy.

---

## Recommended Terminal

Best choice: **[warp.dev](https://www.warp.dev/)** — a modern terminal with convenient copy-paste and command suggestions. Installs as a regular app via `.dmg`, suitable even for those opening a terminal on Mac for the first time.

The built-in **Terminal.app** also works (Spotlight `⌘ + Space` → `Terminal`).

---

## Step-by-Step Instructions

```mermaid
flowchart LR
    A["📥 Downloaded<br/>archive"] --> B["📂 Opened<br/>terminal"]
    B --> C["🧹 Removed<br/>quarantine"]
    C --> D["🔓 chmod +x"]
    D --> E["🚀 Launched"]

    style A fill:#2196F3,color:#fff,stroke:none,rx:8
    style C fill:#FF9800,color:#fff,stroke:none,rx:8
    style E fill:#4CAF50,color:#fff,stroke:none,rx:8
```

### Step 1 — Open Terminal

Launch **warp.dev** (or Terminal.app via Spotlight `⌘ + Space`).

### Step 2 — Navigate to AutoPilot Folder

```bash
cd ~/Downloads/AutoPilot
```

> **Tip:** type `cd ` (with a trailing space), then drag the pilot folder from Finder directly into the terminal window — the path will be pasted automatically. Then press Enter.

Verify you're in the right folder:

```bash
ls
```

The output should contain the `AutoPilot` file, along with `BybitAutoPilot.config`, `data/`, and other pilot files.

### Step 3 — Remove Quarantine (Most Important!)

This is the key step. Without it, Mac sees the file as a "document" and won't launch it:

```bash
sudo xattr -r -c ./AutoPilot
```

- Enter your Mac password (characters **will not appear** while typing — this is normal, it's how the system works).
- `xattr -c` clears extended attributes, including `com.apple.quarantine`.
- `-r` applies recursively (in case AutoPilot is inside a folder with other files).

> If `sudo` doesn't work — try without it: `xattr -c ./AutoPilot`

### Step 4 — Make the File Executable

```bash
chmod +x ./AutoPilot
```

### Step 5 — Launch

```bash
./AutoPilot
```

If everything was done correctly — AutoPilot will launch in the terminal window, read `BybitAutoPilot.config`, and start working.

---

## If Something Goes Wrong

### ❌ `zsh: killed` or `Killed: 9` on launch

Quarantine wasn't cleared. Remove it from **the entire folder** recursively:

```bash
sudo xattr -rc .
```

The dot at the end means "current folder with everything inside".

### ❌ `Operation not permitted` on `chmod`

Run with `sudo`:

```bash
sudo chmod +x ./AutoPilot
```

### ❌ `cannot be opened because the developer cannot be verified`

1. Open **System Settings → Privacy & Security**
2. Scroll down to the **Security** section
3. Find the message about AutoPilot → click **"Open Anyway"**
4. Return to terminal and try again: `./AutoPilot`

### ❌ `No such file or directory`

You're in the wrong folder. Check:

```bash
pwd     # shows current path
ls      # shows file list
```

Make sure `ls` shows the `AutoPilot` file.

### ❌ `bad CPU type` or `Exec format error`

You downloaded the wrong architecture. Check your Mac: `⌘ + Space` → **System Information** → **Hardware** section → **Chip**:

| What you have | Build you need |
|---------------|----------------|
| 🟢 Apple M1 / M2 / M3 / M4 | `darwin-arm64` |
| 🔵 Intel Core i5 / i7 / i9 | `darwin-x64` |

Download the correct version from your supplier.

### ❌ Mac shows the file as a "document" in Finder

This is normal — **launch only from the terminal** with `./AutoPilot`. Double-clicking an unsigned binary in Finder fundamentally doesn't work on macOS. The Finder icon won't change even after `chmod +x`.

---

## Quick Cheat Sheet

Copy and run in order (remember to substitute your path):

```bash
cd ~/Downloads/AutoPilot            # ← substitute your folder path
sudo xattr -r -c ./AutoPilot        # remove macOS quarantine
chmod +x ./AutoPilot                # make executable
./AutoPilot                         # launch
```

---

## After First Launch

Steps 3 and 4 are **no longer needed** — for subsequent launches, just:

```bash
cd ~/Downloads/AutoPilot
./AutoPilot
```

Quarantine attributes and execute permissions persist until the file is re-downloaded or moved to another folder.

---

## After Updates

When AutoPilot downloads a new version (see [FAQ → Updates](/docs/en/faq/#12--updates)) and you unpack the archive replacing the old file:

- **Execute permissions are reset** — run `chmod +x ./AutoPilot` again
- **Quarantine is back** (file was re-downloaded) — run `sudo xattr -r -c ./AutoPilot` again

So after each update, repeat steps 3 and 4 from the instructions above.

---

## FAQ

**Q: Do I need to do this every time?**
A: No. Only on the first launch or after an AutoPilot update (when a new binary replaces the old one).

**Q: Is `sudo xattr -r -c` safe?**
A: Yes. The command doesn't modify the file's contents — it only removes the "downloaded from the internet" flag that macOS applies automatically to all downloaded files.

**Q: Can I launch it with a double-click like a regular program?**
A: No. AutoPilot is a console application, not a `.app` bundle. It launches only from the terminal via `./AutoPilot`.

**Q: What if I close the terminal but AutoPilot is still running?**
A: The process will continue running in the background. To see logs, open the `logs/` folder in the pilot directory. To stop it — find the process in **Activity Monitor** or run `killall AutoPilot` in a new terminal.

**Q: Do I need warp.dev, or is the built-in Terminal.app enough?**
A: Terminal.app is fine. warp.dev is more convenient (copy-paste, suggestions, history), but it's not required.

**Q: Mac asks for a password on `sudo` — which one?**
A: Your Mac user account password (the one you use to log in). Characters **won't appear** while typing — this is normal, just type the password and press Enter.

**Q: Gatekeeper still blocks even after `xattr -c`?**
A: Reboot your Mac and try the steps again. If it still doesn't work — use the workaround via System Settings → Privacy & Security → Open Anyway (see above).

---

> 🔙 **Back:** [FAQ → Launching on macOS](/docs/en/faq/#16--launching-on-macos)

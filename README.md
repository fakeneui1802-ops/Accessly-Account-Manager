# Accessly — Desktop App (Windows .exe)

This folder is a complete Electron project. Follow the steps below on your own
Windows machine to produce a real installable `.exe`.

## 1. Install prerequisites
- Install **Node.js LTS** from https://nodejs.org (includes npm).

## 2. Get the project onto your machine
Unzip/copy this whole `acessly-account-manager-master` folder to your computer, then open a
terminal (Command Prompt / PowerShell) inside it.

## 3. Install dependencies
```
npm install
```

## 4. Try it as an app first (optional but recommended)
```
npm start
```
This launches Accessly in a real desktop window using Electron, no browser
involved. Create your master password and try it out.

## 5. Build the installer
```
npm run build
```
This uses `electron-builder` to produce a Windows installer at:
```
dist\Accessly Setup 1.0.0.exe (The Version could be a different one for you!)
```
Run that file — it installs Accessly like any normal Windows app, with a
Start Menu entry and desktop shortcut. No internet connection is required
to use it afterward.

## ALTERNATIVE
You can just use the newest release if you dont want install npm or just want it easy!

## About the icon (optional)
The config references `build/icon.ico`. If that file doesn't exist,
electron-builder will fall back to a default icon — the build still
succeeds. To use your own icon, put a 256x256 (512×512 or 1024×1024) `icon.ico` file in a `build/`
folder next to `main.js`.

## How your data is stored
Accessly encrypts everything client-side with AES-256-GCM (key derived via
PBKDF2, 250,000 rounds, from your master password) before writing to the
app's local storage on disk, inside your Windows user profile
(`%APPDATA%\Accessly`). Nothing is sent over the network — the app makes no
network requests at all. Losing your master password means the vault
cannot be recovered, by design.

Use **Backups → Export vault file** inside the app regularly, and store
that encrypted file somewhere safe (another drive, USB, cloud storage) —
it's your disaster-recovery copy if this machine is lost or reformatted.

## Updating the app style on your own
If you ask me for new features, I'll hand you an updated `renderer/index.html`
(and any other changed files) — drop it into this same folder structure and
re-run `npm run build` to get a new `.exe`.

// Intentionally minimal. The app runs entirely in the renderer using
// Web Crypto + localStorage, so no privileged Node/IPC bridge is needed.
// This keeps nodeIntegration off and contextIsolation on for security.

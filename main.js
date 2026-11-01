const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

// One-time migration: if an old "Vaultic" data folder exists and we haven't
// already copied it into the new "Accessly" folder, copy it over now. This
// runs at most once — after that the check below finds data already in the
// new folder and does nothing. The old Vaultic folder is left untouched here
// (never deleted automatically); once you've confirmed your accounts show up
// correctly, you can delete %APPDATA%\Vaultic yourself.
function migrateOldVaultIfNeeded() {
  try {
    const appDataDir = app.getPath('appData');
    const oldDir = path.join(appDataDir, 'Vaultic');
    const newDir = path.join(appDataDir, 'Accessly');
    const oldLocalStorage = path.join(oldDir, 'Local Storage');
    const newLocalStorage = path.join(newDir, 'Local Storage');
    if (fs.existsSync(oldLocalStorage) && !fs.existsSync(newLocalStorage)) {
      fs.mkdirSync(newDir, { recursive: true });
      fs.cpSync(oldDir, newDir, { recursive: true });
      console.log('Accessly: migrated local vault data from old Vaultic folder.');
    }
  } catch (err) {
    console.error('Accessly: migration from old Vaultic data folder failed:', err);
  }
}
migrateOldVaultIfNeeded();
app.setPath('userData', path.join(app.getPath('appData'), 'Accessly'));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 820,
    minWidth: 760,
    minHeight: 560,
    backgroundColor: '#0b0d12',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  Menu.setApplicationMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // Open external links (none currently used) in the default browser, not inside the app window
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
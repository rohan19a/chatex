// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

let loadingWindow = null; // Initialize loadingWindow variable

const createWindow = () => {
  loadingWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  loadingWindow.loadFile('loading.html');

  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show();
  });

  loadingWindow.on('closed', () => {
    loadingWindow = null; // Set loadingWindow to null
  });

  loadingWindow.webContents.on('did-finish-load', () => {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
      icon: __dirname + 'notez-logo.png',
    });

    
  // Create the menu template
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Download',
          click: () => {
            // Perform the download action here
          },
        },
        {
          label: 'Regenerate',
          click: () => {
            // Perform the regenerate action here
          },
        },
        { type: 'separator' },
        { role: 'quit' }, // Add the Quit option provided by macOS
      ],
    },
  ];

  // Build the menu from the template
  const menu = Menu.buildFromTemplate(template);

  

  // Set the menu as the application menu
  Menu.setApplicationMenu(menu);

    mainWindow.loadFile('index.html');

    loadingWindow.close();
  });
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
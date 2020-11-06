import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, IpcMessageEvent, remote } from 'electron';
import { MyApp } from './server';
import { Server } from 'http';

// electron main
// console.log(process.versions);

const PORT = process.env.PORT || 9001;
let mainWindow: BrowserWindow;
let myApp = new MyApp();
let server: Server;

const ANGULAR_SERVE = 'http://localhost:4200';

const isDev = process.argv.indexOf('dev') > -1 ? true : false;
const isModeServer = process.argv.indexOf('server') > -1 ? true : false;

console.log('is dev : ', isDev)
console.log('is mode electron : ', !isModeServer)
console.log('is mode server : ', isModeServer)

const options: BrowserWindowConstructorOptions = {
  width: 1000,
  height: 800,
  // backgroundColor: '#303030',
  transparent: false, // prod,
  titleBarStyle: 'customButtonsOnHover',
  frame: true, // dev,
  // show: false,
  // icon: __dirname + 'icon.png',
  webPreferences: {
    nodeIntegration: true
  }
}

async function createWindow() {
  if (!isModeServer) {
    mainWindow = new BrowserWindow(options);
  }

  try {
    const r = await myApp.dbConfig();

    console.log(`1 - DateBase connection established : ${r.isConnected}`);

    server = myApp.start().listen(PORT, () => {
      if (!isModeServer) {
        mainWindow.loadURL(isDev ? ANGULAR_SERVE : `http://localhost:${PORT}/`);
      }

      console.log(`2 - Listening at http://localhost:${PORT}/`);

      if (!isModeServer) {
        console.log(`3 - Electron connected to local server successFuly`)
      }
    });
  } catch (error) {
    const e: Error = error;
    console.log(e);
  }

  if (!isModeServer) {
    mainWindow.on('closed', () => {
      mainWindow = null;
      server.close();
      myApp = null;
    });
  }

  activeDevToolsListner();

  if (!isModeServer && isDev) {
    mainWindow.webContents.openDevTools();
  }
  // mainWindow.webContents.once("did-finish-load", async () => { });
}

function send(listningRoute: string, data: any) {
  ipcMain.on(listningRoute, (event, r) => {
    mainWindow.webContents.send('angular', data);
  });
}

function activeDevToolsListner() {
  ipcMain.on('main', (event: any, r) => {
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('page', 'i did click for you');
  });
}

// app.on('ready', createWindow);

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

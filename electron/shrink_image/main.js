const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

process.env.NODE_ENV = 'development';
const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isLinux = process.platform === 'linux' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;
console.log('platform:', process.platform, isLinux);

let mainWindow;
let aboutWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'Image shrink',
    width: 500,
    height: 600,
  });

  mainWindow.loadFile('./app/index.html');
};

const createAboutWindow = () => {
  aboutWindow = new BrowserWindow({
    title: 'Image shrink',
    width: 300,
    height: 300,
    resizable: false,
  });

  aboutWindow.loadFile('./app/about.html');
};

app.on('ready', () => {
  createMainWindow();
  // メニューの追加
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  globalShortcut.register('CmdOrCtrl+R', () => console.log('ctrl+R'));
  globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () =>
    mainWindow.toggleDevTools(),
  );

  mainWindow.on('closed', () => (mainWindow = null));
});

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+W',
        click: () => app.quit(),
      },
    ],
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
];

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows.length === 0) {
    createMainWindow();
  }
});

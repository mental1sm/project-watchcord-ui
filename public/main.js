const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const exec = require('child_process').exec;

let mainWindow;

async function createWindow() {
    var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;
    console.log(path.join(__dirname, '../dist/index.html'));

    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),

        },
        autoHideMenuBar: true
    });


    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    mainWindow.on('closed', () => (mainWindow = null));

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


ipcMain.on('download-image', (event, url, filename) => {
    const filePath = dialog.showSaveDialogSync({
        defaultPath: filename || 'downloaded_image.jpg',
    });

    if (filePath) {
        const file = fs.createWriteStream(filePath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Download completed!');
            });
        }).on('error', (err) => {
            fs.unlink(filePath);
            console.error('Error downloading the file:', err);
        });
    }
});

ipcMain.on('external-link', (event, url) => {
   if (process.platform === 'win32') {
       exec(`start ${url}`)
   }
   if (process.platform === 'darwin') {
       exec(`open ${url}`)
   }
})
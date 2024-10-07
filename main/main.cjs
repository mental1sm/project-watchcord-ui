const { app, BrowserWindow } = require("electron");
const path = require("path");

let serve; // Переменная для динамически импортированного модуля

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs")
        }
    });

    if (app.isPackaged) {
        // Динамический импорт для ES-модуля
        const serveModule = await import("electron-serve");
        serve = serveModule.default;

        const appServe = serve({
            directory: path.join(__dirname, "../out")
        });

        appServe(win).then(() => {
            win.loadURL("app://bot");
            win.webContents.openDevTools();
        });
    } else {
        win.loadURL("http://localhost:3001");
        win.webContents.openDevTools();
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
};

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

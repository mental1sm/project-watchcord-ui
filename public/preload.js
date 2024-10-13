const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    downloadImage: (url, filename) => ipcRenderer.send('download-image', url, filename),
    openExternal: (url) => ipcRenderer.send('external-link', url)
})
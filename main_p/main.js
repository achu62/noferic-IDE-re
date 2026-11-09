//jai sri ram
import { scanafolder } from "./folderrecurse.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from "url";
import path from "path"
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { options } from "./electron-options.js";
import { handlePaths } from "./handlePaths.js";
import { handleWorkspace } from "./folder-handler.js";
ipcMain.setMaxListeners(0);
/**@type {import("electron").BrowserWindow} mainWindow */
let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow(options);
    mainWindow.loadFile(path.join(__dirname, "..", "renderer", "index.html"));
})
ipcMain.handle("open-folder", async (e) => {
    const dirpaths = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if(dirpaths.canceled || dirpaths.length < 0 ){
        return;
    } 

    console.log(dirpaths)
    dirpaths.filePaths.forEach(pathname => {
        handleWorkspace(handlePaths(pathname))
    });
})
export function getCurrentMainWindow(){
    return mainWindow;
}
ipcMain.handle("get-ext" , (e , spath)=>{
    return path.extname(spath)
})
ipcMain.handle("get-name" , (e , spath)=>{
    return path.basename(spath)
})
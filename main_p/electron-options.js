//jai sri ram
import { fileURLToPath } from "url";
import path from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const options = {

    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: false,
        contextIsolation: true,
        allowRunningInsecureContent: true,
        webSecurity: false,
        spellcheck: false,
        devTools: true,
    },

}
import { scanafolder } from "./folderrecurse.js";
import { handlePaths } from "./handlePaths.js";
import path from "path"
import { getCurrentMainWindow } from "./main.js";
//jai sri ram
export async function handleWorkspace(pathr) {
    const WorkspacePath = handlePaths(pathr)
    const json = await scanafolder(WorkspacePath)
    const fulljson = [{
        id: handlePaths(WorkspacePath),
        name: path.basename(WorkspacePath),
        isdirectory: true,
        children: json
    }]
    getCurrentMainWindow().webContents.send("data", JSON.stringify({
        action: "open-dir",
        content: fulljson
    }))
}
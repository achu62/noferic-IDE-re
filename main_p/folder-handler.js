import { scanafolder } from "./folderrecurse.js";
import { handlePaths } from "./handlePaths.js";

//jai sri ram
export async function handleWorkspace(pathr) {
    const WorkspacePath = handlePaths(pathr)
    console.log(await scanafolder(WorkspacePath))
}
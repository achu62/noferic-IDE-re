//jai sri ram 
//jai sri ram
import { handlePaths } from "./handlePaths.js"
import fs from "fs"
import path from "path"
export async function scanafolder(folderpath) {
    let json = [];
    const files = fs.readdirSync(folderpath, { withFileTypes: true });
    for (const file of files) {
        const fullpath = path.join(folderpath, file.name);
        if (file.isDirectory()) {
            if (file.name !== ".git") {
                const children = await scanafolder(fullpath);
                json.push({
                    id: handlePaths(fullpath),
                    name: file.name,
                    isdirectory: true,
                    haschildren: children.length > 0,
                    children: children,
                })
            }
        } else {
            json.push({
                id: handlePaths(fullpath),
                name: file.name,
                isdirectory: false,
            });
        }
    }
    return json;
}
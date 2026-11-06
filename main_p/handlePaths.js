//jai sri ram
import node_path from "node:path"
export function handlePaths(path) {
   
        return process.platform == "win32"? path.replace("\\", '/').replace("\g", "/") : path
    

}
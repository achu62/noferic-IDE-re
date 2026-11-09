//jai sri ram
import { createMenu } from "./UItoolkit/createmenu.js"
import { createButton, createDiv } from "./UItoolkit/UIcore/core.js"
import { contextMenu } from "./UItoolkit/createcontextmenu.js"
import { recurse } from "./createElementsinFileexplorer.js"
import { resizeexplorer } from "./resize-explorer.js"
import {createAceEditor} from "./editor_ace/ace.js"
window.onload = function () {
    const topbar = createMenu(document,
        {
            id: "top-menu",
            horizontal: true,
            top: `${0}px`,
            left: `${0}px`,
            right: `${0}px`,
            style: 'z-index:1;position:absolute'
        }
    )
    const bottommenu = createMenu(document,
        {
            id: "bottom-menu",
            horizontal: true,
            bottom: `${0}px`,
            left: `${0}px`,
            right: `${0}px`,
            style: 'z-index:1;position:absolute'
        }
    )
    const leftmenu = createMenu(document,
        {
            id: "left-menu",
            vertical: true,
            bottom: `${20}px`,
            left: `${0}px`,
            top: `${20}px`,
            style: 'z-index:1;position:absolute'
        }
    )
    const file_menu = createButton(document, {
        parent: topbar,
        id: "file",
        text: " file ",
        position: "relative",
        style: "width:fit-content;\n padding-left:13px;\n padding-right:13px\nz-index:2;",
        bgcolor: "#2B2D30",

    })
    const help_menu = createButton(document, {
        parent: topbar,
        position: "relative",
        id: "help",
        text: " help ",
        bgcolor: "#2B2D30",
        style: "width:fit-content;\n padding-left:13px;\n padding-right:13px\nz-index:2;"
    })
    const workspace = createDiv(document, {
        id: "workspace",
        top: `${20}px`,
        bottom: `${20}px`,
        right: `${0}px`,
        left: `${30}px`,
        style: "width:auto; height:auto; z-index:3; background:transparent; padding:0;"
    })
    const leftspace = createDiv(document, {
        id: "leftspace",
        parent: workspace,
        top: `${0}px`,
        bottom: `${0}px`,
        left: `${0}px`,
        style: 'z-index:4;width:25%'
    })
    const openfolder = createButton(document, {
        notappend: true,
        position: "relative",
        id: "openfolder",
        text: "openfolder",
        bgcolor: "#121314",
        style: "width:200px;\nz-index:5; inset:0;"
    })
    openfolder.addEventListener("click", (e) => {
        window.ipc.invoke("open-folder")
    })
    const exit = createButton(document, {
        notappend: true,
        position: "relative",
        id: "exit",
        text: "exit",
        bgcolor: "#121314",
        style: "width:200px;\nz-index:5; inset:0;"
    })
    exit.addEventListener("click", async (e) => {
        window.close()
    })
    const file_open = contextMenu(document, {
        id: "fileopenmenu",
        borderradius: `${7}px`,
        children: [openfolder, exit]
    })
    const file_open_element = file_open.element;
    let fc = true;
    file_menu.addEventListener("click", (e) => {
        if (fc) {
            file_open.show({
                x: e.clientX + 2,
                y: e.clientY + 2
            })
            fc = false
        }
        else {
            file_open.close()
            fc = true;
        }
    })
    const explorer = createDiv(document, {
        id: "explorer",
        parent: leftspace
    })
    explorer.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:flex;flex-direction:column;border:0;padding:0;"
    const explorerHeading = document.createElement("div");
    explorerHeading.className = "explorer-heading";
    explorerHeading.textContent = "EXPLORER";
    explorer.append(explorerHeading);
    const explorerTree = document.createElement("div");
    explorerTree.className = "explorer-tree";
    explorerTree.innerHTML = '<div class="explorer-empty">Open a folder to view its files.</div>';
    explorer.append(explorerTree);

    window.ipc.onDataframeIPC(async (data) => {
        const message = JSON.parse(data)
        if (message.action == "open-dir") {
            const arr = message.content;
            recurse(arr, explorerTree, 0, document)
        }
    })
    const right_side = createDiv(document, {
        id: "middleeditor",
        parent: workspace,
        position: "absolute",
        top: `${0}px`,
        right: `${0}px`,
        bottom: `${0}px`,

    })
    right_side.style.width = `${75}%`
    resizeexplorer(leftspace)
    createAceEditor(right_side)
}


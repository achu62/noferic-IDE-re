//jai sri ram
import { createMenu } from "./UItoolkit/createmenu.js"
import { createButton, createDiv } from "./UItoolkit/UIcore/core.js"
import { contextMenu } from "./UItoolkit/createcontextmenu.js"
import { recurse } from "./createElementsinFileexplorer.js"
import { resizeexplorer } from "./resize-explorer.js"
import { createAceEditor, CreateModel } from "./editor_ace/ace.js"
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
    const editor_element = createDiv(document, {
        id: "editor",
        parent: right_side,
        position: "absolute",
        left: `${0}px`,
        right: `${0}px`,
        bottom: `${0}px`,
        top: `${30}px`
    })
    const topmenu = createMenu(document, {
        id: "editor_top_bar",
        parent: right_side,
        horizontal: true,
        left: `${0}px`,
        right: `${0}px`,
        top: `${0}px`,
    })
    topmenu.style.height = `${30}px`
    topmenu.style.backgroundColor ="#121314"

    resizeexplorer(leftspace)
    createAceEditor(editor_element)
    CreateModel(`:root {
    color-scheme: dark;
    font-family: "Segoe UI", sans-serif;
    background: #1e1f22;
    color: #e6e6e6;
}

* {
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    background: #1e1f22;
}

button {
    color: inherit;
    font: inherit;
}

#workspace {
    min-width: 0;
    min-height: 0;
}

#leftspace {
    overflow: hidden;
    background: #252526;
    border: 0 !important;
    border-right: 1px solid #3c3c3c !important;
    padding: 0 !important;
}

#explorer {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: #252526;
    color: #cccccc;
}

.explorer-heading {
    flex: 0 0 34px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #bbbbbb;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
}

.explorer-tree {
    min-height: 0;
    flex: 1;
    overflow: auto;
    padding: 2px 0 12px;
    scrollbar-color: #555555 transparent;
    scrollbar-width: thin;
}

.tree-item {
    min-width: 0;
}

.file-entry {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0;
    width: calc(100% - 8px);
    min-width: 0;
    height: 24px;
    margin: 0 4px;
    padding: 0 8px 0 4px;
    overflow: hidden;
    border: 0;
    border-radius: 3px;
    background: transparent !important;
    color: #cccccc;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}

.file-entry:hover {
    background: #2a2d2e !important;
}

.file-entry:focus-visible {
    outline: 1px solid #8a8a8a;
    outline-offset: -1px;
}

.file-entry[aria-selected="true"] {
    background: #37373d !important;
    color: #ffffff;
}

.directory-entry {
    font-weight: 500;
}

.tree-disclosure,
.tree-disclosure-placeholder {
    display: flex;
    flex: 0 0 14px;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.tree-disclosure::before {
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 5px solid #a8a8a8;
    content: "";
    transition: transform 100ms ease;
}

.directory-entry[aria-expanded="true"] .tree-disclosure::before {
    transform: rotate(90deg);
}

.file-icon-space {
    display: flex;
    flex: 0 0 18px;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.file-icon {
    display: block;
    width: 16px;
    height: 16px;
    object-fit: contain;
}

.file-entry-label {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tree-children[hidden] {
    display: none;
}

.explorer-empty {
    padding: 12px 16px;
    color: #858585;
    font-size: 12px;
}
` , "home/index.css")
}


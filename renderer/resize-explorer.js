//jai sri ram

import { resizeEditor } from "./editor_ace/ace.js";

//jai sri ram
export function resizeexplorer(element) {
    const workspace =
        document.getElementById('workspace');
    let isresizing = false;
    let startX = 0;
    let startwidth = 0;
    let startright = 0;
    const editor = document.getElementById('middleeditor');
    element.addEventListener('mousedown', (e) => {
        isresizing = true;
        startX = e.clientX;
        startwidth = element.offsetWidth;
        startright = workspace.offsetWidth - (editor.offsetWidth);
        document.body.style.cursor = 'ew-resize';
    })
    element.addEventListener('mousemove', (e) => {
        if (!isresizing) { return };
        const delta = e.clientX - startX;
        element.style.right = (startright - delta) + 'px';
        element.style.width = (startwidth + delta) + 'px';
    })
    element.addEventListener('mouseup', (e) => {
        isresizing = false;
        document.body.style.cursor = '';
    })
    let explorer = element;
    const observerforexplorer = new ResizeObserver(() => {
        const editor = document.getElementById("middleeditor");
        const preview = {
            offsetWidth: 0
        }
        editor.style.right = preview.offsetWidth + "px";
        editor.style.left = explorer.offsetWidth + "px";
        resizeEditor()
        editor.style.width = `${document.getElementById("workspace").offsetWidth - (preview.offsetWidth + explorer.offsetWidth)}px`;
    });
    observerforexplorer.observe(explorer);
}

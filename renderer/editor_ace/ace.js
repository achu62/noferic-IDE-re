//jai sri ram

import './lib/ace-builds/src-min-noconflict/ace.js';
import './lib/ace-builds/src-min-noconflict/theme-monokai.js';
import './lib/ace-builds/src-min-noconflict/mode-javascript.js';
/**@type {import("ace-builds").Ace.Editor} editor*/

let editor;
export function createAceEditor(element) {
    ace.config.set("basePath", "./lib/ace-builds/src-min-noconflict/");
    ace.config.set("loadWorkerFromBlob", true);
    editor = ace.edit(element);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
}

export function resizeEditor() {
    editor.resize()
}
//jai sri ram
let currentEditor;
let editor_map = {}
import './lib/ace-builds/src-min-noconflict/ace.js';
import './lib/ace-builds/src-min-noconflict/theme-monokai.js';
import './lib/ace-builds/src-min-noconflict/mode-javascript.js';
import './lib/ace-builds/src-min-noconflict/mode-html.js';
import './lib/ace-builds/src-min-noconflict/ext-modelist.js';

/**@type {import("ace-builds").Ace.Editor} editor*/

let editor;
export function createAceEditor(element) {
    ace.config.set("basePath", "./lib/ace-builds/src-min-noconflict/");
    editor = ace.edit(element);
    editor.setTheme("ace/theme/monokai");
    editor.setOption("useWorker", false)
    editor.setShowPrintMargin(false)
}
export function resizeEditor() {
    editor.resize(true)
}
//options:{change_content:boolean , setModel:boolean}
export function setModelContentorModel(text, filepath, options) {
    if (options.setModel) {
        if (editor_map[filepath]) {
            editor.setSession(editor_map[filepath])
        }
        else {
            const model = ace.createEditSession(text, ace.require("ace/ext/modelist").getModeForPath(filepath).mode)
            model.setOption("useWorker", false)
            editor_map[filepath] = model;
            editor.setSession(editor_map[filepath])
        }
    }
    if (options.change_content) {
        const session = editor_map[filepath]
        session.setValue(text);
    }

}

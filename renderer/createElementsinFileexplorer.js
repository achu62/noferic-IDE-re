//jai sri ram
let state = {};
import { createButton } from "./UItoolkit/UIcore/core.js";
/**@param {HTMLElement} file  */
function styleEntry(file, depth) {
    file.style.position = "relative";
    file.style.display = "block";
    file.style.boxSizing = "border-box";
    file.style.width = "100%";
    file.style.margin = "2px 0";
    file.style.padding = `7px 10px 7px ${depth + 12}px`;
    file.style.border = "0";
    file.style.borderRadius = "4px";
    file.style.textAlign = "left";
    file.style.backgroundColor = "transparent";
    file.style.cursor = "pointer";
    file.style.height = `${16}px`
}

/**@param {HTMLDocument} document  */
export function recurse(array, parent, depth, document) {
    array.forEach((element) => {
        if (element.isdirectory) {
            const file = createButton(document, {
                id: element.path,
                text: element.name,
                parent: parent
            });

            styleEntry(file, depth);

            file.addEventListener("click", (e) => {
                if (state[element.path]) {
                    file.replaceChildren(element.name);
                    state[element.path] = false;
                } else {
                    recurse(element.children, file, depth + 7, document);
                    state[element.path] = true;

                }
            });
        } else {
            const file = createButton(document, {
                id: element.path,
                text: element.name,
                parent: parent
            });
            styleEntry(file, depth);
        }
    });
}


//jai sri ram
let state = {};
import { createButton } from "./UItoolkit/UIcore/core.js";
/**@param {HTMLDocument} document  */
export function recurse(array, parent, depth, document) {
    array.forEach((element) => {
        if (element.isdirectory) {
            const file = createButton(document, {
                id: element.path,
                text: element.name,
                parent: parent
            });

            file.style.paddingLeft = `${depth + 7}px`;
            file.style.inset = 0;

            file.addEventListener("click", (e) => {
                if (state[element.path]) {
                    file.replaceChildren(element.name);
                } else {
                    recurse(element.children, file, depth + 7, document);
                }
            });
        } else {
            const file = createButton(document, {
                id: element.path,
                text: element.name,
                parent: parent
            });
            file.style.position = "relative"
            file.style.top = 0;
            file.style.paddingLeft = `${depth + 7}px`;
        }
    });
}


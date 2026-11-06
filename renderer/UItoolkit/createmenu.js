//jai sri ram
import { createDiv, createButton } from "./UIcore/core.js"
/**@param {HTMLDocument} document  */
export function createMenu(document, options) {
    const element = createDiv(document, {
        id: options.id,
        parent: options.parent,
        border: `${2}px`
    })
    element.style.cssText = options.style;
    element.style.display = "flex"
    element.style.backgroundColor = "#2B2D30";

    if (options.top) {
        element.style.top = options.top;

    }
    if (options.bottom) {
        element.style.bottom = options.bottom;
    }
    if (options.left) {
        element.style.left = options.left;
    }
    if (options.right) {
        element.style.right = options.right;
    }
    if (options.horizontal) {
        element.style.height = `${20}px`
        element.style.width = `${100}%`
        element.style.flexDirection = "row";
    }
    if (options.vertical) {
        element.style.height = `${100}%`
        element.style.width = `${30}px`
        element.style.flexDirection = "column";

    }
    if (options.parent) {
        options.parent.appendChild(element);
    }
    return element;
}
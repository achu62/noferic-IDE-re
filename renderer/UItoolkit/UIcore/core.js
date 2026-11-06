//jai sri ram
/**@param {HTMLDocument} document  */
export function createDiv(document, options) {
    const element = document.createElement("div")
    const style = options.style;
    const parent = options.parent;
    const id = options.id;
    if (style) {
        element.style.cssText = style
    }
    element.id = id || undefined
    element.style.border = "0.5px solid #c4bebe"
    element.style.position = options.position || "absolute"
    element.style.backgroundColor = options.bgcolor || "#121314"
    element.style.borderRadius = options.borderradius || `${7}px`
    element.style.paddingLeft = `${7}px`
    element.style.paddingRight = `${7}px`
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
    if (!options.notappend) {
        if (!parent) {
            document.body.appendChild(element)
        }
        else {
            parent.appendChild(element)
        }
    }
    return element;
}
/**@param {HTMLDocument} document  */
export function createButton(document, options) {
    const element = document.createElement("button")
    const style = options.style;
    if (style) {
        element.style.cssText = style
    }
    const parent = options.parent;
    const id = options.id;
    element.style.all = "unset"
    element.style.position = options.position || "absolute"
    element.id = id || undefined
    element.style.border = options.border || `${3}px`
    element.style.backgroundColor = options.bgcolor || "#121314"
    element.innerText = options.text || ""
    element.style.paddingLeft = `${7}px`
    element.style.paddingRight = `${7}px`
    element.style.borderRadius = options.borderradius || `${5}px`
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
    element.addEventListener("mouseenter", () => {
        element.style.backgroundColor = options.hbgcolor || "#45484D";
    });

    element.addEventListener("mouseleave", () => {
        element.style.backgroundColor = options.bgcolor || "#2B2D30";
    });
    if (!options.notappend) {
        if (!parent) {
            document.body.appendChild(element)
        }
        else {
            parent.appendChild(element)
        }
    }

    return element;
}
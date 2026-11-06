//jai sri ram
import { createButton } from "../core.js"

function cssLength(value) {
    return typeof value === "number" ? `${value}px` : value
}

/** @param {HTMLDocument} document */
export function createbuttonadvanced(document, options = {}) {
    const element = createButton(document, { ...options, notappend: false})
    const size = cssLength(options.size ?? 40)
    const image = options.image ?? options.imageUrl

    element.style.width = size
    element.style.height = size
    element.style.boxSizing = "border-box"
    element.style.padding = "0"
    element.style.border = options.border || "none"
    element.style.borderRadius = "50%"
    element.style.backgroundColor = options.bgcolor || "#121314"
    element.style.backgroundImage = image ? `url(${JSON.stringify(image)})` : "none"
    element.style.backgroundPosition = "center"
    element.style.backgroundRepeat = "no-repeat"
    element.style.backgroundSize = options.backgroundSize || "cover"
    element.style.overflow = "hidden"
    element.style.cursor = options.cursor || "pointer"

    if (!options.notappend) {
        (options.parent || document.body).appendChild(element)
    }

    return element
}

export const createButtonAdvanced = createbuttonadvanced
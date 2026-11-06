//jai sri ram
import { createDiv } from "../core.js"

function inactivitytimer(callback, timeout) {
    let timer

    function reset() {
        clearTimeout(timer)
        timer = setTimeout(callback, timeout)
    }

    function cancel() {
        clearTimeout(timer)
    }

    return { reset, cancel }
}

/** @param {HTMLDocument} document */
export function createInactivtyDiv(document, options = {}) {
    const element = createDiv(document, {
        id: options.id,
        parent: options.parent,
        style: options.style,
        bgcolor: options.bgcolor,
        borderradius: options.borderradius,
        position: options.position
    })
    const timeout = options.inactivityTimeout ?? 3000
    const timer = inactivitytimer(() => {
        element.style.display = "none"
        options.onInactivity?.(element)
    }, timeout)

    function close() {
        timer.cancel()
        element.style.display = "none"
    }

    function resetInactivityTimer() {
        timer.reset()
    }

    element.addEventListener("pointermove", resetInactivityTimer)
    element.addEventListener("pointerdown", resetInactivityTimer)
    element.addEventListener("keydown", resetInactivityTimer)

    if (options.startInactivityTimer !== false) {
        resetInactivityTimer()
    }

    return { element, close, resetInactivityTimer }
}

export const createInactivityDiv = createInactivtyDiv
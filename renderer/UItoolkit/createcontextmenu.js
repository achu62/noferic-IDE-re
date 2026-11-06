//jai sri ram
import { createInactivtyDiv } from "./UIcore/variants/createinactivitydiv.js"

/** @param {HTMLDocument} document */
export function contextMenu(document, options = {}) {
	const menu = createInactivtyDiv(document, {
		id: options.id,
		parent: options.parent,
		style: options.style,
		bgcolor: options.bgcolor || "#121314",
		borderradius: options.borderradius,
		position: options.position || "absolute",
		inactivityTimeout: options.inactivityTimeout,
		startInactivityTimer: false,
		onInactivity: options.onInactivity
	})
	const element = menu.element

	element.style.display = "none"
	element.style.zIndex = options.zIndex || "1000"
	element.style.minWidth = options.minWidth || "200px"
	element.style.flexDirection = "column"
	element.style.gap = options.gap || "2px"

	for (const child of options.children || []) {
		if (child instanceof document.defaultView.HTMLElement) {
			element.appendChild(child)
		}
	}

	if (options.closeOnSelect !== false) {
		element.addEventListener("click", (event) => {
			if (event.target !== element) {
				menu.close()
			}
		})
	}

	function show(position) {
		let x = options.left
		let y = options.top

		if (position && typeof position.preventDefault === "function") {
			position.preventDefault()
			x = position.clientX
			y = position.clientY
		} else if (position && typeof position === "object") {
			x = position.x ?? position.left ?? x
			y = position.y ?? position.top ?? y
		}

		if (x !== undefined) element.style.left = typeof x === "number" ? `${x}px` : x
		if (y !== undefined) element.style.top = typeof y === "number" ? `${y}px` : y
		element.style.display = "flex"
		menu.resetInactivityTimer()
		return element
	}

	return { show, close: menu.close, element }
}
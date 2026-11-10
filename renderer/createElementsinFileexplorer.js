import { createButton } from "./UItoolkit/UIcore/core.js";
import { setModelContentorModel } from "./editor_ace/ace.js";
import { getIconPath } from "./getIconpath.js";
import { openFile } from "./renderer.js";

const initializedTrees = new WeakSet();


function sortedEntries(entries) {
    return [...entries].sort((first, second) => {
        if (first.isdirectory !== second.isdirectory) {
            return first.isdirectory ? -1 : 1;
        }
        return first.name.localeCompare(second.name, undefined, { numeric: true, sensitivity: "base" });
    });
}

function createEntry(entry, parent, depth, document, selectedPath) {
    const item = document.createElement("div");
    item.className = "tree-item";

    const button = createButton(document, {
        notappend: true,
        position: "relative",
        bgcolor: "transparent",
        hbgcolor: "#2a2d2e",
        border: "0",
        borderradius: "3px"
    });
    button.removeAttribute("style");
    button.type = "button";
    button.className = entry.isdirectory ? "file-entry directory-entry" : "file-entry";
    button.style.paddingLeft = `${4 + depth * 14}px`;
    const disclosure = document.createElement("span");
    disclosure.className = entry.isdirectory ? "tree-disclosure" : "tree-disclosure-placeholder";
    disclosure.setAttribute("aria-hidden", "true");

    const iconSpace = document.createElement("span");
    iconSpace.className = "file-icon-space";
    iconSpace.setAttribute("aria-hidden", "true");
    const iconPath = getIconPath(entry.name);
    if (iconPath) {
        const icon = document.createElement("img");
        icon.className = "file-icon";
        icon.src = iconPath;
        icon.alt = "";
        iconSpace.append(icon);
    }

    const label = document.createElement("span");
    label.className = "file-entry-label";
    label.textContent = entry.name;
    button.append(disclosure, iconSpace, label);
    button.dataset.path = entry.id;
    button.setAttribute("role", "treeitem");
    button.tabIndex = -1;
    button.setAttribute("aria-selected", String(selectedPath != null && entry.id === selectedPath));

    if (entry.isdirectory) {
        const children = document.createElement("div");
        children.className = "tree-children";
        children.setAttribute("role", "group");
        const expanded = depth === 0;
        button.setAttribute("aria-expanded", String(expanded));
        children.hidden = !expanded;
        item.append(button, children);
        sortedEntries(entry.children || []).forEach((child) => {
            createEntry(child, children, depth + 1, document, selectedPath);
        });
        button.addEventListener("click", () => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!isExpanded));
            children.hidden = isExpanded;
        });
    } else {
        item.append(button);
        button.addEventListener("click", async () => {
            await openFile(entry)
            parent.closest(".explorer-tree").querySelectorAll(".file-entry[aria-selected='true']").forEach((selected) => {
                selected.setAttribute("aria-selected", "false");
            });
            button.setAttribute("aria-selected", "true");
            button.dispatchEvent(new CustomEvent("file-select", {
                bubbles: true,
                detail: { id: entry.id, name: entry.name }
            }));
        });
    }

    parent.append(item);
}

function visibleItems(tree) {
    return [...tree.querySelectorAll(".file-entry")].filter((button) => {
        return !button.closest(".tree-children[hidden]");
    });
}

function setExpanded(button, expanded) {
    const children = button.parentElement.querySelector(":scope > .tree-children");
    if (!children) return;
    button.setAttribute("aria-expanded", String(expanded));
    children.hidden = !expanded;
}

/** Render a folder payload as a nested, keyboard-operable tree. */
export function recurse(array, parent, depth = 0, document = globalThis.document, selectedPath) {
    parent.replaceChildren();
    parent.setAttribute("role", "tree");
    parent.setAttribute("aria-label", "Files");
    sortedEntries(array).forEach((entry) => createEntry(entry, parent, depth, document, selectedPath));

    const firstItem = visibleItems(parent)[0];
    if (firstItem) firstItem.tabIndex = 0;

    if (initializedTrees.has(parent)) return;
    initializedTrees.add(parent);

    let typeahead = "";
    let lastTypeaheadAt = 0;
    parent.addEventListener("keydown", (event) => {
        const current = event.target.closest(".file-entry");
        if (!current || !parent.contains(current)) return;

        const items = visibleItems(parent);
        const currentIndex = items.indexOf(current);
        let next;
        switch (event.key) {
            case "ArrowDown":
                next = items[Math.min(currentIndex + 1, items.length - 1)];
                break;
            case "ArrowUp":
                next = items[Math.max(currentIndex - 1, 0)];
                break;
            case "Home":
                next = items[0];
                break;
            case "End":
                next = items[items.length - 1];
                break;
            case "ArrowRight": {
                const children = current.parentElement.querySelector(":scope > .tree-children");
                if (children && current.getAttribute("aria-expanded") !== "true") {
                    setExpanded(current, true);
                } else if (children) {
                    next = children.querySelector(":scope > .tree-item > .file-entry");
                }
                break;
            }
            case "ArrowLeft": {
                if (current.getAttribute("aria-expanded") === "true") {
                    setExpanded(current, false);
                } else {
                    next = current.parentElement.parentElement.closest(".tree-item")?.querySelector(":scope > .file-entry");
                }
                break;
            }
            default:
                if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
                    const now = Date.now();
                    const character = event.key.toLocaleLowerCase();
                    typeahead = now - lastTypeaheadAt > 700 || (typeahead.length === 1 && typeahead === character)
                        ? character
                        : typeahead + character;
                    lastTypeaheadAt = now;
                    next = [...items.slice(currentIndex + 1), ...items.slice(0, currentIndex + 1)]
                        .find((button) => button.textContent.trim().toLocaleLowerCase().startsWith(typeahead));
                    if (next) event.preventDefault();
                }
                if (!next) return;
        }

        if (event.key.startsWith("Arrow") || event.key === "Home" || event.key === "End") {
            event.preventDefault();
        }
        if (next) {
            current.tabIndex = -1;
            next.tabIndex = 0;
            next.focus();
        }
    });

    parent.addEventListener("click", (event) => {
        const button = event.target.closest(".file-entry");
        if (!button || !parent.contains(button)) return;
        parent.querySelectorAll(".file-entry[tabindex='0']").forEach((item) => {
            item.tabIndex = -1;
        });
        button.tabIndex = 0;
    });
}


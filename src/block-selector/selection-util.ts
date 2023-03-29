import { BLOCK_ATTR, IS_COLLAPSED, MARKDOWN_PREVIEW_VIEW } from "../constants";

export const isBottomInView = (block: HTMLElement) => {
	const rect = block.getBoundingClientRect();
	return rect.bottom <= window.innerHeight;
};

export const scrollBottomIntoView = (block: HTMLElement) => {
	const rect = block.getBoundingClientRect();
	const scrollable = getScrollParent(block);
	scrollable?.scrollBy({
		behavior: "auto",
		top: rect.bottom - scrollable.clientHeight + 200,
	});
};

export const isTopInView = (block: HTMLElement) => {
	const rect = block.getBoundingClientRect();
	return rect.top >= 0;
};

export const scrollTopIntoView = (block: HTMLElement) => {
	const rect = block.getBoundingClientRect();
	const scrollable = getScrollParent(block);
	scrollable?.scrollBy({
		behavior: "auto",
		top: rect.top - 200,
	});
};

/**
 * Find next block element to select.
 * Return null if there is no next block element.
 *
 * @param currentElement {HTMLElement} Current element to start searching
 * @returns {HTMLElement | null} Next block element
 */
export const findNextBlock = (
	currentElement: HTMLElement
): HTMLElement | null => {
	let nextBlock = null;

	// Start by checking if there's a block element inside the current element
	if (!isCollapsed(currentElement)) {
		const children = currentElement.children;
		for (let i = 0; i < children.length; i++) {
			nextBlock = findBlock(children[i] as HTMLElement);
			if (nextBlock) return nextBlock;
		}
	}

	// Check next siblings of current element
	let nextSibling = currentElement.nextElementSibling;
	while (nextSibling) {
		nextBlock = findBlock(nextSibling as HTMLElement);
		if (nextBlock) return nextBlock;

		nextSibling = nextSibling.nextElementSibling;
	}

	// Check next siblings of parent block element
	let parent = currentElement.parentElement;
	while (parent && !parent.hasClass(MARKDOWN_PREVIEW_VIEW)) {
		let parentSibling = parent.nextElementSibling;
		while (parentSibling) {
			nextBlock = findBlock(parentSibling as HTMLElement);
			if (nextBlock) return nextBlock;

			parentSibling = parentSibling.nextElementSibling;
		}
		parent = parent.parentElement;
	}

	// If no block element found, return null
	return null;
};

/**
 * Find previous block element to select.
 * Return null if there is no previous block element.
 *
 * @param currentElement {HTMLElement} Current element to start searching
 * @returns {HTMLElement | null} Previous block element
 */
export const findPreviousBlock = (
	currentElement: HTMLElement
): HTMLElement | null => {
	// Check previous siblings of current element
	let prevSibling = currentElement.previousElementSibling;
	while (prevSibling) {
		const prevBlock = findLastBlock(prevSibling as HTMLElement);
		if (prevBlock) return prevBlock;

		prevSibling = prevSibling.previousElementSibling;
	}

	// Check previous siblings of parent block element
	let parent = currentElement.parentElement;
	while (parent && !parent.classList.contains(MARKDOWN_PREVIEW_VIEW)) {
		// Check ancestors of current element first
		if (isBlock(parent)) return parent;

		let parentSibling = parent.previousElementSibling;
		while (parentSibling) {
			const prevBlock = findLastBlock(parentSibling as HTMLElement);
			if (prevBlock) return prevBlock;

			parentSibling = parentSibling.previousElementSibling;
		}
		parent = parent.parentElement;
	}

	// If no block element found, return null
	return null;
};

/**
 * Check if the given element is collapsed
 *
 * @param element {HTMLElement} Element to check
 * @returns {boolean} True if the element is collapsed
 */
const isCollapsed = (element: HTMLElement) => {
	return element.hasClass(IS_COLLAPSED);
};

/**
 * Find first block element inside the given element
 *
 * @param element {HTMLElement} Element to search
 * @returns {HTMLElement | null} First block element
 */
const findBlock = (element: HTMLElement): HTMLElement | null => {
	if (isBlock(element)) {
		return element;
	}

	let block = null;
	const childElements = element.children;
	for (let i = 0; i < childElements.length; i++) {
		block = findBlock(childElements[i] as HTMLElement);
		if (block) return block;
	}

	return null;
};

/**
 * Find last block element inside the given element
 *
 * @param element {HTMLElement} Element to search
 * @returns {HTMLElement | null} Last block element
 */
const findLastBlock = (element: HTMLElement): HTMLElement | null => {
	if (isCollapsed(element) && isBlock(element)) return element;

	let block = null;
	const childElements = element.children;
	for (let i = childElements.length - 1; i >= 0; i--) {
		block = findLastBlock(childElements[i] as HTMLElement);
		if (block) return block;
	}

	if (isBlock(element)) return element;
	else return null;
};

/**
 * Check if the given element is a block element
 *
 * @param element {HTMLElement} Element to check
 * @returns {boolean} True if the element is a block element
 */
const isBlock = (element: HTMLElement) => {
	return element.getAttribute(BLOCK_ATTR) === "true";
};

/**
 * Return the scrollable parent element of the given element
 *
 * @param node {HTMLElement} Element to start searching
 * @returns {HTMLElement | null} Scrollable parent element
 */
const getScrollParent = (node: HTMLElement): HTMLElement | null => {
	if (node == null) return null;

	if (node.scrollHeight > node.clientHeight) {
		return node;
	} else {
		return getScrollParent(node.parentNode as HTMLElement);
	}
};

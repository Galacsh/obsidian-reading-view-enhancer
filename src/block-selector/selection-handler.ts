import { BLOCK_ATTR, COLLAPSE_INDICATORS, SELECTED_BLOCK } from "../constants";
import {
	findNextBlock,
	findPreviousBlock,
	isBottomInView,
	isTopInView,
	scrollBottomIntoView,
	scrollTopIntoView,
} from "./selection-util";

/**
 * Handle block selection.
 * This class is used by BlockSelector.
 */
export default class SelectionHandler {
	selectedBlock: HTMLElement | null;

	constructor() {
		this.selectedBlock = null;
	}

	/**
	 * Select block element
	 *
	 * @param block {HTMLElement} Block element
	 */
	select(block: HTMLElement) {
		block.focus();
		block.addClass(SELECTED_BLOCK);
		this.selectedBlock = block;
	}

	/**
	 * Unselect block element.
	 * If there is no selected block, do nothing.
	 *
	 * @param block {HTMLElement} Block element
	 */
	unselect() {
		if (this.selectedBlock) {
			this.selectedBlock.removeClass(SELECTED_BLOCK);
			this.selectedBlock.blur();
			this.selectedBlock = null;
		}
	}

	/**
	 * Trigger 'select' on clicked block element.
	 *
	 * @param e {MouseEvent} Mouse event
	 */
	onBlockClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const block = target.closest(`[${BLOCK_ATTR}=true]`);
		if (block instanceof HTMLElement) {
			this.select(block);
		}
	}

	/**
	 * On keydown, navigate between blocks or fold/unfold blocks.
	 *
	 * - `ArrowDown`: Select next block
	 * - `ArrowUp`: Select previous block
	 * - `ArrowLeft` & `ArrowRight`: Fold/Unfold block
	 *
	 * If selected block is too long,
	 * `ArrowDown` and `ArrowUp` scrolls to see the element's bottom or top.
	 * This is for loading adjacent blocks which are not in the DOM tree.
	 *
	 * @param e {KeyboardEvent} Keyboard event
	 * @param scrollable {HTMLElement} Scrollable parent element
	 */
	onKeyDown(e: KeyboardEvent) {
		const block = e.target as HTMLElement;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			this.selectNextBlockOrScroll(block);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			this.selectPreviousBlockOrScroll(block);
		} else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
			e.preventDefault();
			this.toggleFold(block);
		} else if (e.key === "Escape") {
			this.unselect();
		}
	}

	/**
	 * Select next block or scroll to see the block's bottom.
	 *
	 * @param block {HTMLElement} Block element
	 */
	private selectNextBlockOrScroll(block: HTMLElement) {
		if (!isBottomInView(block)) {
			scrollBottomIntoView(block);
		} else {
			const next = findNextBlock(block);
			if (next) this.select(next as HTMLElement);
		}
	}

	/**
	 * Select previous block or scroll to see the block's top.
	 *
	 * @param block {HTMLElement} Block element
	 */
	private selectPreviousBlockOrScroll(block: HTMLElement) {
		if (!isTopInView(block)) {
			scrollTopIntoView(block);
		} else {
			const prev = findPreviousBlock(block);
			if (prev) this.select(prev as HTMLElement);
		}
	}

	/**
	 * Select top block in the view
	 *
	 * @param viewContainer {HTMLElement} View container element
	 */
	selectTopBlockInTheView(viewContainer: HTMLElement) {
		const blocks = viewContainer.querySelectorAll(`[${BLOCK_ATTR}=true]`);

		// If there is no block, do nothing
		if (blocks.length === 0) return;

		// Get the index of the topmost block in the view
		let topIndex = -1;
		for (let i = 0; i < blocks.length; i++) {
			topIndex = i;

			const rect = blocks[i].getBoundingClientRect();
			if (rect.bottom > 120) {
				break;
			}
		}

		const topBlock = blocks[topIndex];
		this.select(topBlock as HTMLElement);
	}

	/**
	 * Fold/Unfold block.
	 *
	 * @param block {HTMLElement} Block element
	 */
	private toggleFold(block: HTMLElement) {
		const collapseIndicator = block.querySelector(
			COLLAPSE_INDICATORS.join(",")
		) as HTMLElement;
		if (collapseIndicator) {
			collapseIndicator.click();
		}
	}
}

import ReadingViewEnhancer from "src/main";
import { BLOCK_ATTR, COLLAPSE_INDICATORS, SELECTED_BLOCK } from "../constants";
import {
	findNextBlock,
	findPreviousBlock,
	isBottomInView,
	isTopInView,
	scrollBottomIntoView,
	scrollTopIntoView,
} from "./selection-util";
import { getActiveView } from "src/utils";
import type { MarkdownViewModeType } from "obsidian";

/**
 * Handle block selection.
 * This class is used by BlockSelector.
 */
export default class SelectionHandler {
	plugin: ReadingViewEnhancer;
	selectedBlock: HTMLElement | null;
	nextBlockKeys: string[];
	prevBlockKeys: string[];
	toggleCollapseKeys: string[];
	deselectKeys: string[];
	startX: number;
	startY: number;

	constructor(plugin: ReadingViewEnhancer) {
		this.plugin = plugin;
		this.selectedBlock = null;
		this.nextBlockKeys = plugin.settings.nextBlockKeys.split(" ");
		this.prevBlockKeys = plugin.settings.prevBlockKeys.split(" ");
		this.toggleCollapseKeys = plugin.settings.toggleCollapseKeys.split(" ");
		this.deselectKeys = plugin.settings.deselectKeys.split(" ");
	}

	isSelected(block: HTMLElement) {
		return block === this.selectedBlock;
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
	 * Deselect block element.
	 * If there is no selected block, do nothing.
	 */
	deselect() {
		if (this.selectedBlock) {
			this.selectedBlock.removeClass(SELECTED_BLOCK);
			this.selectedBlock.blur();
		}
	}

	/**
	 * Record the starting point of mouse or touch event.
	 *
	 * @param e Mouse or touch event
	 */
	handleMouseTouchStart(e: MouseEvent | TouchEvent) {
		const { x, y } = this.clientXY(e);
		this.startX = x;
		this.startY = y;
	}

	/**
	 * Calculate the distance between the starting point and the end point.
	 * If the distance is less than 10, it is considered as a tap and
	 * fires the `handleTap` method.
	 *
	 * @param e Mouse or touch event
	 */
	handleMouseTouchEnd(e: MouseEvent | TouchEvent) {
		const { x: endX, y: endY } = this.clientXY(e);

		const distance = Math.sqrt(
			Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2)
		);

		if (distance < 10) {
			this.handleTap(e);
		}
	}

	/**
	 * Select or toggle collapse on tap.
	 *
	 * @param e Mouse or touch event
	 */
	private handleTap(e: MouseEvent | TouchEvent) {
		const target = e.target as HTMLElement;
		const block = target.closest(`[${BLOCK_ATTR}=true]`);
		if (block instanceof HTMLElement) {
			// if already selected, toggle collapse
			if (this.isSelected(block)) {
				this.toggleCollapse(block);
			}
			// if not selected, select
			else {
				this.select(block);
			}
		}
	}

	private clientXY(e: MouseEvent | TouchEvent) {
		if (e instanceof MouseEvent) {
			return { x: e.clientX, y: e.clientY };
		} else {
			return { x: e.touches[0].clientX, y: e.touches[0].clientY };
		}
	}

	/**
	 * On keydown, navigate between blocks or toggle collapse.
	 *
	 * If selected block is too long,
	 * `ArrowDown` and `ArrowUp` scrolls to see the element's bottom or top.
	 * This is for loading adjacent blocks which are not in the DOM tree.
	 *
	 * @param e {KeyboardEvent} Keyboard event
	 */
	onKeyDown(e: KeyboardEvent) {
		const block = e.target as HTMLElement;

		if (this.pressed(this.nextBlockKeys, e)) {
			e.preventDefault();
			this.selectNextBlockOrScroll(block);
		} else if (this.pressed(this.prevBlockKeys, e)) {
			e.preventDefault();
			this.selectPreviousBlockOrScroll(block);
		} else if (this.pressed(this.toggleCollapseKeys, e)) {
			e.preventDefault();
			this.toggleCollapse(block);
		} else if (this.pressed(this.deselectKeys, e)) {
			this.deselect();
		}
	}

	private pressed(keysOrCodes: string[], e: KeyboardEvent) {
		return keysOrCodes.includes(e.code) || keysOrCodes.includes(e.key);
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
	 * Toggle collapse.
	 *
	 * @param block Block element
	 */
	private toggleCollapse(block: HTMLElement) {
		const collapseIndicator = block.querySelector(
			COLLAPSE_INDICATORS.join(",")
		) as HTMLElement;
		if (collapseIndicator) {
			collapseIndicator.click();
		}
	}

	/**
	 * Toggle block highlight.
	 */
	async selectedBlockHighlight() {
		if (this.selectedBlock == null) return;
		await this.toggleBlockHighlight(this.selectedBlock);
	}

	/**
	 * Toggles highlight of the given block element.
	 *
	 * @param block Block element to toggle highlight
	 */
	private async toggleBlockHighlight(block: HTMLElement) {
		const view = getActiveView(this.plugin);
		if (view == null || view.file == null) return;
		const editor = view.editor;

		const lineStartStr = block.getAttribute("data-rve-line-start");
		const lineEndStr = block.getAttribute("data-rve-line-end");
		if (!lineStartStr || !lineEndStr) return;

		const lineStart = parseInt(lineStartStr, 10);
		const lineEnd = parseInt(lineEndStr, 10);
		const startPos = { line: lineStart, ch: 0 };
		const endPos = { line: lineEnd, ch: view.editor.getLine(lineEnd).length };
		const selectedText = editor.getRange(startPos, endPos);

		// editor instance might not be initialized
		this.changeMode("source");
		view.containerEl.style.visibility = "hidden";

		if (selectedText.startsWith("==") && selectedText.endsWith("==")) {
			editor.replaceRange(selectedText.slice(2, -2), startPos, endPos);
		} else {
			editor.replaceRange("==" + selectedText + "==", startPos, endPos);
		}

		// restore the reading view
		this.changeMode("preview");
		view.containerEl.style.visibility = "visible";
	}

	private changeMode(mode: MarkdownViewModeType) {
		const view = getActiveView(this.plugin);
		if (view == null) return;

		const state = view.getState();

		view.setState({ ...state, mode }, { history: true });
	}
}

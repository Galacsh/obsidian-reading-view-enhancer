import { MarkdownPostProcessorContext, Platform } from "obsidian";

import ReadingViewEnhancer from "src/main";
import SelectionHandler from "./selection-handler";
import { BLOCKS, BLOCK_ATTR, BLOCK_SELECTOR, FRONTMATTER } from "../constants";

/**
 * BlockSelector enables to navigate between blocks and fold/unfold blocks.
 *
 * Block elements are elements that are having block level elements.
 * For example, a paragraph is a block element.
 *
 * You can select a block by clicking on it and then use arrow keys to navigate between blocks.
 * For selected block, the background color will be changed.
 * You can also use `ArrowLeft` and `ArrowRight` to fold/unfold blocks.
 * Foldable blocks are having `collapse-indicator` or `callout-fold` class.
 */
export default class BlockSelector {
	plugin: ReadingViewEnhancer;
	selectionHandler: SelectionHandler;
	selectedBlock: HTMLElement | null;

	/**
	 * Initialize BlockSelector.
	 * Register markdown post processor to blockify some elements.
	 *
	 * @param plugin {ReadingViewEnhancer} Plugin instance
	 */
	constructor(plugin: ReadingViewEnhancer) {
		this.plugin = plugin;
		this.selectionHandler = new SelectionHandler();
	}

	/**
	 * Activate BlockSelector
	 */
	activate() {
		// Block selector only works on desktop
		if (Platform.isDesktop || Platform.isDesktopApp) {
			this.plugin.registerMarkdownPostProcessor(this.blockify.bind(this));
		}
	}

	/**
	 * Select top block in the view
	 *
	 * @param viewContainer {HTMLElement} View container element
	 */
	selectTopBlockInTheView(viewContainer: HTMLElement) {
		throw new Error("Not implemented");
	}

	/**
	 * Blockify some elements.
	 * If container is not initialized, initialize it.
	 * Transform some elements to block elements.
	 */
	private blockify(
		element: HTMLElement,
		context: MarkdownPostProcessorContext
	) {
		if (this.plugin.settings.enableBlockSelector) {
			// @ts-ignore
			const container = context?.containerEl;
			if (this.isContainerNotInitialized(container)) {
				this.initializeContainer(container);
			}

			this.elementsToBlocks(element);
		}
	}

	/**
	 * Check if container is initialized.
	 *
	 * @param container {MarkdownPostProcessorContext.containerEl} Container element
	 * @returns {boolean} True if container is initialized
	 */
	private isContainerNotInitialized(container: HTMLElement) {
		return (
			container instanceof HTMLElement && !container.hasClass(BLOCK_SELECTOR)
		);
	}

	/**
	 * Initialize container.
	 * Add some event listeners to container.
	 *
	 * @param container {MarkdownPostProcessorContext.containerEl} Container element
	 */
	private initializeContainer(container: HTMLElement) {
		// Mark container as initialized
		container.addClass(BLOCK_SELECTOR);

		// On click, select block element
		container.addEventListener("click", (e) =>
			this.selectionHandler.onBlockClick(e)
		);

		// On focusout, unselect block element
		container.addEventListener("focusout", () =>
			this.selectionHandler.unselect()
		);

		// On keydown, navigate between blocks or fold/unfold blocks
		container.addEventListener("keydown", (e) =>
			this.selectionHandler.onKeyDown(e)
		);
	}

	/**
	 * Set `data-rve-block` attribute to block elements.
	 *
	 * @param element {HTMLElement} Element to start searching
	 */
	private elementsToBlocks(element: HTMLElement) {
		const elements = element.querySelectorAll(BLOCKS.join(", "));
		elements.forEach((el) => {
			if (el.hasClass(FRONTMATTER)) return;
			el.setAttribute(BLOCK_ATTR, "true");
			el.setAttribute("tabindex", "-1");
		});
	}
}

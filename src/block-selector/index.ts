import { MarkdownPostProcessorContext, Platform, MarkdownView } from "obsidian";

import ReadingViewEnhancer from "src/main";
import SelectionHandler from "./selection-handler";
import { BLOCKS, BLOCK_ATTR, BLOCK_SELECTOR, FRONTMATTER } from "../constants";
import {
	getActiveView,
	getReadingViewContainer,
	isReadingView,
} from "src/utils";

/**
 * BlockSelector enables to navigate between blocks and toggle collapse.
 *
 * Block elements are elements that are having block level elements.
 * For example, a paragraph is a block element.
 *
 * You can select a block by clicking on it and then use arrow keys to navigate between blocks.
 * For selected block, the background color will be changed.
 * You can also use `ArrowLeft` and `ArrowRight` to toggle collapse.
 * Collapsible blocks have `collapse-indicator` or `callout-fold` class.
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
		this.selectionHandler = new SelectionHandler(plugin);
	}

	/**
	 * Activate BlockSelector
	 */
	activate() {
		this.plugin.registerMarkdownPostProcessor(this.blockify.bind(this));
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				"layout-change",
				this.autoSelectTopBlock.bind(this),
			),
		);
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				"active-leaf-change",
				this.autoSelectTopBlock.bind(this),
			),
		);
	}

	autoSelectTopBlock() {
		if (!this.plugin.settings.autoSelectTopBlock) return;

		const view = getActiveView(this.plugin);
		if (isReadingView(view)) {
			const containerEl = getReadingViewContainer(view);
			if (containerEl) {
				this.selectTopBlockInTheView(containerEl);
			}
		}
	}

	/**
	 * Select top block in the view
	 *
	 * @param viewContainer {HTMLElement} View container element
	 */
	selectTopBlockInTheView(viewContainer: HTMLElement) {
		this.selectionHandler.selectTopBlockInTheView(viewContainer);
	}

	/**
	 * Blockify some elements.
	 * If container is not initialized, initialize it.
	 * Transform some elements to block elements.
	 */
	private blockify(
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
	) {
		// If block selector is disabled, do nothing
		if (!this.plugin.settings.enableBlockSelector) return;

		// If it's mobile but block selector is disabled on mobile, do nothing
		if (
			(Platform.isMobile || Platform.isMobileApp) &&
			this.plugin.settings.disableBlockSelectorOnMobile
		) {
			return;
		}

		// @ts-ignore
		const container = context?.containerEl;
		if (this.isContainerNotInitialized(container)) {
			this.initializeContainer(container);
		}

		this.elementsToBlocks(element);
	}

	/**
	 * Check if container is initialized.
	 *
	 * @param container Container element
	 * @returns True if container is initialized
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
	 * @param container Container element
	 */
	private initializeContainer(container: HTMLElement) {
		// Mark container as initialized
		container.addClass(BLOCK_SELECTOR);

		// On click, select block element
		container.addEventListener(
			"click",
			this.selectionHandler.onBlockClick.bind(this.selectionHandler),
		);

		// On focusout, deselect block element
		container.addEventListener(
			"focusout",
			this.selectionHandler.deselect.bind(this.selectionHandler),
		);

		// On keydown, navigate between blocks or toggle collapse
		container.addEventListener(
			"keydown",
			this.selectionHandler.onKeyDown.bind(this.selectionHandler),
		);
	}

	/**
	 * Set `data-rve-block` attribute to block elements.
	 *
	 * @param element Element to start searching
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

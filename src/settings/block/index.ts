import ReadingViewEnhancer from "src/main";
import BlockColorSetting from "./block-color";
import EnableBlockSelectorSetting from "./block-selector";

/**
 * Registers settings components related to block selector.
 */
export default class BlockSelectorSettings {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		containerEl.createEl("h2", { text: "Block Selector" });
		new BlockColorSetting(containerEl, plugin);
		new EnableBlockSelectorSetting(containerEl, plugin);
	}
}

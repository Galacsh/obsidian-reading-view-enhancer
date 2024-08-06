import ReadingViewEnhancer from "src/main";
import BlockColorSetting from "./block-color";
import BlockTransparencySetting from "./block-transparency";
import EnableBlockSelectorSetting from "./block-selector";
import DisableBlockSelectorOnMobileSetting from "./block-selector-mobile";

/**
 * Registers settings components related to block selector.
 */
export default class BlockSelectorSettings {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		containerEl.createEl("h1", { text: "Block selector" });
		new BlockColorSetting(containerEl, plugin);
		new BlockTransparencySetting(containerEl, plugin);
		new EnableBlockSelectorSetting(containerEl, plugin);
		new DisableBlockSelectorOnMobileSetting(containerEl, plugin);
	}
}

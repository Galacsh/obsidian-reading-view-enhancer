import { Setting, TextAreaComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Previous block keys setting component
 */
export default class PrevBlockKeysSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Previous block")
			.setDesc("Keys to select previous block.")
			.addTextArea((textArea) => this.setKeys(textArea));
	}

	setKeys(textArea: TextAreaComponent) {
		textArea.setValue(this.plugin.settings.prevBlockKeys);

		// save on change
		textArea.onChange((changed) => {
			this.plugin.settings.prevBlockKeys = changed;
			this.plugin.saveSettings();
		});
	}
}

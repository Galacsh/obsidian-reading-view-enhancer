import { Setting, TextAreaComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Next block keys setting component
 */
export default class NextBlockKeysSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Next block")
			.setDesc("Keys to select next block.")
			.addTextArea((textArea) => this.setKeys(textArea));
	}

	setKeys(textArea: TextAreaComponent) {
		textArea.setValue(this.plugin.settings.nextBlockKeys);

		// save on change
		textArea.onChange((changed) => {
			this.plugin.settings.nextBlockKeys = changed;
			this.plugin.saveSettings();
		});
	}
}

import { Setting, TextAreaComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Deselect block keys setting component
 */
export default class DeselectBlockKeysSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Deselect block")
			.setDesc("Keys to deselect current block.")
			.addTextArea((textArea) => this.setKeys(textArea));
	}

	setKeys(textArea: TextAreaComponent) {
		textArea.setValue(this.plugin.settings.deselectKeys);

		// save on change
		textArea.onChange((changed) => {
			this.plugin.settings.deselectKeys = changed;
			this.plugin.saveSettings();
		});
	}
}

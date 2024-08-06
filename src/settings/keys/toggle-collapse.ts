import { Setting, TextAreaComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Toggle collapse keys setting component
 */
export default class ToggleCollapseKeysSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Toggle collapse")
			.setDesc("Keys to toggle collapse.")
			.addTextArea((textArea) => this.setKeys(textArea));
	}

	setKeys(textArea: TextAreaComponent) {
		textArea.setValue(this.plugin.settings.toggleCollapseKeys);

		// save on change
		textArea.onChange((changed) => {
			this.plugin.settings.toggleCollapseKeys = changed;
			this.plugin.saveSettings();
		});
	}
}

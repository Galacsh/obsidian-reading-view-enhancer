import { toHex } from "color2k";
import { Setting } from "obsidian";
import ReadingViewEnhancer from "src/main";

export default class CaretSettings {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		containerEl.createEl("h2", { text: "Caret (Cursor)" });
		new CaretColorSetting(containerEl, plugin);
		new AlwaysEnableCaretSetting(containerEl, plugin);
	}
}

class CaretColorSetting extends Setting {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.setName("Caret Color")
			.setDesc("Set color of the caret in reading view.")
			.addColorPicker((color) => {
				color.setValue(plugin.settings.caretColor);

				// save on change
				color.onChange((changed) => {
					plugin.settings.caretColor = toHex(changed);
					plugin.saveSettings();
				});
			});
	}
}

class AlwaysEnableCaretSetting extends Setting {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.setName("Always Enable Caret")
			.setDesc("Always enable caret on reading view.")
			.addToggle((toggle) => {
				toggle.setValue(plugin.settings.alwaysEnableCaret);

				// save on change
				toggle.onChange((changed) => {
					plugin.settings.alwaysEnableCaret = changed;
					plugin.saveSettings();
				});
			});
	}
}

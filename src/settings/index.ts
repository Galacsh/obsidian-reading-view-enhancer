import { PluginSettingTab, Setting } from "obsidian";
import ReadingViewEnhancer from "src/main";
import { toHex } from "color2k";

export interface RveSettings {
	caretColor: string;
	alwaysOn: boolean;
}

export const DEFAULT_SETTINGS: RveSettings = {
	caretColor: toHex(
		getComputedStyle(document.body).getPropertyValue("--color-accent").trim()
	),
	alwaysOn: false,
};

export class RveSettingTab extends PluginSettingTab {
	plugin: ReadingViewEnhancer;

	constructor(plugin: ReadingViewEnhancer) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		// Clear all first
		this.containerEl.empty();

		this.addHeader();
		this.addCaretColorSetting();
	}

	addHeader(): void {
		this.containerEl.createEl("h1", { text: "Reading View Enhancer" });
	}

	addCaretColorSetting(): void {
		new Setting(this.containerEl)
			.setName("Caret Color")
			.setDesc("Set color of caret in reading view.")
			.addColorPicker((color) => {
				color.setValue(this.plugin.settings.caretColor);

				// save on change
				color.onChange((changed) => {
					this.plugin.settings.caretColor = toHex(changed);
					this.plugin.saveSettings();
				});
			});
	}
}

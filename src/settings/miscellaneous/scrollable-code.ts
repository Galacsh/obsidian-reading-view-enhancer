import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Scrollable code setting component
 */
export default class ScrollableCodeSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Scrollable Code")
			.setDesc("Make code blocks scrollable instead of line break.")
			.addToggle((toggle) => this.setCodeScrollable(toggle));
	}

	setCodeScrollable(toggle: ToggleComponent) {
		toggle.setValue(this.plugin.settings.scrollableCode);

		// save on change
		toggle.onChange((changed) => {
			this.plugin.settings.scrollableCode = changed;
			this.plugin.saveSettings();
			this.plugin.applyScrollableCode(true);
		});
	}
}

import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Enable block selector setting component
 */
export default class EnableBlockSelectorSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Enable block selector")
			.setDesc("Restart is needed to apply changes.")
			.addToggle((toggle) => this.setEnableSelector(toggle));
	}

	/**
	 * Creates toggle component that enables/disables block selector.
	 *
	 * @param toggle {ToggleComponent} Toggle component
	 */
	setEnableSelector(toggle: ToggleComponent) {
		toggle.setValue(this.plugin.settings.enableBlockSelector);

		// save on change
		toggle.onChange((changed) => {
			this.plugin.settings.enableBlockSelector = changed;
			this.plugin.saveSettings();
		});
	}
}

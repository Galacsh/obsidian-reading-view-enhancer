import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Disable block selector on mobile setting component
 */
export default class DisableBlockSelectorOnMobileSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Disable block selector on mobile")
			.setDesc("Restart is needed to apply changes.")
			.addToggle((toggle) => this.setDisableSelectorOnMobile(toggle));
	}

	/**
	 * Creates toggle component that enables/disables block selector on mobile.
	 *
	 * @param toggle {ToggleComponent} Toggle component
	 */
	setDisableSelectorOnMobile(toggle: ToggleComponent) {
		toggle.setValue(this.plugin.settings.disableBlockSelectorOnMobile);

		// save on change
		toggle.onChange((changed) => {
			this.plugin.settings.disableBlockSelectorOnMobile = changed;
			this.plugin.saveSettings();
		});
	}
}

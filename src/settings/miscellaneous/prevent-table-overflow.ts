import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Prevent table overflow setting component
 */
export default class PreventTableOverflowingSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Prevent Table Overflowing")
			.setDesc(
				"Make tables scrollable to prevent table overflowing. " +
					"In Obsidian v1.1.16, table with a long text makes a horizontal scroll bar on the whole view. " +
					"This setting prevents that."
			)
			.addToggle((toggle) => this.preventTableOverflowing(toggle));
	}

	preventTableOverflowing(toggle: ToggleComponent) {
		toggle.setValue(this.plugin.settings.preventTableOverflowing);

		// save on change
		toggle.onChange((changed) => {
			this.plugin.settings.preventTableOverflowing = changed;
			this.plugin.saveSettings();
			this.plugin.applyPreventTableOverflowing(true);
		});
	}
}

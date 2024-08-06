import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Auto select top block setting component
 */
export default class AutoSelectTopBlockSetting extends Setting {
	plugin: ReadingViewEnhancer;
	workspaceEl: HTMLElement;

	constructor(settingsTabEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(settingsTabEl);
		this.plugin = plugin;

		this.setName("Auto-select top block")
			.setDesc(
				"Auto-select the top block in the view when switching into the reading view.",
			)
			.addToggle((toggle) => this.autoSelectTopBlock(toggle));
	}

	/**
	 * Creates toggle component
	 *
	 * @param toggle Toggle component
	 */
	autoSelectTopBlock(toggle: ToggleComponent) {
		const { settings } = this.plugin;

		toggle.setValue(settings.autoSelectTopBlock).onChange((changed) => {
			settings.autoSelectTopBlock = changed;
			this.plugin.saveSettings();
		});
	}
}

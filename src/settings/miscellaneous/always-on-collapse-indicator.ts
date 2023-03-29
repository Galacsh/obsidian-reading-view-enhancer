import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Always on collapse indicator setting component
 */
export default class AlwaysOnCollapseIndicatorSetting extends Setting {
	plugin: ReadingViewEnhancer;
	workspaceEl: HTMLElement;

	constructor(settingsTabEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(settingsTabEl);
		this.plugin = plugin;

		this.setName("Always on collapse indicator")
			.setDesc("Set collapse indicators always visible in reading view.")
			.addToggle((toggle) => this.alwaysOnCollapseIndicator(toggle));
	}

	/**
	 * Creates toggle component
	 *
	 * @param toggle {ToggleComponent} Toggle component
	 */
	alwaysOnCollapseIndicator(toggle: ToggleComponent) {
		const { settings } = this.plugin;

		toggle.setValue(settings.alwaysOnCollapseIndicator).onChange((changed) => {
			settings.alwaysOnCollapseIndicator = changed;
			this.plugin.saveSettings();
			this.plugin.applyAlwaysOnCollapse(true);
		});
	}
}

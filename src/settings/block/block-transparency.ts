import { Setting, SliderComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Block color transparency setting component
 */
export default class BlockTransparencySetting extends Setting {
	plugin: ReadingViewEnhancer;
	workspaceEl: HTMLElement;

	constructor(settingsTabEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(settingsTabEl);
		this.plugin = plugin;

		this.setName("Block color transparency")
			.setDesc("Set transparency of the above color.")
			.addSlider((color) => this.transparencySlider(color));
	}

	/**
	 * Creates transparency slider component.
	 *
	 * @param slider Slider component
	 */
	transparencySlider(slider: SliderComponent) {
		const { settings } = this.plugin;
		slider
			.setLimits(0, 100, 1)
			.setValue(settings.blockColor.transparency)
			.onChange((changed) => {
				// save on change
				settings.blockColor.transparency = changed;
				this.plugin.saveSettings();
				this.plugin.applyBlockColor(true);
			});
	}
}

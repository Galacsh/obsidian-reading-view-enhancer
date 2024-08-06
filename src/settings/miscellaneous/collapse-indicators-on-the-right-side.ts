import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

const description = [
	"Set collapse indicators to be shown on the right side.",
	"Since this makes some elements relative that were previously not, may lead some problems.",
];

/**
 * Collapse indicators on the right side setting component
 */
export default class CollapseIndicatorsOnTheRightSideSetting extends Setting {
	plugin: ReadingViewEnhancer;
	workspaceEl: HTMLElement;

	constructor(settingsTabEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(settingsTabEl);
		this.plugin = plugin;

		this.setName("[Experimental] Collapse indicator on the right side")
			.setDesc(description.join(" "))
			.addToggle((toggle) => this.collapseIndicatorOnTheRightSide(toggle));
	}

	/**
	 * Creates toggle component
	 *
	 * @param toggle Toggle component
	 */
	collapseIndicatorOnTheRightSide(toggle: ToggleComponent) {
		const { settings } = this.plugin;

		toggle
			.setValue(settings.collapseIndicatorOnTheRightSide)
			.onChange((changed) => {
				settings.collapseIndicatorOnTheRightSide = changed;
				this.plugin.saveSettings();
				this.plugin.applyCollapseIndicatorOnTheRightSide(true);
			});
	}
}

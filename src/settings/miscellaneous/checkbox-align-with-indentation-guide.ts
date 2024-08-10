import { Setting, ToggleComponent } from "obsidian";
import ReadingViewEnhancer from "src/main";

const description = [
	"Align checkboxes(task list item) to indentation guide line.",
];

/**
 * Align checkbox to indentation guide setting component
 */
export default class AlignCheckboxToIndentationGuide extends Setting {
	plugin: ReadingViewEnhancer;
	workspaceEl: HTMLElement;

	constructor(settingsTabEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(settingsTabEl);
		this.plugin = plugin;

		this.setName("Align checkbox to indentation guide")
			.setDesc(description.join(" "))
			.addToggle((toggle) => this.alignCheckboxToIndentationGuide(toggle));
	}

	/**
	 * Creates toggle component
	 *
	 * @param toggle Toggle component
	 */
	alignCheckboxToIndentationGuide(toggle: ToggleComponent) {
		const { settings } = this.plugin;

		toggle
			.setValue(settings.alignCheckboxToIndentationGuide)
			.onChange((changed) => {
				settings.alignCheckboxToIndentationGuide = changed;
				this.plugin.saveSettings();
				this.plugin.applyAlignCheckboxToIndentationGuide(true);
			});
	}
}

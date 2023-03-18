import {
	Setting,
	ButtonComponent,
	ColorComponent,
	ToggleComponent,
} from "obsidian";
import ReadingViewEnhancer from "src/main";
import { toHex } from "color2k";

/**
 * Registers settings components related to caret
 */
export default class CaretSettings {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		containerEl.createEl("h2", { text: "Caret" });
		new CaretColorSetting(containerEl, plugin);
		new AlwaysEnableCaretSetting(containerEl, plugin);
	}
}

/**
 * Caret color setting component
 */
class CaretColorSetting extends Setting {
	plugin: ReadingViewEnhancer;
	workspaceEl: HTMLElement;

	constructor(settingsTabEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(settingsTabEl);
		this.plugin = plugin;

		this.setName("Caret Color")
			.setDesc("Set color of the caret in reading view. ")
			.addColorPicker((color) => this.colorPicker(color));
	}

	/**
	 * Creates color picker component.
	 * Also, creates a button to set color to the current accent color.
	 */
	colorPicker(color: ColorComponent) {
		const { settings } = this.plugin;
		color.setValue(settings.caretColor).onChange((changed) => {
			// save on change
			settings.caretColor = toHex(changed);
			this.plugin.saveSettings();
		});
		this.addButton((button) => this.accentColorButton(button, color));
	}

	/**
	 * Creates a button to set color to the current accent color.
	 * Used in {@link colorPicker}
	 */
	accentColorButton(button: ButtonComponent, color: ColorComponent) {
		button.setButtonText("Use current accent color").onClick(() => {
			const workspaceEl = this.plugin.app.workspace.containerEl;
			const accentColor = toHex(
				getComputedStyle(workspaceEl).getPropertyValue("--color-accent").trim()
			);
			this.plugin.settings.caretColor = accentColor;
			this.plugin.saveSettings();
			color.setValue(accentColor);
		});
	}
}

/**
 * "Always enable caret" setting component
 */
class AlwaysEnableCaretSetting extends Setting {
	plugin: ReadingViewEnhancer;

	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(containerEl);
		this.plugin = plugin;

		this.setName("Always Enable Caret")
			.setDesc("Always enable caret on reading view.")
			.addToggle((toggle) => this.alwaysEnableCaret(toggle));
	}

	alwaysEnableCaret(toggle: ToggleComponent) {
		toggle.setValue(this.plugin.settings.alwaysEnableCaret);

		// save on change
		toggle.onChange((changed) => {
			this.plugin.settings.alwaysEnableCaret = changed;
			this.plugin.saveSettings();
		});
	}
}

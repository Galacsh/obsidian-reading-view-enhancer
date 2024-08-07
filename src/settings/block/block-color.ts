import { toHex, toRgba } from "color2k";
import { ButtonComponent, ColorComponent, Setting } from "obsidian";
import ReadingViewEnhancer from "src/main";

/**
 * Block color setting component
 */
export default class BlockColorSetting extends Setting {
	plugin: ReadingViewEnhancer;
	workspaceEl: HTMLElement;

	constructor(settingsTabEl: HTMLElement, plugin: ReadingViewEnhancer) {
		super(settingsTabEl);
		this.plugin = plugin;

		this.setName("Block color")
			.setDesc(
				"Set background color of the block in reading view. Transparency will be set automatically",
			)
			.addColorPicker((color) => this.colorPicker(color));
	}

	/**
	 * Creates color picker component.
	 * Also, creates a button to set color to the current accent color.
	 *
	 * @param color Color component
	 */
	colorPicker(color: ColorComponent) {
		const { settings } = this.plugin;
		color.setValue(toHex(settings.blockColor.color)).onChange((changed) => {
			// save on change
			settings.blockColor.color = toRgba(changed);
			this.plugin.saveSettings();
			this.plugin.applyBlockColor(true);
		});
		this.addButton((button) => this.accentColorButton(button, color));
	}

	/**
	 * Creates a button to use current accent color.
	 * Used in {@link colorPicker}.
	 *
	 * @param button Button component
	 * @param color Color component
	 */
	accentColorButton(button: ButtonComponent, color: ColorComponent) {
		button.setButtonText("Use current accent color").onClick(() => {
			const accentColor = this.getAccentColor();
			color.setValue(toHex(accentColor));

			this.plugin.settings.blockColor.color = accentColor;
			this.plugin.saveSettings();
			this.plugin.applyBlockColor(true);
		});
	}

	/**
	 * Gets current accent color from Obsidian.
	 *
	 * @returns Current accent color in hex format
	 */
	private getAccentColor(): string {
		const workspaceEl = this.plugin.app.workspace.containerEl;
		const accentColor = toRgba(
			getComputedStyle(workspaceEl).getPropertyValue("--color-accent").trim(),
		);
		return accentColor;
	}
}

import { Plugin } from "obsidian";
import RveStyles, { BlockColorRule } from "./styles";
import { RveSettingTab, RveSettings, DEFAULT_SETTINGS } from "./settings";
import Commands from "./commands";
import BlockSelector from "./block-selector";

export default class ReadingViewEnhancer extends Plugin {
	settings: RveSettings;
	styles: RveStyles;
	blockSelector: BlockSelector;

	/**
	 * On load,
	 *
	 * - Load settings & styles
	 * - Activate block selector
	 *     - It actually do its work if settings.enableBlockSelector is true
	 * - Register all commands
	 * - Add settings tab
	 */
	async onload() {
		// Settings & Styles
		await this.loadSettings();
		this.styles = new RveStyles();
		this.app.workspace.onLayoutReady(() => this.applySettingsToStyles());

		// Activate block selector.
		this.blockSelector = new BlockSelector(this);
		this.blockSelector.activate();

		// Register commands
		new Commands(this).register();

		// Add settings tab at last
		this.addSettingTab(new RveSettingTab(this));

		// Leave a message in the console
		console.log("Loaded 'Reading View Enhancer'");
	}

	/**
	 * On unload,
	 *
	 * - Remove all styles
	 */
	async onunload() {
		this.styles.cleanup();

		// Leave a message in the console
		console.log("Unloaded 'Reading View Enhancer'");
	}

	// ===================================================================

	/**
	 * Load settings
	 */
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	/**
	 * Save settings
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * Apply settings to styles
	 *
	 * - Apply block color
	 * - Apply always on collapse indicator
	 * - Apply prevent table overflowing
	 * - Apply scrollable code
	 */
	private applySettingsToStyles() {
		this.applyBlockColor();
		this.applyAlwaysOnCollapse();
		this.applyPreventTableOverflowing();
		this.applyScrollableCode();
		this.styles.apply();
	}

	/**
	 * Apply block color
	 *
	 * @param isImmediate {boolean} Whether to apply styles immediately
	 */
	applyBlockColor(isImmediate = false) {
		const blockColor = this.styles.of("block-color") as BlockColorRule;
		blockColor.set(this.settings.blockColor);
		if (isImmediate) this.styles.apply();
	}

	/**
	 * Apply always on collapse indicator
	 *
	 * @param isImmediate {boolean} Whether to apply styles immediately
	 */
	applyAlwaysOnCollapse(isImmediate = false) {
		this.styles.of("collapse-indicator").isActive =
			this.settings.alwaysOnCollapseIndicator;
		if (isImmediate) this.styles.apply();
	}

	/**
	 * Apply prevent table overflowing
	 *
	 * @param isImmediate {boolean} Whether to apply styles immediately
	 */
	applyPreventTableOverflowing(isImmediate = false) {
		this.styles.of("prevent-table-overflowing").isActive =
			this.settings.preventTableOverflowing;
		if (isImmediate) this.styles.apply();
	}

	/**
	 * Apply scrollable code
	 *
	 * @param isImmediate {boolean} Whether to apply styles immediately
	 */
	applyScrollableCode(isImmediate = false) {
		this.styles.of("scrollable-code").isActive = this.settings.scrollableCode;
		if (isImmediate) this.styles.apply();
	}
}

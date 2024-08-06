import ReadingViewEnhancer from "src/main";
import AlwaysOnCollapseIndicatorSetting from "./always-on-collapse-indicator";
import PreventTableOverflowingSetting from "./prevent-table-overflow";
import ScrollableCodeSetting from "./scrollable-code";

/**
 * Registers settings components not related to block.
 */
export default class MiscellaneousSettings {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		containerEl.createEl("h1", { text: "Miscellaneous" });
		new AlwaysOnCollapseIndicatorSetting(containerEl, plugin);
		new PreventTableOverflowingSetting(containerEl, plugin);
		new ScrollableCodeSetting(containerEl, plugin);
	}
}

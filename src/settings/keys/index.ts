import ReadingViewEnhancer from "src/main";
import NextBlockKeysSetting from "./next-block";
import PrevBlockKeysSetting from "./prev-block";
import ToggleCollapseKeysSetting from "./toggle-collapse";
import DeselectBlockKeysSetting from "./deselect-block";

const descriptions = [
	"Set keys to trigger actions.",
	"You can set multiple keys(not sequence on keys) to trigger an internal action.",
	"To set multiple keys, separate each key with a space.",
	"[Note] You should use KeyboardEvent.key property value.",
	"[Note] Restart is needed to apply changes.",
];

/**
 * Registers settings components related to keys.
 */
export default class KeysSettings {
	constructor(containerEl: HTMLElement, plugin: ReadingViewEnhancer) {
		containerEl.createEl("h1", { text: "Keys" });
		containerEl.createDiv({ cls: "setting-item-description" }, (desc) => {
			descriptions.forEach((text, idx) => {
				desc.createSpan({ text });
				if (idx + 1 < descriptions.length) desc.createEl("br");
			});
		});
		containerEl.createEl("br");

		new NextBlockKeysSetting(containerEl, plugin);
		new PrevBlockKeysSetting(containerEl, plugin);
		new ToggleCollapseKeysSetting(containerEl, plugin);
		new DeselectBlockKeysSetting(containerEl, plugin);
	}
}

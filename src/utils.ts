import { MarkdownView } from "obsidian";
import ReadingViewEnhancer from "./main";

export function getReadingViewContainer(activeView: MarkdownView | null) {
	if (activeView == null) return null;

	return activeView.previewMode.containerEl;
}

export function isReadingView(activeView: MarkdownView | null) {
	if (activeView == null) return false;
	else return activeView.currentMode === activeView.previewMode;
}

export function getActiveView(plugin: ReadingViewEnhancer) {
	const { workspace } = plugin.app;
	return workspace.getActiveViewOfType(MarkdownView);
}

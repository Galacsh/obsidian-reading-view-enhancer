import { MarkdownView, Workspace } from "obsidian";

/**
 * Returns true if active view is reading view
 */
export const isReadingView = (workspace: Workspace): boolean => {
	const activeView = workspace.getActiveViewOfType(MarkdownView);
	return activeView?.getMode() === "preview";
};

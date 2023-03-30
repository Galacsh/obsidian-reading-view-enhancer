import { RveCommand } from ".";
import ReadingViewEnhancer from "src/main";
import { MarkdownView, Platform } from "obsidian";

/**
 * Rerender all reading views
 *
 * @param plugin {ReadingViewEnhancer} Plugin instance
 * @returns {RveCommand} Rerender all reading views command
 */
export const rerenderAllReadingViews: RveCommand = (
	plugin: ReadingViewEnhancer
) => ({
	id: "rerender-all-reading-views",
	name: "Rerender all reading views",
	callback: () => {
		const { workspace } = plugin.app;
		workspace.getLeavesOfType("markdown").forEach((leaf) => {
			if (leaf.view.getState().mode === "preview") {
				// @ts-ignore
				leaf.view.previewMode?.rerender(true);
			}
		});
	},
});

/**
 * Select top block in the view
 *
 * @param plugin {ReadingViewEnhancer} Plugin instance
 * @returns {RveCommand} Select top block in the view command
 */
export const selectTopBlockInTheView: RveCommand = (
	plugin: ReadingViewEnhancer
) => ({
	id: "select-top-block-in-the-view",
	name: "Select Top Block in the View",
	checkCallback: (checking) => {
		// If active view is a reading view
		const { workspace } = plugin.app;
		const activeView = workspace.getActiveViewOfType(MarkdownView);

		// If active view is not a reading view, do not show the command
		if (activeView?.getState().mode !== "preview") return false;

		// If block selector is disabled, do not show the command
		if (!plugin.settings.enableBlockSelector) return false;

		// If it's mobile but block selector is disabled on mobile, do not show the command
		if (
			(Platform.isMobile || Platform.isMobileApp) &&
			plugin.settings.disableBlockSelectorOnMobile
		) {
			return false;
		}

		// If checking, return true
		if (checking) return true;

		// const { previewMode } = activeView;
		throw new Error("Not implemented");
	},
});

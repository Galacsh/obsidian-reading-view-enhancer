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
	checkCallback: (checking: boolean): boolean => {
		// If checking is set to true, perform a preliminary check.
		if (checking) {
			if (isNotReadingView(plugin)) return false;
			else if (isNotEnabled(plugin)) return false;
			else if (isMobileAndDisabled(plugin)) return false;
			else return true;
		}
		// If checking is set to false, perform an action.
		else {
			const container = getReadingViewContainer(plugin);
			if (container) {
				plugin.blockSelector.selectTopBlockInTheView(container);
			}

			return true;
		}
	},
});

const isNotReadingView = (plugin: ReadingViewEnhancer) => {
	const activeView = getActiveView(plugin);
	return activeView?.getState().mode !== "preview";
};

const isNotEnabled = (plugin: ReadingViewEnhancer) => {
	return !plugin.settings.enableBlockSelector;
};

const isMobileAndDisabled = (plugin: ReadingViewEnhancer) => {
	return (
		(Platform.isMobile || Platform.isMobileApp) &&
		plugin.settings.disableBlockSelectorOnMobile
	);
};

const getReadingViewContainer = (plugin: ReadingViewEnhancer) => {
	const activeView = getActiveView(plugin);
	return activeView?.previewMode.containerEl;
};

const getActiveView = (plugin: ReadingViewEnhancer) => {
	const { workspace } = plugin.app;
	return workspace.getActiveViewOfType(MarkdownView);
};

import { RveCommand } from ".";
import ReadingViewEnhancer from "src/main";
import {
	getActiveView,
	getReadingViewContainer,
	isReadingView,
} from "src/utils";
import { Platform } from "obsidian";

/**
 * Rerender all reading views
 *
 * @param plugin Plugin instance
 * @returns Rerender all reading views command
 */
export const rerenderAllReadingViews: RveCommand = (
	plugin: ReadingViewEnhancer,
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
 * @param plugin Plugin instance
 * @returns Select top block in the view command
 */
export const selectTopBlockInTheView: RveCommand = (
	plugin: ReadingViewEnhancer,
) => ({
	id: "select-top-block-in-the-view",
	name: "Select Top Block in the View",
	checkCallback: (checking: boolean): boolean => {
		const activeView = getActiveView(plugin);
		// If checking is set to true, perform a preliminary check.
		if (checking) {
			if (isReadingView(activeView)) return false;
			else if (isNotEnabled(plugin)) return false;
			else if (isMobileAndDisabled(plugin)) return false;
			else return true;
		}
		// If checking is set to false, perform an action.
		else {
			const container = getReadingViewContainer(activeView);
			if (container) {
				plugin.blockSelector.selectTopBlockInTheView(container);
			}

			return true;
		}
	},
});

const isNotEnabled = (plugin: ReadingViewEnhancer) => {
	return !plugin.settings.enableBlockSelector;
};

const isMobileAndDisabled = (plugin: ReadingViewEnhancer) => {
	return (
		(Platform.isMobile || Platform.isMobileApp) &&
		plugin.settings.disableBlockSelectorOnMobile
	);
};

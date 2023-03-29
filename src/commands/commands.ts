import { RveCommand } from ".";
import ReadingViewEnhancer from "src/main";

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

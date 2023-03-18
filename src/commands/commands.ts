import { Command, Workspace } from "obsidian";
import { isReadingView } from "src/utils/mode";
import { WorkspaceCommand, COMMAND_TYPE } from "./types";

/**
 * Enable caret on
 */
export const enableCaret: WorkspaceCommand = {
	type: COMMAND_TYPE.USE_WORKSPACE,
	get: (workspace: Workspace): Command => ({
		id: "enable-caret",
		name: "Enable Caret",
		checkCallback: (checking) => {
			// if reading view is active
			if (isReadingView(workspace)) {
				// if checking whether to show command,
				// return true since it's preview mode.
				if (checking) return true;
				// if not checking, run the command.
				else throw new Error("Not implemented yet");
			}
			// if is not preview mode, do not show this command.
			else return false;
		},
	}),
};

export const disableCaret: WorkspaceCommand = {
	type: COMMAND_TYPE.USE_WORKSPACE,
	get: (workspace: Workspace): Command => ({
		id: "disable-caret",
		name: "Disable Caret",
		checkCallback: (checking) => {
			// if reading view is active
			if (isReadingView(workspace)) {
				// if checking whether to show command,
				// return true since it's preview mode.
				if (checking) return true;
				// if not checking, run the command.
				else throw new Error("Not implemented yet");
			}
			// if is not preview mode, do not show this command.
			else return false;
		},
	}),
};

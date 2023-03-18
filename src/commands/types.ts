import { Command, Workspace } from "obsidian";

export enum COMMAND_TYPE {
	USE_WORKSPACE = "use-workspace",
	PLAIN = "plain",
}

export interface TypedCommand {
	type: COMMAND_TYPE;
	get: (workspace?: Workspace) => Command;
}

export interface WorkspaceCommand extends TypedCommand {
	type: COMMAND_TYPE.USE_WORKSPACE;
	get: (workspace: Workspace) => Command;
}

export interface PlainCommand extends TypedCommand {
	type: COMMAND_TYPE.PLAIN;
	get: () => Command;
}

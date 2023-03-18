import ReadingViewEnhancer from "src/main";
import * as commands from "./commands";
import { COMMAND_TYPE, TypedCommand } from "./types";

const setCommandsFor = (plugin: ReadingViewEnhancer) => {
	Object.values(commands)
		.map((command: TypedCommand) => {
			switch (command.type) {
				case COMMAND_TYPE.PLAIN:
					return command.get();
				case COMMAND_TYPE.USE_WORKSPACE:
					return command.get(plugin.app?.workspace);
				default:
					throw new Error(
						"Unknown type of command. Please update 'COMMAND_TYPE'."
					);
			}
		})
		.forEach((command) => plugin.addCommand(command));
};

export default setCommandsFor;

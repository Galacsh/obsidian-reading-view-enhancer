import { SELECTED_BLOCK } from "./constants";

/**
 * Style rule that holds the template
 * and the function to inject variables
 */
class StyleRule {
	private template: string;
	private injectVariables: (template: string) => string;
	isActive: boolean;

	constructor(template: string, injectVariables: (template: string) => string) {
		this.template = template;
		this.isActive = false;
		this.injectVariables = injectVariables;
	}

	/**
	 * Get the rule after injecting variables
	 *
	 * @returns The rule
	 */
	getRule() {
		return this.injectVariables(this.template);
	}
}

/**
 * Block color rule.
 *
 * Accepts a block color and injects it into the template.
 */
export class BlockColorRule extends StyleRule {
	private color: string;
	private transparency: number;

	constructor() {
		const template = `
			.${SELECTED_BLOCK} {
				position: relative;
				z-index: 0;
			}
			
			.${SELECTED_BLOCK}::before {
				content: "";
				position: absolute;
				z-index: -1;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				background-color: {{BLOCK_COLOR}};
			}
		`;
		super(template, (template: string) => {
			const percentage = this.transparency / 100;
			const transparencyApplied = this.color.replace(
				/\d+\s*\)$/,
				percentage + ")",
			);
			return template.replace("{{BLOCK_COLOR}}", transparencyApplied);
		});

		this.isActive = true;
	}

	/**
	 * Set the block color
	 *
	 * @param blockColor {string} The block color
	 */
	set(blockColor: { color: string; transparency: number }) {
		this.color = blockColor.color;
		this.transparency = blockColor.transparency;
	}
}

/**
 * Collapse indicator rule.
 *
 * No variables to inject.
 */
export class CollapseIndicatorAlwaysOnRule extends StyleRule {
	constructor() {
		const template = `
			.markdown-preview-section .collapse-indicator {
				opacity: 1;
			}
		`;
		super(template, (template: string) => template);
	}
}

/**
 * Collapse indicator on the right side rule.
 *
 * No variables to inject.
 */
export class CollapseIndicatorOnTheRightSideRule extends StyleRule {
	constructor() {
		const template = `
			.markdown-preview-section>div:not([class="markdown-preview-pusher"]),
			.markdown-preview-section>div:not([class="mod-header"]) {
					position: relative;
			}

			.markdown-preview-section .collapse-indicator {
					right: -1rem;
					padding-inline-end: 0;
			}
		`;
		super(template, (template: string) => template);
	}
}

/**
 * Scrollable code rule.
 *
 * No variables to inject.
 */
export class ScrollableCodeRule extends StyleRule {
	constructor() {
		const template = `
			.markdown-preview-section div > pre {
				overflow: hidden;
				white-space: pre-wrap;
			}

			.markdown-preview-section div > pre > code {
				display: block;
				overflow: auto;
				white-space: pre;
			}
		`;
		super(template, (template: string) => template);
	}
}

type RuleKey =
	| "block-color"
	| "collapse-indicator-always-on"
	| "collapse-indicator-on-the-right-side"
	| "scrollable-code";

/**
 * The class that manages all style rules.
 */
export default class RveStyles {
	styleTag: HTMLStyleElement;
	rules: Record<RuleKey, StyleRule>;

	constructor() {
		this.styleTag = document.createElement("style");
		this.styleTag.id = "rve-styles";
		document.getElementsByTagName("head")[0].appendChild(this.styleTag);

		this.rules = {
			"block-color": new BlockColorRule(),
			"collapse-indicator-always-on": new CollapseIndicatorAlwaysOnRule(),
			"collapse-indicator-on-the-right-side":
				new CollapseIndicatorOnTheRightSideRule(),
			"scrollable-code": new ScrollableCodeRule(),
		};
	}

	/**
	 * Clean up the style tag
	 */
	cleanup() {
		this.styleTag.remove();
	}

	/**
	 * Get a rule by key
	 *
	 * @param rule rule's key
	 * @returns One of the rules
	 */
	of(rule: RuleKey) {
		return this.rules[rule];
	}

	/**
	 * Apply all active rules
	 */
	apply() {
		const style = Object.values(this.rules)
			.filter((rule) => rule.isActive)
			.map((rule) => rule.getRule())
			.join("\n");

		this.styleTag.innerHTML = style;
	}
}

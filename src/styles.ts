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
	 * @returns {string} The rule
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
	private blockColor: string;

	constructor() {
		const template = `
			.${SELECTED_BLOCK} {
				position: relative;
			}
			
			.${SELECTED_BLOCK}::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				background-color: {{BLOCK_COLOR}}1a;
			}
		`;
		super(template, (template: string) => {
			return template.replace("{{BLOCK_COLOR}}", this.blockColor);
		});

		this.isActive = true;
	}

	/**
	 * Set the block color
	 *
	 * @param blockColor {string} The block color
	 */
	set(blockColor: string) {
		this.blockColor = blockColor;
	}
}

/**
 * Collapse indicator rule.
 *
 * No variables to inject.
 */
export class CollapseIndicatorRule extends StyleRule {
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
 * Prevent table overflowing rule.
 *
 * No variables to inject.
 */
export class PreventTableOverflowingRule extends StyleRule {
	constructor() {
		const template = `
			.markdown-preview-section > div:has(table) {
				overflow: auto;
			}

			.markdown-preview-section thead > tr > th,
			.markdown-preview-section tbody > tr > td {
				white-space: nowrap;
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
	| "collapse-indicator"
	| "prevent-table-overflowing"
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
			"collapse-indicator": new CollapseIndicatorRule(),
			"prevent-table-overflowing": new PreventTableOverflowingRule(),
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
	 * @param rule {RuleKey} rule's key
	 * @returns {StyleRule} One of the rules
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

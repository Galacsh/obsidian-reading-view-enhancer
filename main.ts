import { MarkdownView, Plugin } from "obsidian";

export default class ReadingViewEnhancer extends Plugin {
	async onload() {
		const { workspace } = this.app;

		// Loosing cursor effect
		this.registerEvent(workspace.on("editor-change", this.deactivate));
		this.registerEvent(workspace.on("active-leaf-change", this.deactivate));
		this.registerEvent(workspace.on("layout-change", this.deactivate));

		// Command for activating selector
		this.addCommand({
			id: "reading-mode-activate-selector",
			name: "Activate selector",
			checkCallback: (checking) => {
				if (this.isPreviewMode()) {
					if (!checking) this.activate();
					return true;
				} else return false;
			},
		});

		// Command for deactivating selector
		this.addCommand({
			id: "reading-mode-deactivate-selector",
			name: "Deactivate selector",
			checkCallback: (checking) => {
				if (this.isPreviewMode()) {
					if (!checking) this.deactivate();
					return true;
				} else return false;
			},
		});
	}

	/**
	 * Returns true if active view is in preview(reading) mode
	 */
	isPreviewMode(): boolean {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		return activeView?.getMode() === "preview";
	}

	/**
	 * Activate collapse manager
	 */
	activate(): void {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		const previewContainer = activeView?.previewMode.containerEl;

		if (previewContainer) {
			const collapseManager = CollapseIndicatorManager.getInstance();
			collapseManager.activate(previewContainer);
		} else {
			console.log("No preview container to activate Reading Mode Cursor.");
		}
	}

	/**
	 * Deactivate collapse manager
	 */
	deactivate(): void {
		const blockSelector = CollapseIndicatorManager.getInstance();
		blockSelector.deactivate();
	}
}

class CollapseIndicatorManager {
	private static instance: CollapseIndicatorManager;
	private isActive = false;
	private rootElement: HTMLElement | null;
	private selectedIndex: number;
	private selector: HTMLElement | null;
	private indicators: HTMLElement[];
	private observer: MutationObserver;
	private arrowKeyListener: (ev: KeyboardEvent) => void;
	private clickListener: (ev: MouseEvent) => void;

	private constructor() {
		this.isActive = false;
		this.rootElement = null;
		this.selectedIndex = -1;
		this.selector = null;
		this.indicators = [];
		this.observer = new MutationObserver(() => {
			this.updateIndicators();
		});
		this.arrowKeyListener = this.handleArrowEvent.bind(this);
		this.clickListener = this.handleClickEvent.bind(this);
	}

	public static getInstance(): CollapseIndicatorManager {
		if (!CollapseIndicatorManager.instance) {
			CollapseIndicatorManager.instance = new CollapseIndicatorManager();
		}

		return CollapseIndicatorManager.instance;
	}

	public activate(rootElement: HTMLElement): void {
		if (this.isActive) return;

		this.isActive = true;
		this.rootElement = rootElement;

		this.updateIndicators();
		this.selectNext();

		this.observer.observe(rootElement, {
			childList: true,
			subtree: true,
			attributes: true,
		});

		this.addEventListeners();
	}

	public deactivate(): void {
		if (!this.isActive) return;

		this.isActive = false;

		this.removeEventListeners();
		this.observer?.disconnect();

		// Remove selector
		this.selector?.classList.remove("rmc-selected");
		this.selectedIndex = -1;
		this.selector = null;

		this.rootElement = null;
	}

	private addEventListeners(): void {
		document.body.addEventListener("keydown", this.arrowKeyListener);
		this.rootElement?.addEventListener("click", this.clickListener);
	}

	private removeEventListeners(): void {
		document.body.removeEventListener("keydown", this.arrowKeyListener);
		this.rootElement?.removeEventListener("click", this.clickListener);
	}

	private handleArrowEvent(event: KeyboardEvent) {
		if (this.isActive) {
			switch (event.key) {
				case "ArrowUp":
					event.preventDefault();
					this.selectPrevious();
					this.scrollToSelector();
					break;
				case "ArrowDown":
					event.preventDefault();
					this.selectNext();
					this.scrollToSelector();
					break;
				case "ArrowLeft":
				case "ArrowRight":
					event.preventDefault();
					this.selector?.click(); // 실제 클릭 이벤트 단 거랑 같이 동작돼서 selected 날아감 : TODO
					break;
				case "Escape":
					this.deactivate();
					break;
				default:
					break;
			}
		}
	}

	private handleClickEvent(event: MouseEvent): void {
		const clicked = event.target as HTMLElement;
		if (clicked.classList?.contains("collapse-indicator")) return;
		else if (
			clicked.tagName === "a" ||
			clicked.tagName === "input" ||
			clicked.tagName === "button"
		) {
			return;
		} else event.stopPropagation();

		const nearestIndex = this.findNearestUpperIndicatorIndex(
			event.clientX,
			event.clientY
		);
		this.select(nearestIndex);
	}

	private findNearestUpperIndicatorIndex(x: number, y: number): number {
		let nearestIndex = -1;
		let nearestDistance = Number.MAX_VALUE;

		this.indicators.forEach((indicator, index) => {
			const distance = this.getDistanceToUpperElement({ x, y }, indicator);

			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestIndex = index;
			}
		});

		return nearestIndex;
	}

	private getDistanceToUpperElement(
		{ x, y }: { x: number; y: number },
		upperElement: HTMLElement
	): number {
		const upper = upperElement.getBoundingClientRect();

		const dy = y - upper.top;

		if (dy < 0) return Number.MAX_VALUE;
		else return dy;
	}

	private select(index: number): void {
		this.selector?.classList.remove("rmc-selected");

		this.selectedIndex = index;
		if (index === -1) this.selector = null;
		else this.selector = this.indicators[index];

		this.selector?.classList.add("rmc-selected");
	}

	private selectPrevious(): void {
		if (this.indicators.length === 0 || this.selectedIndex <= 0) return;
		this.select(this.selectedIndex - 1);
	}

	private selectNext(): void {
		if (
			this.indicators.length === 0 ||
			this.selectedIndex >= this.indicators.length - 1
		) {
			return;
		}

		this.select(this.selectedIndex + 1);
	}

	private scrollToSelector(): void {
		this.selector?.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center",
		});
	}

	private updateIndicators(): void {
		this.indicators = this.findSelectable();
	}

	private findSelectable(): HTMLElement[] {
		if (this.rootElement == null) return [];

		return Array.from(
			this.rootElement.querySelectorAll(".collapse-indicator")
		).filter(this.isSelectable) as HTMLElement[];
	}

	private isSelectable(indicator: HTMLElement): boolean {
		const parent = indicator.parentElement;

		if (parent?.closest(".collapse-indicator")?.closest(".is-collapsed"))
			return false;
		else if (parent?.closest("ol")?.closest(".is-collapsed")) return false;
		else if (parent?.closest("ul")?.closest(".is-collapsed")) return false;
		else return true;
	}
}

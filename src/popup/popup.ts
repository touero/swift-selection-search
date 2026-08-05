document.addEventListener("DOMContentLoaded", () => {
	applyConfiguredTheme();

	const settingsButton = document.querySelector("#open-settings") as HTMLButtonElement;
	const githubButton = document.querySelector("#open-github") as HTMLButtonElement;

	settingsButton.addEventListener("click", () => {
		chrome.runtime.openOptionsPage();
		window.close();
	});

	githubButton.addEventListener("click", () => {
		chrome.tabs.create({ url: "https://github.com/touero/swift-selection-search" });
		window.close();
	});
});

function applyConfiguredTheme()
{
	chrome.storage.local.get(["popupBackgroundColor", "popupHighlightColor"], items => {
		const root = document.documentElement;
		const backgroundColor = typeof items.popupBackgroundColor === "string" ? items.popupBackgroundColor : "#ffffff";
		const highlightColor = typeof items.popupHighlightColor === "string" ? items.popupHighlightColor : "#3399ff";

		root.style.setProperty("--sss-popup-background-color", backgroundColor);
		root.style.setProperty("--sss-popup-highlight-color", highlightColor);
		root.style.setProperty("--sss-popup-text-color", getReadableTextColor(backgroundColor));
	});
}

function getReadableTextColor(color: string): string
{
	const rgba = parseCssColor(color);
	if (rgba === null) return "#222222";

	// Blend transparent configured colors over white, which is Chrome's popup backdrop.
	const red = rgba.red * rgba.alpha + 255 * (1 - rgba.alpha);
	const green = rgba.green * rgba.alpha + 255 * (1 - rgba.alpha);
	const blue = rgba.blue * rgba.alpha + 255 * (1 - rgba.alpha);
	const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
	return luminance > 0.55 ? "#222222" : "#ffffff";
}

function parseCssColor(color: string): { red: number; green: number; blue: number; alpha: number; }
{
	const trimmedColor = color.trim();
	const hexMatch = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(trimmedColor);
	if (hexMatch !== null) {
		let hex = hexMatch[1];
		if (hex.length === 3 || hex.length === 4) {
			hex = hex.split("").map(char => char + char).join("");
		}

		return {
			red: parseInt(hex.substring(0, 2), 16),
			green: parseInt(hex.substring(2, 4), 16),
			blue: parseInt(hex.substring(4, 6), 16),
			alpha: hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1,
		};
	}

	const rgbaMatch = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*(?:\.\d+)?))?\s*\)$/i.exec(trimmedColor);
	if (rgbaMatch !== null) {
		return {
			red: Math.min(255, parseInt(rgbaMatch[1], 10)),
			green: Math.min(255, parseInt(rgbaMatch[2], 10)),
			blue: Math.min(255, parseInt(rgbaMatch[3], 10)),
			alpha: rgbaMatch[4] === undefined ? 1 : Math.max(0, Math.min(1, parseFloat(rgbaMatch[4]))),
		};
	}

	return null;
}

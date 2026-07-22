// Selection trigger adapted for Swift Selection Search.
//
// The Firefox version compared DOM Range objects on every interaction. Reading
// ranges can force style/font resolution in Chrome and makes unrelated page or
// extension CSP errors appear to originate from SSS. Chrome only needs the
// originating user events; page-script.ts reads the actual selection once.

namespace selectionchange
{
	const MAC = /^Mac/.test(navigator.platform);
	const MAC_MOVE_KEYS = new Set([65, 66, 69, 70, 78, 80]);
	export const modifierKey = MAC ? "metaKey" : "ctrlKey";

	export class CustomSelectionChangeEvent extends Event
	{
		altKey: boolean;
		isMouse: boolean;
		event: Event;
	}

	// Direct callback inside this extension's isolated world. No DOM custom
	// events are emitted, so pages and other extensions cannot observe it.
	export let onChange: (event: CustomSelectionChangeEvent) => void = null;

	let isStarted = false;

	export function start()
	{
		if (isStarted) return;
		isStarted = true;
		document.addEventListener("input", onInput, true);
		document.addEventListener("keydown", onKeyDown, true);
		document.addEventListener("mouseup", onMouseUp, true);
	}

	export function stop()
	{
		if (!isStarted) return;
		isStarted = false;
		document.removeEventListener("input", onInput, true);
		document.removeEventListener("keydown", onKeyDown, true);
		document.removeEventListener("mouseup", onMouseUp, true);
	}

	function onInput(ev: Event)
	{
		if (!isInputField(ev.target)) notify(ev, false);
	}

	function onKeyDown(ev: KeyboardEvent)
	{
		const code = ev.keyCode;
		if ((code === 65 && ev[modifierKey] && !ev.shiftKey && !ev.altKey)
			|| (code >= 35 && code <= 40 && ev.shiftKey)
			|| (ev.ctrlKey && MAC && MAC_MOVE_KEYS.has(code)))
		{
			if (!isInputField(ev.target)) {
				setTimeout(() => notify(ev, false), 0);
			}
		}
	}

	function onMouseUp(ev: MouseEvent)
	{
		if (ev.button === 0) {
			setTimeout(() => notify(ev, true), 0);
		}
	}

	function notify(sourceEvent: Event, isMouse: boolean)
	{
		if (!onChange) return;
		const event = new CustomSelectionChangeEvent("sss-internal-selectionchange");
		event.altKey = (sourceEvent as MouseEvent | KeyboardEvent).altKey ?? false;
		event.isMouse = isMouse;
		event.event = sourceEvent;
		onChange(event);
	}

	function isInputField(elem: EventTarget): boolean
	{
		return elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement;
	}
}


import { GameState } from "./main.js"

export function volumeManager() {
	
	let volumeIndex = 9
	let barXPosition = -110
	let seconds = 0
	let tune = 0

	volume(volumeIndex / 10)

	let bg = add([
		rect(width() / 6, 80),
		pos(width() / 2, 0),
		anchor("top"),
		color(BLACK),
		opacity(0),
		// stay(),
		z(999999999),
	])
	
	let volumeText = bg.add([
		text("VOLUME"),
		pos(0, bg.height - 12),
		anchor("center"),
		scale(0.6),
		opacity(0),
		// stay(),
		z(9999999999),
	])
	
	let bars;
	
	debug.log(volumeIndex)

	for (let i = 0; i < 10; i++) {
		barXPosition += 20
		
		volumeText.add([
			pos(barXPosition, -65),
			rect(10, bg.height - 10),
			opacity(0),
			anchor("center"),
			// stay(),
			z(99999999999),
		])
	}

	bars = volumeText.get("*", { recursive: true })
	
	let gameManager = add([stay()])

	gameManager.onKeyPress("-", () => {
		if (volumeIndex > 0) {
			bars[volumeIndex - 1].opacity = 0.1
			volumeIndex--
			volume(volumeIndex / 10)
			tune -= 25
		}
		
		play("volumeChange", { detune: tune })
		seconds = 0
		bg.opacity = 0.5
		volumeText.opacity = 1
		for(let i = 0; i < 10; i++) {
			bars[i].opacity = 0.1
		}

		for(let i = 0; i < volumeIndex; i++) {
			bars[i].opacity = 1
		}
	})

	gameManager.onKeyPress("+", () => {
		if (volumeIndex <= 9) {
			bars[volumeIndex].opacity = 1
			volumeIndex++
			volume(volumeIndex / 10)
			tune += 25
		}
		
		play("volumeChange", { detune: tune })
		
		seconds = 0
		bg.opacity = 0.5
		volumeText.opacity = 1
		for(let i = 0; i < 10; i++) {
			bars[i].opacity = 0.1
		}

		for(let i = 0; i < volumeIndex; i++) {
			bars[i].opacity = 1
		}
	})

	gameManager.onUpdate(() => {
		seconds += dt()

		// makes it so everything dissapears
		if (seconds > 0.8) {
			bg.opacity = 0
			volumeText.opacity = 0
			bars.forEach(element => {
				element.opacity = 0
			});
		}
	})

	return gameManager;
}
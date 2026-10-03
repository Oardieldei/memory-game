import { startTimer } from "../sub/timer.js"

let isGameStarted = false

export function clearGame() {
	isGameStarted = false
}

export function runTheGame() {
	if (isGameStarted) return

	isGameStarted = true
	startTimer()
	
}


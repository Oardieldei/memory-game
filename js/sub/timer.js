import { formatTime } from "./getReadableTimer.js"

let timerId = null
let startTime = null

export function startTimer() {
	const counterTime = document.querySelector('.counter__time')
	if (timerId !== null) return

	startTime = Date.now()

	timerId = setInterval(() => {
		const seconds = Math.floor((Date.now() - startTime) / 1000)
		counterTime.textContent = formatTime(seconds)
	}, 1000)
}

export function stopTimer() {
	clearInterval(timerId)
	timerId = null
}

export function resetTimer() {
	const counterTime = document.querySelector('.counter__time')
	stopTimer()

	startTime = null
	counterTime.textContent = '00:00'
}
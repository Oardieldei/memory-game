import {
	startTimer,
	resetTimer
} from "../sub/timer.js"

let isGameStarted = false

export function clearGame() {
	isGameStarted = false

	const cards = document.querySelectorAll('.card__flipped')
	cards.forEach(el => {
		el.classList.remove('card__flipped')
		el.classList.remove('shown')
	})

	const movesItem = document.querySelector('.counter__move')
	movesItem.textContent = 'Ходы: 0'

	resetTimer()
}

export function runTheGame() {
	if (isGameStarted) return

	isGameStarted = true
	startTimer()
}
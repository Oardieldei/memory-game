import { runTheGame } from "./runGame.js"
import { showCard } from "./rotateCard.js"
import { stopTimer } from "../sub/timer.js"

export function clickCard(card) {
	if (card.classList.contains('card__flipped')) return
	if (document.querySelectorAll('.shown').length > 1) return

	runTheGame()

	showCard(card)
	card.classList.add('shown')

	if (document.querySelectorAll('.shown').length === 2) {
		addMove()
		checkPair()
	}
}

function addMove() {
	const movesItem = document.querySelector('.counter__move')
	let moves = +movesItem.textContent.slice(6)
	moves++
	movesItem.textContent = `Ходы: ${moves}`
}

function checkPair() {
	const shownCards = document.querySelectorAll('.shown')

	if (shownCards[0].dataset.card == shownCards[1].dataset.card) {
		shownCards[0].classList.remove('shown')
		shownCards[1].classList.remove('shown')
		checkWin()
	} else {
		setTimeout(() => {
			shownCards[0].classList.remove('card__flipped')
			shownCards[1].classList.remove('card__flipped')
			setTimeout(() => {
				shownCards[0].classList.remove('shown')
				shownCards[1].classList.remove('shown')
			}, 500)
		}, 1000)
	}
}

function checkWin() {
	const flippedCards = document.querySelectorAll('.card__flipped')

	if (flippedCards.length === 16) {
		stopTimer()
	}
}
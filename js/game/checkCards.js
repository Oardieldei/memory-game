import { runTheGame } from "./runGame.js"
import { showCard } from "./rotateCard.js"
import { stopTimer } from "../sub/timer.js"
import { addGame } from "../sub/saving.js"
import { schedule } from "../sub/pendingTimeouts.js"

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
	const movesItemArary = movesItem.textContent.split(' ')
	let moves = +movesItemArary[1]
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
		schedule(() => {
			shownCards[0].classList.remove('card__flipped')
			shownCards[1].classList.remove('card__flipped')
			schedule(() => {
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
		const movesItem = document.querySelector('.counter__move')
		const movesItemArary = movesItem.textContent.split(' ')
		const moves = +movesItemArary[1]

		const counterTime = document.querySelector('.counter__time')
		const time = counterTime.textContent

		addGame(moves, time)
	}
}
import {
	startTimer,
	resetTimer
} from "../sub/timer.js"
import { shuffleCardImages } from "./shuffleImages.js"
import { cancelPending } from "../sub/pendingTimeouts.js"

let isGameStarted = false
let isShuffling = false

export function clearGame() {
	isGameStarted = false
	cancelPending()

	const cards = document.querySelectorAll('.card')
	cards.forEach((el) => {
		el.classList.remove('card__flipped')
		el.classList.remove('shown')
		el.classList.remove('shuffle-stack')
		el.classList.remove('shuffle-move')
	})

	const movesItem = document.querySelector('.counter__move')
	if (movesItem) {
		movesItem.textContent = 'Ходы: 0'
	}

	resetTimer()
}

export function runTheGame() {
	if (isGameStarted) return

	isGameStarted = true
	startTimer()
}

export async function startNewGame() {
	if (isShuffling) return

	clearGame()
	await shuffleAnimation()
}

async function shuffleAnimation() {
	const cardsContainer = document.querySelector('.game__wrapper')
	if (!cardsContainer) return

	const cards = [...cardsContainer.querySelectorAll('.card')]

	isShuffling = true
	cardsContainer.classList.add('shuffling')

	try {
		const containerRect = cardsContainer.getBoundingClientRect()

		const centerX = containerRect.left + containerRect.width / 2
		const centerY = containerRect.top + containerRect.height / 2

		cards.forEach((card) => {
			const cardRect = card.getBoundingClientRect()

			const cardCenterX = cardRect.left + cardRect.width / 2
			const cardCenterY = cardRect.top + cardRect.height / 2

			const offsetX = centerX - cardCenterX
			const offsetY = centerY - cardCenterY

			card.style.setProperty('--shuffle-x', `${offsetX}px`)
			card.style.setProperty('--shuffle-y', `${offsetY}px`)

			const rotation = Math.random() * 10 - 5

			card.style.setProperty(
				'--shuffle-rotate',
				`${rotation}deg`
			)

			card.classList.add('shuffle-stack')
		})

		await wait(400)

		cards.forEach((card) => {
			const offsetX = Math.random() * 30 - 15
			const offsetY = Math.random() * 10 - 5
			const rotation = Math.random() * 20 - 10

			card.style.setProperty(
				'--shuffle-offset-x',
				`${offsetX}px`
			)

			card.style.setProperty(
				'--shuffle-offset-y',
				`${offsetY}px`
			)

			card.style.setProperty(
				'--shuffle-move-rotate',
				`${rotation}deg`
			)

			card.classList.add('shuffle-move')
		})

		await wait(400)

		cards.forEach((card) => {
			card.classList.remove('shuffle-move')
		})

		await wait(250)

		shuffleCardImages()

		cards.forEach((card) => {
			card.classList.remove('shuffle-stack')
		})

		await wait(400)
	} finally {
		cards.forEach((card) => {
			card.classList.remove('shuffle-stack')
			card.classList.remove('shuffle-move')
		})

		cardsContainer.classList.remove('shuffling')
		isShuffling = false
	}
}

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

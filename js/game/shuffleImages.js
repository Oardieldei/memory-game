import { cardsArray } from "../data/cards.js";

function shuffle(arr) {
	for (let i = 0; i < arr.length; i++) {
		const randomIndex = Math.floor(Math.random() * (i + 1))

			;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
	}

	return arr
}

export function shuffleCardImages() {
	const cards = document.querySelectorAll('.card')

	const shuffledCardsImages = shuffle([...cardsArray, ...cardsArray])

	cards.forEach((cardItem, index) => {
		const cardType = shuffledCardsImages[index]
		cardItem.dataset.card = cardType
		cardItem.querySelector('.card__front').textContent = cardType
	})
}

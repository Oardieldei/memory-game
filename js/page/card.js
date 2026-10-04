import { clickCard } from "../game/checkCards.js"

export function createCard() {
	const newCard = document.createElement('div')
	newCard.classList.add('card')

	const cardInner = document.createElement('div')
	cardInner.classList.add('card__inner')
	newCard.append(cardInner)

	const cardBack = document.createElement('div')
	cardBack.classList.add('card__back')
	cardBack.classList.add('card__side')
	cardBack.textContent = '❓'
	cardInner.append(cardBack)

	const cardFront = document.createElement('div')
	cardFront.classList.add('card__front')
	cardFront.classList.add('card__side')
	cardInner.append(cardFront)

	newCard.addEventListener('click', () => {
		clickCard(newCard)
	})

	return newCard
}
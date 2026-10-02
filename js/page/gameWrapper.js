import { createCard } from "./card.js"

const dificulty = 16

export function createGameWrapper() {
	const mainItem = document.createElement('main')
	mainItem.classList.add('main')

	mainItem.append(createGame())
	mainItem.append(createCounters())

	return mainItem
}

function createGame() {
	const gameWrapper = document.createElement('div')
	gameWrapper.classList.add('game__wrapper')

	for (let i = 0; i < dificulty; i++) {
		gameWrapper.append(createCard())
	}

	return gameWrapper
}

function createCounters() {
	const countersWrapper = document.createElement('div')
	countersWrapper.classList.add('counters__wrapper')

	const createMoveCounter = document.createElement('span')
	createMoveCounter.classList.add('counter__move')
	createMoveCounter.classList.add('counter')
	createMoveCounter.textContent = 'Ходы: 0'
	countersWrapper.append(createMoveCounter)

	const createTimeCounter = document.createElement('span')
	createTimeCounter.classList.add('counter__time')
	createTimeCounter.classList.add('counter')
	countersWrapper.append(createTimeCounter)

	return countersWrapper
}
import { createGameData, loadResults } from "../sub/saving.js"
import { startNewGame } from "../game/runGame.js"

export function createModal() {
	const modalWrapper = document.createElement('div')
	modalWrapper.classList.add('modal__wrapper')
	modalWrapper.append(createModalWindow())

	modalWrapper.addEventListener('click', (e) => {
		if (e.target === modalWrapper) {
			closeModal()
		}
	})

	return modalWrapper
}

function createModalWindow() {
	const modalWrapperWindow = document.createElement('div')
	modalWrapperWindow.classList.add('modal__window')

	return modalWrapperWindow
}

export function showResults() {
	const modalWrapper = document.querySelector('.modal__wrapper')
	const modalWrapperWindow = modalWrapper.querySelector('.modal__window')
	modalWrapperWindow.replaceChildren()

	const resultsItem = document.querySelector('.counters__wrapper')
	const movesItem = resultsItem.querySelector('.counter__move')
	const movesItemArary = movesItem.textContent.split(' ')
	let moves = +movesItemArary[1]
	const counterTime = resultsItem.querySelector('.counter__time').textContent

	const resultsHeader = document.createElement('h1')
	resultsHeader.classList.add('results__header')
	resultsHeader.textContent = 'Успех!'
	modalWrapperWindow.append(resultsHeader)

	const resultsFlex = document.createElement('div')
	resultsFlex.classList.add('results__all')
	modalWrapperWindow.append(resultsFlex)

	const resultObj = createGameData(moves, counterTime)

	resultsFlex.append(createResultItem('Ходы', resultObj.moves))
	resultsFlex.append(createResultItem('Время', resultObj.time))
	resultsFlex.append(createResultItem('Дата', resultObj.date))

	modalWrapperWindow.append(createResultsNewGmeBtn())
	modalWrapperWindow.append(createResultsCloseBtn())

	openModal()
}

export function showScores() {
	const modalWrapper = document.querySelector('.modal__wrapper')
	const modalWrapperWindow = modalWrapper.querySelector('.modal__window')
	modalWrapperWindow.replaceChildren()

	const scoresHeader = document.createElement('h1')
	scoresHeader.classList.add('scores__header')
	scoresHeader.textContent = 'Таблица лидеров'
	modalWrapperWindow.append(scoresHeader)

	const results = loadResults()
		.sort(compareResults)
		.slice(0, 10)

	if (results.length === 0) {
		const emptyMessage = document.createElement('p')
		emptyMessage.classList.add('scores__empty')
		emptyMessage.textContent = 'Пока нет результатов'
		modalWrapperWindow.append(emptyMessage)
	} else {
		modalWrapperWindow.append(createScoresTable(results))
	}

	modalWrapperWindow.append(createResultsCloseBtn())

	openModal()
}

function compareResults(a, b) {
	if (a.moves !== b.moves) {
		return a.moves - b.moves
	}

	return parseDate(a.date) - parseDate(b.date)
}

function parseDate(date) {
	const [day, month, year] = date.split('.').map(Number)
	return new Date(year, month - 1, day).getTime()
}

function createScoresTable(results) {
	const table = document.createElement('table')
	table.classList.add('scores__table')

	const headRow = document.createElement('tr')
	headRow.append(createTableCell('th', 'Место'))
	headRow.append(createTableCell('th', 'Ходы'))
	headRow.append(createTableCell('th', 'Дата'))

	const head = document.createElement('thead')
	head.append(headRow)
	table.append(head)

	const body = document.createElement('tbody')
	results.forEach((result, index) => {
		const row = document.createElement('tr')
		row.append(createTableCell('td', index + 1))
		row.append(createTableCell('td', result.moves))
		row.append(createTableCell('td', result.date))
		body.append(row)
	})
	table.append(body)

	return table
}

function createTableCell(tag, text) {
	const cell = document.createElement(tag)
	cell.textContent = text

	return cell
}

function createResultItem(text, result) {
	const newResultItem = document.createElement('p')
	newResultItem.classList.add('result__item')
	newResultItem.textContent = `${text}: ${result}`

	return newResultItem
}

function createResultsNewGmeBtn() {
	const newGameButton = document.createElement('div')
	newGameButton.classList.add('modal__results_btn')
	newGameButton.classList.add('modal__results_btn__newgame')
	newGameButton.textContent = 'Новая игра'

	newGameButton.addEventListener('click', () => {
		closeModal()
		startNewGame()
	})

	return newGameButton
}

function createResultsCloseBtn() {
	const closeButton = document.createElement('div')
	closeButton.classList.add('modal__results_btn')
	closeButton.classList.add('modal__results_btn__close')
	closeButton.textContent = 'Закрыть'

	closeButton.addEventListener('click', () => {
		closeModal()
	})

	return closeButton
}

function openModal() {
	document.querySelector('.modal__wrapper').classList.add('modal__opened')
}

function closeModal() {
	document.querySelector('.modal__wrapper').classList.remove('modal__opened')
}
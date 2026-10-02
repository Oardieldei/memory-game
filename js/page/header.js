export function createHeader() {
	const headerItem = document.createElement('header')
	headerItem.classList.add('header')

	headerItem.append(createNewGameBtn())
	headerItem.append(createScoresBtn())

	return headerItem
}

function createNewGameBtn() {
	const newGameBtn = document.createElement('div')
	newGameBtn.classList.add('header__btn_newgame')
	newGameBtn.classList.add('header__btn')
	newGameBtn.textContent = 'Новая игра'

	return newGameBtn
}

function createScoresBtn() {
	const scoresBtn = document.createElement('div')
	scoresBtn.classList.add('header__btn_scores')
	scoresBtn.classList.add('header__btn')
	scoresBtn.textContent = 'Таблица лидеров'

	return scoresBtn
}
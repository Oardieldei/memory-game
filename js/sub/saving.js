export function addGame(moves, time) {
	let results
	if (localStorage.getItem('memoryGameTop')) {
		results = JSON.parse(localStorage.getItem('memoryGameTop'))
	} else {
		results = []
	}

	results.push(createGameData(moves, time))
	results.sort((a, b) => a.moves - b.moves)
	if (results.length > 10) {
		results.pop()
	}

	localStorage.setItem('memoryGameTop', JSON.stringify(results))
}

export function loadResults() {
	if (localStorage.getItem('memoryGameTop')) {
		return JSON.parse(localStorage.getItem('memoryGameTop'))
	}
	return []
}

function createGameData(moves, time) {
	const date = new Date().toLocaleDateString('ru-RU')

	if (time.length < 6) {
		time = '00:' + time
	}

	return {
		moves,
		time,
		date
	}
}
export function formatTime(time) {
	const hours = Math.floor(time / 3600)
	const minutes = Math.floor((time % 3600) / 60)
	const seconds = time % 60

	const pad = (num) => {
		String(num).padStart(2, '0')
	}

	if (minutes < 1) {
		return `00:${pad(seconds)}`
	}

	if (minutes < 10) {
		return `${pad(minutes)}:${pad(seconds)}`
	}

	return `${hours}:${pad(minutes)}:${pad(seconds)}`
}
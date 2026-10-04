import { createWrapper } from "./wrapper.js"
import { createHeader } from "./header.js"
import { createGameWrapper } from "./gameWrapper.js"
import { shuffleCardImages } from "../game/shuffleImages.js"
import { createModal } from "../modal/createModal.js"

export function createPage() {
	const fullWrapper = createWrapper()
	document.body.append(fullWrapper)

	fullWrapper.append(createHeader())
	fullWrapper.append(createModal())
	fullWrapper.append(createGameWrapper())
	shuffleCardImages()
}
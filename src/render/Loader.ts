import FieldState from "../state/Field"
import { createField, createTile } from "./Field"

export function renderGame() {
    const gameContainer = document.querySelector('#game-container')

    if (gameContainer.innerHTML) {
        gameContainer.innerHTML = ''
    }

    gameContainer.append(loadField())
}

export function loadField() {
    const field = FieldState.getField()
    const fieldElement = createField()

    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            fieldElement.append(createTile(x, y))
        }
    }

    return fieldElement
}

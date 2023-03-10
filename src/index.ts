import Staging from "./engine/Staging"
import Movement from "./engine/Movement"
import PlayerState from "./state/Player"
import { renderGame } from "./render/Loader"

startGame()

document.onkeydown = function (event: KeyboardEvent) {
    const player = PlayerState.get()
    const direction = Movement.determineDirection(event)
    Movement.move(player, direction)
    // enemies.forEach(enemy => Movement.move(enemy, direction))

    renderGame()
}

function startGame() {
    const level1 = new Staging(1)
    PlayerState.init();
    const enemies = level1.getEnemies()
    renderGame()
}

// TODO: every time the players moves all warriors move
// TODO: weaker enemies go in the opposite direction
// TODO: stronger enemies go in player's direction
// TODO: one fight takes one move
// TODO: after 5 sec enemies move weather the player has moved or not
// TODO: if weaker enemies reach the opposite border move in a random direction
// TODO: consider range of one square to the attacks
// maintain direction until cornered

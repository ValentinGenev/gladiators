import Staging from "./engine/Staging"
import Movement from "./engine/Movement"

const level1 = new Staging(1)
const player = level1.getPlayer()
const enemies = level1.getEnemies()

document.onkeydown = function (event: KeyboardEvent) {
    const direction = Movement.detectControl(event)
    Movement.move(player, direction)
}

// TODO: every time the players moves all warriors move
// TODO: weaker enemies go in the opposite direction
// TODO: stronger enemies go in player's direction
// TODO: one fight takes one move
// TODO: after 5 sec enemies move weather the player has moved or not
// TODO: if weaker enemies reach the opposite border move in a random direction
// maintain direction until cornered

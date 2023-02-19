import Equipment from "../objects/Equipment"
import FieldState from "../state/Field"
import Gladiator from "../objects/Gladiator"
import { getRandomNumber } from "../utilities/random-generator"

export default class Staging {
    private level: number
    private enemies: Gladiator[] = []

    constructor(level: number) {
        this.level = level
        this.populateWithGladiators()
    }

    getEnemies() {
        return this.enemies
    }

    private populateWithGladiators() {
        for (let i = 0; i < this.level; i++) {
            this.setEnemyPosition(i + 1, i)
            this.setEnemyPosition(i, i + 1)
            this.setEnemyPosition(i + 1, i + 1)
        }
    }

    private setEnemyPosition(weapon: number, armor: number) {
        const row = getRandomNumber(0, FieldState.getRows())
        const column = getRandomNumber(0, FieldState.getColumns())
        const tile = FieldState.getFreeTile(row, column)
        const gladiator =
            new Gladiator(new Equipment(weapon, armor), tile, false)

        tile.setContent(gladiator)
        this.enemies.push(gladiator)
    }
}

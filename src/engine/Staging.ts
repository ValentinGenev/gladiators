import Equipment from "../objects/Equipment"
import FieldState from "../state/Field"
import Gladiator from "../objects/Gladiator"

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
        const tile = FieldState.getRandomFreeTile()
        const gladiator =
            new Gladiator(new Equipment(weapon, armor), tile)

        tile.setContent(gladiator)
        this.enemies.push(gladiator)
    }
}

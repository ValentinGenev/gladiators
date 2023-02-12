import Equipment from "../objects/Equipment"
import Field from "../objects/Field"
import Gladiator from "../objects/Gladiator"

export default class Staging {
    private level: number
    private player: Gladiator
    private enemies: Gladiator[] = []

    constructor(level: number) {
        this.level = level

        if (level === 1) {
            this.setGladiatorPosition(1, 1, true)
        }
        this.populateWithGladiators()
    }

    getPlayer() {
        return this.player
    }

    getEnemies() {
        return this.enemies
    }

    private populateWithGladiators() {
        for (let i = 0; i < this.level; i++) {
            this.setGladiatorPosition(i + 1, i)
            this.setGladiatorPosition(i, i + 1)
            this.setGladiatorPosition(i + 1, i + 1)
        }
    }

    private setGladiatorPosition(weapon: number, armor: number, isPlayer = false) {
        const row = this.getRandomNumber(0, Field.getRows())
        const column = this.getRandomNumber(0, Field.getColumns())

        let tile
        do {
            tile = Field.getTile(row, column)
        } while (tile.getContent());

        const gladiator =
            new Gladiator(new Equipment(weapon, armor), tile, isPlayer)
        tile.setContent(gladiator)

        if (isPlayer) {
            this.player = gladiator
        }
        else {
            this.enemies.push(gladiator)
        }
    }

    private getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min)
    }
}

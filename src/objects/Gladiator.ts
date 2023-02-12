import Fighting from "../engine/Fighting"
import FieldObject from "../interfaces/FieldObject"
import Equipment from "./Equipment"
import Tile from "./Tile"

export default class Gladiator extends Fighting implements FieldObject {
    private tile: Tile
    private isPlayer: boolean
    private isDead = false

    constructor(equipment: Equipment, tile: Tile, isPlayer = false) {
        super(equipment)
        this.tile = tile
        this.isPlayer = isPlayer
    }

    setTile(tile: Tile) {
        this.tile = tile
    }

    getTile() {
        return this.tile
    }

    checkIfPlayer() {
        return this.isPlayer
    }

    checkIfDead() {
        return this.isDead
    }

    kill() {
        this.isDead = true
    }
}

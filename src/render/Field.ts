import Gladiator from "../objects/Gladiator"
import Tile from "../objects/Tile"
import FieldState from "../state/Field"

export function createField() {
    const field = document.createElement('div')
    field.className = 'field'
    field.style.gridTemplateColumns =
        `repeat(${FieldState.getColumns()}, min-content)`
    field.style.gridTemplateRows =
        `repeat(${FieldState.getRows()}, min-content)`
    return field
}

export function createTile(x: number, y:number) {
    const tile = document.createElement('div')
    tile.className = `tile x-${x} y-${y}`
    tile.classList.add(getTileType(FieldState.getTile(y, x)))
    return tile
}

export function getTileType(tile: Tile) {
    const tileContent = tile.getContent()

    if (tileContent instanceof Gladiator) {
        if (tileContent.checkIfDead()) {
            return 'dead'
        }

        if (tileContent.checkIfPlayer()) {
            return 'player'
        }

        return 'enemy'
    }

    return 'empty'
}

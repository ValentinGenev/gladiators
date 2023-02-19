import FieldObject from "../interfaces/FieldObject"
import FieldState from "../state/Field"

export default class Movement {
    static KEY_VECTOR_MAP: Record<string, number[]> = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1]
    }

    static determineDirection(keyEvent: KeyboardEvent) {
        if (Object.keys(this.KEY_VECTOR_MAP).includes(keyEvent.key)) {
            return this.KEY_VECTOR_MAP[keyEvent.key]
        }
        return [0, 0]
    }

    static move(object: FieldObject, direction: number[]) {
        const { row: currentRow, column: currentColumn } = object.getTile();
        const currentTile = FieldState.getTile(currentRow, currentColumn)
        const targetTile = FieldState.getTile(currentRow + direction[0], currentColumn + direction[1])

        if (targetTile) {
            targetTile.setContent(object)
            object.setTile(targetTile)
            currentTile.setContent(null)
        }
    }
}

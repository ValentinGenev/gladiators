import FieldObject from "../interfaces/FieldObject"
import Field from "../objects/Field"

const KEY_VECTOR_MAP: Record<string, number[]> = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1]
}

export default class Movement {
    static detectControl(keyEvent: KeyboardEvent) {
        if (Object.keys(KEY_VECTOR_MAP).includes(keyEvent.key)) {
            return KEY_VECTOR_MAP[keyEvent.key]
        }
        return [0 ,0]
    }

    static move(object: FieldObject, direction: number[]) {
        const { row: currentRow, column: currentColumn } = object.getTile();
        const currentTile = Field.getTile(currentRow, currentColumn)
        const targetTile = Field.getTile(currentRow + direction[0], currentColumn + direction[1])

        if (targetTile) {
            targetTile.setContent(object)
            object.setTile(targetTile)
            currentTile.setContent(null)
        }
    }
}

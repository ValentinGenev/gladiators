import FieldObject from "../interfaces/FieldObject"

export default class Tile {
    row: number
    column: number
    private content: FieldObject | null

    constructor(row: number, column: number) {
        this.row = row
        this.column = column
        this.content = null
    }

    setContent(content: FieldObject | null) {
        this.content = content
    }

    getContent() {
        return this.content
    }
}

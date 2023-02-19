import Tile from "../objects/Tile"

const ROWS = 15;
const COLUMNS = 15;

export default class FieldState {
    private static rows: number = ROWS
    private static columns: number = COLUMNS
    private static field: Tile[][]

    private constructor() { }

    public static getField() {
        if (!FieldState.field) {
            FieldState.field = this.create(this.rows, this.columns)
        }

        return FieldState.field
    }

    static getRows() {
        return FieldState.rows
    }

    static getColumns() {
        return FieldState.columns
    }

    static getTile(row: number, column: number) {
        try {
            return FieldState.getField()[row][column]
        } catch (error) {
            return null
        }
    }

    static getFreeTile(row: number, column: number) {
        let tile
        do {
            tile = FieldState.getTile(row, column)
        } while (tile.getContent())

        return tile
    }

    private static create(rowsCount: number, columnsCount: number) {
        const field = new Array(rowsCount)

        for (let row = 0; row < rowsCount; row++) {
            field[row] = new Array(columnsCount)

            for (let column = 0; column < columnsCount; column++) {
                field[row][column] = new Tile(row, column)
            }
        }

        return field
    }
}

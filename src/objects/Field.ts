import Tile from "./Tile"

const ROWS = 15;
const COLUMNS = 15;

export default class Field {
    private static rows: number = ROWS
    private static columns: number = COLUMNS
    private static field: Tile[][]

    private constructor() { }

    public static getField() {
        if (!Field.field) {
            Field.field = this.create(this.rows, this.columns)
        }

        return Field.field
    }

    static getRows() {
        return Field.rows
    }

    static getColumns() {
        return Field.columns
    }

    static getTile(row: number, column: number) {
        try {
            return Field.getField()[row][column]
        } catch (error) {
            return null
        }
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

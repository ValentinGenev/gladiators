import Equipment from "../objects/Equipment";
import FieldState from "./Field";
import Gladiator from "../objects/Gladiator";
import { getRandomNumber } from "../utilities/random-generator";

export default class PlayerState {
    private static state: Gladiator

    private constructor() { }

    static init() {
        if (!PlayerState.state) {
            PlayerState.state = PlayerState.create()
        }
    }

    static get() {
        PlayerState.init()
        return PlayerState.state
    }

    private static create() {
        const row = getRandomNumber(0, FieldState.getRows())
        const column = getRandomNumber(0, FieldState.getColumns())
        const tile = FieldState.getFreeTile(row, column)
        const gladiator =
            new Gladiator(new Equipment(1, 1), tile, false)

        tile.setContent(gladiator)

        return gladiator
    }
}

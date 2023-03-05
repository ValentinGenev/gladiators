import Equipment from "../objects/Equipment";
import FieldState from "./Field";
import Gladiator from "../objects/Gladiator";

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
        const tile = FieldState.getRandomFreeTile()
        const gladiator =
            new Gladiator(new Equipment(1, 1), tile, true)

        tile.setContent(gladiator)

        return gladiator
    }
}

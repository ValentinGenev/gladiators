import FieldObject from "../interfaces/FieldObject";
import Movement from "./Movement";

export default class EnemyMovement extends Movement {
    static chaseOrFlee(object: FieldObject, direction: number[]) {

    }

    static determineOppositeDirection(keyEvent: KeyboardEvent): number[] {
        const [y, x] = this.determineDirection(keyEvent)
        return [y * -1, x * -1];
    }
}

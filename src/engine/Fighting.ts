import Gladiator from "../objects/Gladiator"
import Equipment from "../objects/Equipment"

export enum Outcome {
    Win,
    Lose,
    Tie
}

export default class Fighting {
    private equipment: Equipment

    constructor(equipment: Equipment) {
        this.equipment = equipment
    }

    getEquipment() {
        return this.equipment
    }

    fight(target: Gladiator) {
        const targetEquipment = target.getEquipment()
        const outcome = this.determineOutcome(
            targetEquipment.getWeapon() + targetEquipment.getArmor())
        this.equipment.change(target, outcome)
        // TODO: figure where to call targe.kill() if won
        return outcome
    }

    private determineOutcome(competitorStats: number) {
        const yourStats = this.equipment.getWeapon() + this.equipment.getArmor()

        if (yourStats > competitorStats) {
            return Outcome.Win
        }
        else if (yourStats > competitorStats) {
            return Outcome.Lose
        }
        else {
            return Outcome.Tie
        }
    }
}

import Gladiator from "./Gladiator"
import { Outcome } from "../engine/Fighting"

export default class Equipment {
    private weapon: number
    private armor: number

    constructor(weapon: number, armor: number) {
        this.weapon = weapon
        this.armor = armor
    }

    getWeapon() {
        return this.weapon
    }

    setWeapon(points: number) {
        this.weapon = points
    }

    getArmor() {
        return this.armor
    }

    setArmor(points: number) {
        this.armor = points
    }

    change(target: Gladiator, outcome: Outcome) {
        const selfWeapon = this.getWeapon()
        const selfArmor = this.getArmor()
        const targetEquipment = target.getEquipment()
        const targetWeapon = targetEquipment.getWeapon()
        const targetArmor = targetEquipment.getArmor()

        switch (outcome) {
            case Outcome.Win:
                if (selfWeapon < targetWeapon) {
                    this.setWeapon(targetWeapon)
                }
                if (selfArmor < targetArmor) {
                    this.setArmor(targetArmor)
                }
                break

            case Outcome.Tie:
                this.setWeapon(selfWeapon - 1)
                this.setArmor(selfArmor - 1)
                targetEquipment.setWeapon(targetWeapon - 1)
                targetEquipment.setArmor(targetArmor - 1)
                break
        }
    }
}

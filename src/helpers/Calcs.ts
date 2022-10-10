import { AttackType } from '../contexts/Map'

export const CalculateDistance = (village1: number[], village2: number[]) => {
    let x = village1[0] - village2[0]
    let y = village1[1] - village2[1]
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

export const CalculateDuration = (distance: number, type: AttackType) => {
    if (type == AttackType.Snob) {
        if (distance < 42) return new Date(Date.now() + distance * 35 * 60 * 1000 - Date.now()).toISOString().slice(11, -5)
        else {
            let days = Math.floor(distance / 42)
            return `${days}d ${new Date(Date.now() + distance * 35 * 60 * 1000 - Date.now()).toISOString().slice(11, -5)}`
        }
    } else {
        if (distance < 48) return new Date(Date.now() + distance * 30 * 60 * 1000 - Date.now()).toISOString().slice(11, -5)
        else {
            let days = Math.floor(distance / 48)
            return `${days}d ${new Date(Date.now() + distance * 30 * 60 * 1000 - Date.now()).toISOString().slice(11, -5)}`
        }
    }
}

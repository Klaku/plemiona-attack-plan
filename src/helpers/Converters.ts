import { IPlayer } from '../types/IPlayer'
import { ITribe } from '../types/ITribe'
import { IVillage } from '../types/IVillage'

export const PlayerConverter = (row: string): IPlayer => {
    let cells = row.split(',').map((cell) => {
        return decodeURIComponent(cell.trim().replace(/\+/gm, ' '))
    })
    return {
        player_id: cells[0],
        player_id_num: Number(cells[0]),
        name: cells[1],
        tribe_id: cells[2],
        tribe_id_num: Number(cells[2]),
        villages: cells[3],
        villages_num: Number(cells[3]),
        points: cells[4],
        points_num: Number(cells[4]),
        rank: cells[5],
        rank_num: Number(cells[5]),
    }
}

export const TribeConverter = (row: string): ITribe => {
    let cells = row.split(',').map((cell) => {
        return decodeURIComponent(cell.trim().replace(/\+/gm, ' '))
    })
    return {
        tribe_id: cells[0],
        tribe_id_num: Number(cells[0]),
        name: cells[1],
        tag: cells[2],
        members: cells[3],
        members_num: Number(cells[3]),
        villages: cells[4],
        villages_num: Number(cells[4]),
        points: cells[5],
        points_num: Number(cells[5]),
        all_points: cells[6],
        all_points_num: Number(cells[6]),
        rank: cells[7],
        rank_num: Number(cells[7]),
    }
}

export const VillageConverter = (row: string): IVillage => {
    let cells = row.split(',').map((cell) => {
        return decodeURIComponent(cell.trim().replace(/\+/gm, ' '))
    })
    return {
        village_id: cells[0],
        village_id_num: Number(cells[0]),
        name: cells[1],
        x: cells[2],
        x_num: Number(cells[2]),
        y: cells[3],
        y_num: Number(cells[3]),
        player_id: cells[4],
        player_id_num: Number(cells[4]),
        points: cells[5],
        points_num: Number(cells[5]),
        rank: cells[6],
        rank_num: Number(cells[6]),
    }
}
export interface IVillage {
    village_id: string
    village_id_num: number
    name: string
    x: string
    x_num: number
    y: string
    y_num: number
    player_id: string
    player_id_num: number
    points: string
    points_num: number
    rank: string
    rank_num: number
}

export interface ISelectedVillage extends IVillage {
    color: string
}

export interface ITribe {
    tribe_id: string
    tribe_id_num: number
    name: string
    tag: string
    members: string
    members_num: number
    villages: string
    villages_num: number
    points: string
    points_num: number
    all_points: string
    all_points_num: number
    rank: string
    rank_num: number
}

export interface ISelectedTribe extends ITribe {
    color: string
}

import React, { PropsWithChildren, useState } from 'react'
import { IPlayer } from '../types/IPlayer'
import { IVillage } from '../types/IVillage'

export enum OperationType {
    Fake = 0,
    Atak = 1,
    Szlachta = 2,
}

export interface ITarget {
    source: {
        player: IPlayer
        village: IVillage
    }
    target: {
        player: IPlayer
        village: IVillage
    }
    dateSend: Date
    dateApproach: Date
    OperationType: OperationType
    Id: number
}

export interface IPlanerContext {
    operationType: OperationType
    setOperationType: (value: OperationType) => void
    items: ITarget[]
    setItems: (items: ITarget[]) => void
    activeTarget: {
        player: IPlayer
        village: IVillage
    } | null
    setActiveTarget: (value: { player: IPlayer; village: IVillage } | null) => void
    updateDate: (value: Date, id: number) => void
}

const defaultContext: IPlanerContext = {
    operationType: OperationType.Fake,
    setOperationType: () => {},
    items: [],
    setItems: () => {},
    activeTarget: null,
    setActiveTarget: () => {},
    updateDate: () => {},
}

export const PlanerContext = React.createContext(defaultContext)

export const PlanerContextProvider = (props: PropsWithChildren<{}>) => {
    const [items, setItems] = useState([] as ITarget[])
    const [operationType, setOperationType] = useState(OperationType.Fake)
    const [activeTarget, setActiveTarget] = useState(
        null as {
            player: IPlayer
            village: IVillage
        } | null
    )
    const UpdateDate = (date: Date, id: number) => {
        setItems(
            items.map((x) => {
                if (x.Id == id) {
                    x.dateApproach = date
                    x.dateSend = CalculateSendTime(x)
                }
                return x
            })
        )
    }
    return <PlanerContext.Provider value={{ items, setItems, activeTarget, setActiveTarget, operationType, setOperationType, updateDate: UpdateDate }}>{props.children}</PlanerContext.Provider>
}

export const CalculateSendTime = (item: ITarget) => {
    let tempo = item.OperationType == OperationType.Szlachta ? 35 : 30
    let dystansX = item.source.village.x_num - item.target.village.x_num
    let dystansY = item.source.village.y_num - item.target.village.y_num
    let dystans = Math.sqrt(Math.pow(dystansX, 2) + Math.pow(dystansY, 2))
    return new Date(Math.floor(item.dateApproach.getTime() - tempo * 60 * 1000 * dystans))
}
export const CalculateDuration = (village1: IVillage, village2: IVillage, operation: OperationType) => {
    let tempo = operation == OperationType.Szlachta ? 35 : 30
    let dystansX = village1.x_num - village2.x_num
    let dystansY = village1.y_num - village2.y_num
    let dystans = Math.sqrt(Math.pow(dystansX, 2) + Math.pow(dystansY, 2))
    return new Date(Math.floor(tempo * 60 * 1000 * dystans)).toISOString().slice(11, -5)
}

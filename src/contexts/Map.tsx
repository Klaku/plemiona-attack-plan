import React, { PropsWithChildren, useState } from 'react'
import { IVillageData } from '../types/IVillage'

export interface IMapContext {
    key: [value: number, setValue: (items: number) => void]
    selectedVillage: [value: IVillageData | null, setValue: (value: IVillageData | null) => void]
    isPlaningPhase: [value: boolean, setValue: (value: boolean) => void]
    plans: [value: IPlan[], setValue: (value: IPlan[]) => void]
}

export const deafult_context: IMapContext = {
    key: [0, () => {}],
    selectedVillage: [null, () => {}],
    isPlaningPhase: [false, () => {}],
    plans: [[], () => {}],
}

export const MapContext = React.createContext(deafult_context)

export const MapContextProvider = (props: PropsWithChildren<{}>) => {
    const value: IMapContext = {
        key: useState(0),
        selectedVillage: useState(null as IVillageData | null),
        isPlaningPhase: useState(false),
        plans: useState([] as IPlan[]),
    }
    return <MapContext.Provider value={value}>{props.children}</MapContext.Provider>
}

export interface IPlan {
    target: IVillageData
    source: IVillageData
    order: number
    id: number
    type: AttackType
}

export enum AttackType {
    Fake = 0,
    Off = 1,
    Snob = 2,
}

export const AttackTypeDescription = (prop: AttackType) => {
    return prop == AttackType.Fake ? 'Fake' : prop == AttackType.Off ? 'Off' : 'Szlachta'
}

export const AttackTypeColor = (prop: AttackType) => {
    return prop == AttackType.Fake ? '#00000025' : prop == AttackType.Off ? '#00ff0025' : '#ff000025'
}

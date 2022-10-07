import React, { PropsWithChildren, useState } from 'react'
import { IVillageData } from '../types/IVillage'

export interface IMapContext {
    key: [value: number, setValue: (items: number) => void]
    selectedVillage: [value: IVillageData | null, setValue: (value: IVillageData | null) => void]
    isPlaningPhase: [value: boolean, setValue: (value: boolean) => void]
}

export const deafult_context: IMapContext = {
    key: [0, () => {}],
    selectedVillage: [null, () => {}],
    isPlaningPhase: [false, () => {}],
}

export const MapContext = React.createContext(deafult_context)

export const MapContextProvider = (props: PropsWithChildren<{}>) => {
    const value: IMapContext = {
        key: useState(0),
        selectedVillage: useState(null as IVillageData | null),
        isPlaningPhase: useState(false),
    }
    return <MapContext.Provider value={value}>{props.children}</MapContext.Provider>
}

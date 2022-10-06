import React, { PropsWithChildren, useState } from 'react'
import { ISelectedTribe } from '../types/ITribe'
import { ISelectedVillage, IVillage } from '../types/IVillage'

export interface IFilterContext {
    tribes: [items: ISelectedTribe[], setItems: (items: ISelectedTribe[]) => void]
    offensiveVillages: [items: IVillage[], setItems: (items: IVillage[]) => void]
    offensiveVillagesColor: [color: string, setColor: (value: string) => void]
    targetVillages: [items: IVillage[], setItems: (items: IVillage[]) => void]
    targetVillagesColor: [color: string, setColor: (value: string) => void]
}

export const default_context: IFilterContext = {
    tribes: [[], () => {}],
    offensiveVillages: [[], () => {}],
    offensiveVillagesColor: ['#ff0', () => {}],
    targetVillages: [[], () => {}],
    targetVillagesColor: ['#0ff', () => {}],
}

export const FilterContext = React.createContext(default_context)

export const FilterContextProvider = (props: PropsWithChildren<{}>) => {
    const value = {
        tribes: useState([] as ISelectedTribe[]),
        offensiveVillages: useState([] as IVillage[]),
        offensiveVillagesColor: useState('#ff0'),
        targetVillages: useState([] as IVillage[]),
        targetVillagesColor: useState('#0ff'),
    }
    return <FilterContext.Provider value={value}>{props.children}</FilterContext.Provider>
}

import React, { PropsWithChildren, useState } from 'react'
import { IPlayer } from '../types/IPlayer'
import { ITribe } from '../types/ITribe'
import { IVillage } from '../types/IVillage'

export interface IDataContext {
    tribe: [items: ITribe[], setItems: (items: ITribe[]) => void]
    player: [items: IPlayer[], setItems: (items: IPlayer[]) => void]
    village: [items: IVillage[], setItems: (items: IVillage[]) => void]
}

export const deafult_context: IDataContext = {
    tribe: [[], () => {}],
    player: [[], () => {}],
    village: [[], () => {}],
}

export const DataContext = React.createContext(deafult_context)

export const DataContextProvider = (props: PropsWithChildren<{}>) => {
    const value: IDataContext = {
        tribe: useState([] as ITribe[]),
        player: useState([] as IPlayer[]),
        village: useState([] as IVillage[]),
    }
    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}

import React, { PropsWithChildren, useState } from 'react'
import { IPlayer } from '../types/IPlayer'
import { ITribe } from '../types/ITribe'
import { IVillage } from '../types/IVillage'

export interface IDataContext {
    player: IEntityContext
    tribe: IEntityContext
    village: IEntityContext
}
export interface IEntityContext {
    items: IPlayer[] | ITribe[] | IVillage[]
    setItems: (value: any[]) => void
}

const defaultContext: IDataContext = {
    player: { items: [] as IPlayer[], setItems: () => {} },
    tribe: { items: [] as ITribe[], setItems: () => {} },
    village: { items: [] as IVillage[], setItems: () => {} },
}

export const DataContext = React.createContext(defaultContext)

export const DataContextProvider = (props: PropsWithChildren<{}>) => {
    const [players, setPlayers] = useState([] as IPlayer[])
    const [tribes, setTribes] = useState([] as ITribe[])
    const [villages, setVillages] = useState([] as IVillage[])
    return (
        <DataContext.Provider
            value={{
                player: { items: players, setItems: setPlayers },
                tribe: { items: tribes, setItems: setTribes },
                village: { items: villages, setItems: setVillages },
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

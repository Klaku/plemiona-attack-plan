import React, { PropsWithChildren, useState } from 'react'

export interface IVillageContext {
    items: IVillage[]
    setItems: (value: IVillage[]) => void
}

export interface IVillage {
    village_id: string
    name: string
    x: string
    y: string
    player_id: string
    points: string
    rank: string
}

const defaultContextObject: IVillageContext = {
    items: [],
    setItems: () => {},
}

export const VillageContext = React.createContext(defaultContextObject)

export const VillageContextProvider = (props: PropsWithChildren<{}>) => {
    const [items, setItems] = useState([] as IVillage[])
    return (
        <VillageContext.Provider
            value={{
                items: items,
                setItems: setItems,
            }}
        >
            {props.children}
        </VillageContext.Provider>
    )
}

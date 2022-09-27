import React, { PropsWithChildren, useState } from 'react'

export interface IPlayerContext {
    items: IPlayer[]
    setItems: (value: IPlayer[]) => void
}

export interface IPlayer {
    player_id: string
    name: string
    tribe_id: string
    villages: string
    points: string
    rank: string
}

const defaultContextObject: IPlayerContext = {
    items: [],
    setItems: () => {},
}

export const PlayerContext = React.createContext(defaultContextObject)

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
    const [items, setItems] = useState([] as IPlayer[])
    return (
        <PlayerContext.Provider
            value={{
                items: items,
                setItems: setItems,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}

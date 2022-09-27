import React, { PropsWithChildren, useState } from 'react'

export interface ITribeContext {
    items: ITribe[]
    setItems: (value: ITribe[]) => void
}

export interface ITribe {
    tribe_id: string
    name: string
    tag: string
    members: string
    villages: string
    points: string
    all_points: string
    rank: string
}

const defaultContextObject: ITribeContext = {
    items: [],
    setItems: () => {},
}

export const TribeContext = React.createContext(defaultContextObject)

export const TribeContextProvider = (props: PropsWithChildren<{}>) => {
    const [items, setItems] = useState([] as ITribe[])
    return (
        <TribeContext.Provider
            value={{
                items: items,
                setItems: setItems,
            }}
        >
            {props.children}
        </TribeContext.Provider>
    )
}

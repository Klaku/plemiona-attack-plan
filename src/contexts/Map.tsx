import React, { PropsWithChildren, useState } from 'react'

export interface IMapContext {
    key: [value: number, setValue: (items: number) => void]
}

export const deafult_context: IMapContext = {
    key: [0, () => {}],
}

export const MapContext = React.createContext(deafult_context)

export const MapContextProvider = (props: PropsWithChildren<{}>) => {
    const value: IMapContext = {
        key: useState(0),
    }
    return <MapContext.Provider value={value}>{props.children}</MapContext.Provider>
}

import React, { PropsWithChildren, useState } from 'react'

export interface IAppContext {
    view: AppView
    setView: (newView: AppView) => void
    world: {
        value: string
        setValue: (val: string) => void
    }
}

export enum AppView {
    Start = 0,
    GetWorldInfo = 1,
    GetPlayerInfo = 2,
    GetTribeInfo = 3,
    GetVillageInfo = 4,
    Panel = 5,
}

const defaultContextObject: IAppContext = {
    view: AppView.Start,
    setView: () => {},
    world: {
        value: '',
        setValue: () => {},
    },
}

export const AppContext = React.createContext(defaultContextObject)

export const AppContextProvider = (props: PropsWithChildren<{}>) => {
    const [view, setView] = useState(AppView.Start)
    const [world, setWorld] = useState('')
    return (
        <AppContext.Provider
            value={{
                view: view,
                setView: setView,
                world: {
                    value: world,
                    setValue: setWorld,
                },
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

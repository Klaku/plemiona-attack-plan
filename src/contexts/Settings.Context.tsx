import React, { PropsWithChildren, useEffect, useState } from 'react'
const LOCAL_STORAGE_WORLD_PREFIX_KEY = 'CACHE_WORLD_PREFIX'
export enum ScreenOptions {
    None = 0,
    Data = 1,
    App = 2,
}
export interface ISettings {
    world: {
        value: string
        update: (value: string) => void
    }
    screen: {
        value: ScreenOptions
        update: (value: ScreenOptions) => void
    }
    attack_start: {
        value: Date
        update: (value: Date) => void
    }
    delay: {
        value: number
        update: (value: number) => void
    }
}

const defaultContext: ISettings = {
    world: {
        value: '',
        update: () => {},
    },
    screen: {
        value: ScreenOptions.None,
        update: () => {},
    },
    attack_start: {
        value: new Date(),
        update: () => {},
    },
    delay: {
        value: 500,
        update: () => {},
    },
}

export const SettingsContext = React.createContext(defaultContext)

export const SettingsContextProvider = (props: PropsWithChildren<{}>) => {
    const [world, setWorld] = useState('')
    const [delay, setDelay] = useState(1000)
    const [screen, setScreen] = useState(ScreenOptions.None)
    const [attack_start, setAttackStart] = useState(new Date())
    const UpdateWorldSelection = (world_prefix: string) => {
        localStorage.setItem(LOCAL_STORAGE_WORLD_PREFIX_KEY, world_prefix)
        setWorld(world_prefix)
    }
    useEffect(() => {
        let cached_value = localStorage.getItem(LOCAL_STORAGE_WORLD_PREFIX_KEY)
        if (cached_value != null) {
            setWorld(cached_value)
            setScreen(ScreenOptions.Data)
        }
    }, [])
    return (
        <SettingsContext.Provider
            value={{
                world: {
                    value: world,
                    update: UpdateWorldSelection,
                },
                delay: {
                    value: delay,
                    update: setDelay,
                },
                screen: {
                    value: screen,
                    update: setScreen,
                },
                attack_start: {
                    value: attack_start,
                    update: setAttackStart,
                },
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )
}

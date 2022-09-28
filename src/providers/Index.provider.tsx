import React, { PropsWithChildren } from 'react'
import { DataContextProvider } from '../contexts/Data.Context'
import { MapContextProvider } from '../contexts/Map.Context'
import { PlanerContextProvider } from '../contexts/Planer.Context'
import { SettingsContextProvider } from '../contexts/Settings.Context'

const IndexProvider = (props: PropsWithChildren<{}>) => {
    return (
        <SettingsContextProvider>
            <DataContextProvider>
                <PlanerContextProvider>
                    <MapContextProvider>{props.children}</MapContextProvider>
                </PlanerContextProvider>
            </DataContextProvider>
        </SettingsContextProvider>
    )
}

export default IndexProvider

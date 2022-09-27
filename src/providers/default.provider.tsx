import React, { PropsWithChildren } from 'react'
import { AppContextProvider } from '../context/App.context'
import { PlayerContextProvider } from '../context/Player.context'
import { TribeContextProvider } from '../context/Tribe.context'
import { VillageContextProvider } from '../context/Village.context'

const defaultProvider = (props: PropsWithChildren<{}>) => {
    return (
        <AppContextProvider>
            <TribeContextProvider>
                <PlayerContextProvider>
                    <VillageContextProvider>{props.children}</VillageContextProvider>
                </PlayerContextProvider>
            </TribeContextProvider>
        </AppContextProvider>
    )
}

export default defaultProvider

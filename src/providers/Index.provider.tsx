import React, { PropsWithChildren } from 'react'
import { DataContextProvider } from '../contexts/Data'
import { FilterContextProvider } from '../contexts/Filter'
import { MapContextProvider } from '../contexts/Map'
import ThemeProvider from './Theme.provider'

const IndexProvider = (props: PropsWithChildren<{}>) => {
    return (
        <ThemeProvider>
            <DataContextProvider>
                <FilterContextProvider>
                    <MapContextProvider>{props.children}</MapContextProvider>
                </FilterContextProvider>
            </DataContextProvider>
        </ThemeProvider>
    )
}

export default IndexProvider

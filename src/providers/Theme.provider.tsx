import React, { PropsWithChildren } from 'react'
import { ThemeProvider as Provider } from 'styled-components'
const ThemeProvider = (props: PropsWithChildren<{}>) => {
    const theme = {
        light: '#F5F0F6',
        main: '#4F646F',
        dark: '#535657',
        gray: '#C1C2C3',
    }
    return <Provider theme={theme}>{props.children}</Provider>
}

export default ThemeProvider

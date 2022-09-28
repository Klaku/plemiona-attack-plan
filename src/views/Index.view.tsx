import React, { PropsWithChildren } from 'react'
import { NavDropdown } from 'react-bootstrap'
import styled from 'styled-components'
import App from '../components/App'
import Data from '../components/Data'
import HeaderComponent from '../components/Header'
import { ScreenOptions, SettingsContext } from '../contexts/Settings.Context'
const Index = (props: PropsWithChildren<{}>) => {
    const context = {
        settings: React.useContext(SettingsContext),
    }
    return (
        <Container>
            <HeaderComponent />
            {context.settings.screen.value == ScreenOptions.Data && <Data />}
            {context.settings.screen.value == ScreenOptions.App && <App />}
        </Container>
    )
}

export default Index

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

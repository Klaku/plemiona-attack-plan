import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Config from './Config/Config'
import Map from './Map/Map'
import Info from './Info/Info'
const App = (props: PropsWithChildren<{}>) => {
    return (
        <Wrapper>
            <Config />
            <Map />
            <Info />
        </Wrapper>
    )
}

export default App

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh -50px);
`

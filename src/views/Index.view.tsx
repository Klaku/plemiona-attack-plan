import React, { PropsWithChildren } from 'react'
import { Form, NavDropdown } from 'react-bootstrap'
import styled from 'styled-components'
import Filters from '../components/Filters/Filters'
import Map from '../components/Map/Map'
import Menu from '../components/Menu/Menu'
import { DataContext } from '../contexts/Data'
const Index = (props: PropsWithChildren<{}>) => {
    return (
        <Container>
            <Filters />
            <Map />
            <Menu />
        </Container>
    )
}

export default Index

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

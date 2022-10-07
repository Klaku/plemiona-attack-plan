import React, { PropsWithChildren } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { Popup as P } from 'react-leaflet'
import styled from 'styled-components'
import { IVillageData } from '../../types/IVillage'
const Popup = (
    props: PropsWithChildren<{
        village: IVillageData
    }>
) => {
    return (
        <P>
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">Fake</Button>
                <Button variant="secondary">Off</Button>
                <Button variant="secondary">Szlachta</Button>
            </ButtonGroup>
        </P>
    )
}

export default Popup

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

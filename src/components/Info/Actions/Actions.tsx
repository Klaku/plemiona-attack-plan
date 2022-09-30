import React, { PropsWithChildren } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import Exportuj from './Exportuj'

const Actions = (props: PropsWithChildren<{}>) => {
    return (
        <Wrapper>
            <Exportuj export={true}></Exportuj>
            <Exportuj export={false}></Exportuj>
        </Wrapper>
    )
}

export default Actions

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
`

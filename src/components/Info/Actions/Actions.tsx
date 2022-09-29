import React, { PropsWithChildren } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const Actions = (props: PropsWithChildren<{}>) => {
    return (
        <Wrapper>
            <Button>Hello World</Button>
        </Wrapper>
    )
}

export default Actions

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { PlanerContext } from '../../contexts/Planer.Context'
import Active from './Active'
import Targets from './Targets'

const Info = (props: PropsWithChildren<{}>) => {
    const context = {
        planer: React.useContext(PlanerContext),
    }
    return (
        <Wrapper>
            {context.planer.activeTarget != null && <Active />}
            <Targets />
        </Wrapper>
    )
}

export default Info

export const Wrapper = styled.div`
    width: 250px;
    height: calc(100vh - 50px);
    max-height: calc(100vh - 50px);
    overflow-y: auto;
`

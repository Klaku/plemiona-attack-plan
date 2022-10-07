import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import MenuOptions from './MenuOptions'
import SelectedVillage from './SelectedVillage'

const Menu = (props: PropsWithChildren<{}>) => {
    return (
        <Wrapper>
            <SelectedVillage />
            <MenuOptions />
        </Wrapper>
    )
}

export default Menu

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: ${(props) => props.theme.light};
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    justify-content: space-between;
`

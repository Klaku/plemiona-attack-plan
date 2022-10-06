import React, { PropsWithChildren, useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import DataModal from './Data.modal'

const MenuOptions = (props: PropsWithChildren<{}>) => {
    const [isDataModalVisible, setIsDataModalVisible] = useState(false)
    return (
        <Wrapper>
            <Button onClick={() => setIsDataModalVisible(true)} size={'sm'} variant="secondary">
                Dane
            </Button>
            <DataModal isVisible={isDataModalVisible} setIsVisible={setIsDataModalVisible} />
        </Wrapper>
    )
}

export default MenuOptions

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    & > * {
        width: 100%;
    }
`

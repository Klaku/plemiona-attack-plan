import React, { PropsWithChildren, useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import MenuModal from './Menu'
import Exportuj from './Menu'
import SaveModal from './SaveModal'

const Actions = (props: PropsWithChildren<{}>) => {
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false)

    return (
        <Wrapper>
            <Row>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setIsMenuModalVisible(true)
                    }}
                    style={{ width: '100%' }}
                >
                    Menu
                </Button>
                <MenuModal isMenuVisible={isMenuModalVisible} isMenuVisibleHandler={setIsMenuModalVisible} />
            </Row>
        </Wrapper>
    )
}

export default Actions

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 10px;
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    padding: 10px;
`

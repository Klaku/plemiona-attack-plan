import React, { PropsWithChildren, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { DataContext } from '../../../contexts/Data.Context'
import { MapContext } from '../../../contexts/Map.Context'
import { PlanerContext } from '../../../contexts/Planer.Context'
import { SettingsContext } from '../../../contexts/Settings.Context'
import MyPlans from './MyPlans'

const MenuModal = (
    props: PropsWithChildren<{
        isMenuVisible: boolean
        isMenuVisibleHandler: (value: boolean) => void
    }>
) => {
    
    const HideHandler = () => {
        props.isMenuVisibleHandler(false)
        setIsMyPlansVisible(false)
    }
    const [isMyPlansVisible, setIsMyPlansVisible] = useState(false)
    return (
        <Modal show={props.isMenuVisible} onHide={HideHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Wrapper>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setIsMyPlansVisible(true)
                        }}
                    >
                        Moje Planery
                    </Button>
                    <Button variant="secondary" onClick={HideHandler}>
                        Zamknij
                    </Button>
                </Wrapper>
                <MyPlans isModalVisible={isMyPlansVisible} isModalVisibleHandler={setIsMyPlansVisible} />
            </Modal.Body>
        </Modal>
    )
}

export default MenuModal

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    & > * {
        width: 200px;
    }
`

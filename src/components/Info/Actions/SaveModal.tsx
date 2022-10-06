import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Button, Form, FormControl, Modal } from 'react-bootstrap'
import styled from 'styled-components'
const SAVE_LIST_KEY = 'SAVE_LIST_KEY'
const SaveModal = (
    props: PropsWithChildren<{
        isVisible: boolean
        setIsVisible: (value: boolean) => void
    }>
) => {
    const ToggleModal = () => {
        props.setIsVisible(!props.isVisible)
    }

    const [name, setName] = useState('')
    const [focusIndex, setFocusIndex] = useState(0)
    const [items, setItems] = useState([])
    return (
        <Modal show={props.isVisible} onHide={ToggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Zapisz planer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {[1, 2, 3].map((menu_option_index) => {
                    return (
                        <MenuOptionWrapper>
                            <Form.Control
                                onFocus={() => {
                                    setFocusIndex(menu_option_index)
                                }}
                            ></Form.Control>
                        </MenuOptionWrapper>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ToggleModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={ToggleModal}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SaveModal

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const MenuOptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0;
`

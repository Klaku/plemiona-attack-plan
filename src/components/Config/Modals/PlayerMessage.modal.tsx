import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { SettingsContext } from '../../../contexts/Settings.Context'

const PlayerMessageModal = (
    props: PropsWithChildren<{
        isVisible: boolean
        hideHandler: () => void
    }>
) => {
    const Save = () => {
        context.settings.playerMessage.update(value)

        props.hideHandler()
    }
    const context = {
        settings: React.useContext(SettingsContext),
    }
    const [value, setValue] = useState('')
    useEffect(() => {
        console.log('Mounted', context.settings.playerMessage.value)
        setValue(context.settings.playerMessage.value)
    }, [])
    return (
        <Modal show={props.isVisible} onHide={props.hideHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Edytuj schemat wiadomości</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table style={{ marginBottom: '10px' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '0 10px' }}>$Date</td>
                            <td>Data rozpoczęcia akcji</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0 10px' }}>$Targets</td>
                            <td>Lista potencjalnych celów</td>
                        </tr>
                    </tbody>
                </table>
                <Form.Control
                    as="textarea"
                    value={value}
                    rows={10}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideHandler}>
                    Zamknij
                </Button>
                <Button variant="primary" onClick={Save}>
                    Zapisz
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PlayerMessageModal

import React, { PropsWithChildren, useState } from 'react'
import { Button, Form, FormCheck, Modal, OverlayTrigger, Popover, Table } from 'react-bootstrap'
import styled from 'styled-components'
import { SketchPicker as ColorPicker } from 'react-color'
import { FilterContext } from '../../contexts/Filter'
import { DataContext } from '../../contexts/Data'
const OffensiveVillagesModal = (
    props: PropsWithChildren<{
        isVisible: boolean
        setIsVisible: (value: boolean) => void
    }>
) => {
    const context = {
        filter: React.useContext(FilterContext),
        data: React.useContext(DataContext),
    }
    const handleClose = () => {
        props.setIsVisible(false)
    }
    const handleSave = () => {
        let coords = villages
            .split(',')
            .map((x) => x.trim())
            .filter((x) => x.match(/^\d{3}\|\d{3}$/gm))
        context.filter.offensiveVillages[1](coords.map((coord) => context.data.village[0].filter((village) => `${village.x}|${village.y}` == coord)[0]).filter((x) => typeof x != 'undefined'))
        handleClose()
    }

    const [villages, setVillages] = useState('')
    return (
        <Modal show={props.isVisible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Wioski Ofensywne</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form.Label>Lista wiosek ofensywnych</Form.Label>
                    <Form.Control as="textarea" rows={5} value={villages} onChange={(e) => setVillages(e.target.value)} />
                    <Form.Text className="text-muted">Oddzielone przecinkiem koordynaty wiosek: "100|100,200|200,300|300"</Form.Text>
                    <Form.Text className="text-muted"></Form.Text>
                </Container>
                <Container>
                    <Form.Label>Oznaczenie na mapie</Form.Label>
                    <OverlayTrigger
                        trigger="click"
                        placement="right"
                        rootClose={true}
                        overlay={
                            <Popover>
                                <ColorPicker color={context.filter.offensiveVillagesColor[0]} onChange={(e) => context.filter.offensiveVillagesColor[1](e.hex)} />
                            </Popover>
                        }
                    >
                        <ColorPickerWrapper style={{ backgroundColor: context.filter.offensiveVillagesColor[0] }} />
                    </OverlayTrigger>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Zapisz</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OffensiveVillagesModal
export const Container = styled.div`
    margin-bottom: 15px;
`
export const ColorPickerWrapper = styled.div`
    width: 30px;
    height: 30px;
    margin: 5px;
    outline: 3px solid #eee;
    border-radius: 5px;
    cursor: pointer;
`

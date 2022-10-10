import React, { PropsWithChildren, useState } from 'react'
import { Button, Form, FormCheck, Modal, OverlayTrigger, Popover, Table } from 'react-bootstrap'
import { DataContext } from '../../contexts/Data'
import { FilterContext } from '../../contexts/Filter'
import { SketchPicker as ColorPicker } from 'react-color'
import { ISelectedTribe, ITribe } from '../../types/ITribe'
const TribeEditModal = (
    props: PropsWithChildren<{
        isVisible: boolean
        setIsVisible: (value: boolean) => void
    }>
) => {
    const [filter, setFilter] = useState('')
    const handleClose = () => {
        props.setIsVisible(false)
    }
    const context = {
        data: React.useContext(DataContext),
        filter: React.useContext(FilterContext),
    }
    const AddTribe = (tribe: ITribe) => {
        context.filter.tribes[1]([...context.filter.tribes[0], { ...tribe, color: '#000' }])
    }
    const RemoveTribe = (tribe: ISelectedTribe) => {
        context.filter.tribes[1](context.filter.tribes[0].filter((x) => x.tribe_id_num != tribe.tribe_id_num))
    }
    const UpdateTribeColor = (tribe: ISelectedTribe, hex: string) => {
        context.filter.tribes[1](
            context.filter.tribes[0].map((x) => {
                if (x.tribe_id_num == tribe.tribe_id_num) {
                    x.color = hex
                }
                return x
            })
        )
    }
    return (
        <Modal show={props.isVisible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dostosuj Plemiona</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <tbody>
                        {context.filter.tribes[0].map((tribe) => {
                            return (
                                <tr key={tribe.tribe_id}>
                                    <td>{tribe.rank}</td>
                                    <td>{`${tribe.name} (${tribe.tag})`}</td>
                                    <td>
                                        <OverlayTrigger
                                            trigger="click"
                                            placement="right"
                                            rootClose={true}
                                            overlay={
                                                <Popover>
                                                    <ColorPicker color={tribe.color} onChange={(e) => UpdateTribeColor(tribe, e.hex)} />
                                                </Popover>
                                            }
                                        >
                                            <div style={{ width: 16, height: 16, margin: 4, backgroundColor: tribe.color, cursor: 'pointer' }}></div>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <a href="#" onClick={() => RemoveTribe(tribe)}>
                                            Usuń
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Form.Control placeholder={'Filtruj...'} value={filter} onChange={(e) => setFilter(e.target.value)}></Form.Control>
                <Table>
                    <tbody>
                        {context.data.tribe[0]
                            .filter((x) => context.filter.tribes[0].filter((a) => a.tribe_id_num == x.tribe_id_num).length == 0)
                            .filter((x) => `${x.name} ${x.tag}`.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1)
                            .sort((a, b) => (a.rank_num > b.rank_num ? 1 : -1))
                            .slice(0, 10)
                            .map((tribe) => {
                                return (
                                    <tr key={tribe.tribe_id}>
                                        <td>{tribe.rank}</td>
                                        <td>{`${tribe.name} (${tribe.tag})`}</td>
                                        <td>
                                            <a href="#" onClick={() => AddTribe(tribe)}>
                                                Dodaj
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Zamknij</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TribeEditModal

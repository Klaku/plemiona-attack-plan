import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap'
import { BsFillPrinterFill } from 'react-icons/bs'
import styled from 'styled-components'
import { DataContext } from '../../../contexts/Data.Context'
import { ITarget, OperationType, PlanerContext } from '../../../contexts/Planer.Context'
import { ScreenOptions, SettingsContext } from '../../../contexts/Settings.Context'
import { MapContext } from '../../../contexts/Map.Context'
import { ISelectedTribe } from '../../../types/ITribe'
import { IVillage } from '../../../types/IVillage'
import { IPlayer } from '../../../types/IPlayer'
const LOCAL_STORAGE_DATA_KEY = 'MOJE_PLANERY_DATA'
const MyPlans = (
    props: PropsWithChildren<{
        isModalVisible: boolean
        isModalVisibleHandler: (value: boolean) => void
    }>
) => {
    const HideHandler = () => {
        props.isModalVisibleHandler(false)
    }
    const [plans, setPlans] = useState([] as IPlan[])
    const GetDataFromLocalStorage = () => {
        let data = localStorage.getItem(LOCAL_STORAGE_DATA_KEY)
        if (data == null) {
            localStorage.setItem(LOCAL_STORAGE_DATA_KEY, '[]')
            data = '[]'
        }
        let parsedData = JSON.parse(data) as IPlan[]
        setPlans(parsedData)
    }
    useEffect(() => {
        GetDataFromLocalStorage()
    }, [])
    const [name, setName] = useState('Nowy')
    const context = {
        data: React.useContext(DataContext),
        settings: React.useContext(SettingsContext),
        planer: React.useContext(PlanerContext),
        map: React.useContext(MapContext),
    }
    const GetDataFromContext = () => {
        return JSON.stringify({
            settings: {
                world: context.settings.world.value,
                delay: context.settings.delay.value,
                screen: context.settings.screen.value,
                attack_start: context.settings.attack_start.value,
                player_message: context.settings.playerMessage.value,
            },
            map: {
                tribes: context.map.tribes,
                wioski_ofensywne: context.map.wioski_ofensywne,
                wioski_ofensywne_color: context.map.wioski_ofensywne_color,
                wioski_atakowane: context.map.wioski_atakowane,
                wioski_atakowane_color: context.map.wioski_atakowane_color,
                wioski_szlachta: context.map.wioski_szlachta,
            },
            planer: {
                operation: context.planer.operationType,
                items: context.planer.items,
                activeTarget: context.planer.activeTarget,
            },
        })
    }
    const SetDataFromSave = (object: ISaveObject) => {
        context.settings.world.update(object.settings.world)
        context.settings.delay.update(object.settings.delay)
        context.settings.screen.update(object.settings.screen)
        context.settings.attack_start.update(object.settings.attack_start)
        context.settings.playerMessage.update(object.settings.player_message)

        context.map.setTribes(object.map.tribes)
        context.map.setWioskiOfensywne(object.map.wioski_ofensywne)
        context.map.setWioskiOfensywneColor(object.map.wioski_ofensywne_color)
        context.map.setWioskiAtakowane(object.map.wioski_atakowane)
        context.map.setWioskiAtakowaneColor(object.map.wioski_atakowane_color)
        context.map.setWioskiSzlachta(object.map.wioski_szlachta)

        context.planer.setOperationType(object.planer.operation)
        context.planer.setItems(object.planer.items)
        context.planer.setActiveTarget(object.planer.activeTarget)
        HideHandler()
    }
    const CreateNewPlan = (id: number) => {
        let object: IPlan = {
            id: id,
            name: name,
            data: GetDataFromContext(),
        }
        localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify([...plans, object]))
        setPlans([...plans, object])
    }
    return (
        <Modal show={props.isModalVisible} onHide={HideHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Moje Planery</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Wrapper>
                    {plans.map((plan) => {
                        return (
                            <PlanWrapper key={plan.id}>
                                <div style={{ flexGrow: 1 }}>{plan.name}</div>
                                <DropdownButton
                                    onSelect={(e) => {
                                        switch (e?.toString()) {
                                            case '1':
                                                setPlans(
                                                    plans.map((x) => {
                                                        return x.id == plan.id
                                                            ? {
                                                                  ...x,
                                                                  data: GetDataFromContext(),
                                                              }
                                                            : x
                                                    })
                                                )
                                                HideHandler()
                                                break
                                            case '2':
                                                try {
                                                    let dd = JSON.parse(plan.data) as ISaveObject
                                                    console.log(dd)
                                                    SetDataFromSave(dd)
                                                } catch (exception) {
                                                    console.log(exception)
                                                    setPlans(plans.filter((failedPlan) => failedPlan.id != plan.id))
                                                }
                                                break
                                            case '3':
                                                console.log('Exportuj', e, plan.id)
                                                break
                                            default:
                                                return
                                        }
                                    }}
                                    title="Akcje"
                                >
                                    <Dropdown.Item href="#" eventKey={1}>
                                        Zapisz
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#" eventKey={2}>
                                        Wczytaj
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#" eventKey={3}>
                                        Exportuj
                                    </Dropdown.Item>
                                </DropdownButton>
                            </PlanWrapper>
                        )
                    })}
                    <PlanWrapper>
                        <div style={{ flexGrow: 1 }}>
                            <Form.Label>Nazwa nowego planera</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </div>
                        <Button
                            disabled={name.length < 3}
                            onClick={() => {
                                CreateNewPlan(Date.now())
                            }}
                        >
                            Zapisz
                        </Button>
                    </PlanWrapper>
                </Wrapper>
            </Modal.Body>
            <Modal.Footer>
                <Button>Importuj</Button>
                <Button variant="secondary" onClick={HideHandler}>
                    Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyPlans

export interface IPlan {
    id: number
    name: string
    data: string
}

export const PlanWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    border: 2px dashed #ddd;
    gap: 10px;
    padding: 10px;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
`

export interface ISaveObject {
    settings: {
        world: string
        delay: number
        screen: ScreenOptions
        attack_start: Date
        player_message: string
    }
    map: {
        tribes: ISelectedTribe[]
        wioski_ofensywne: IVillage[]
        wioski_ofensywne_color: string
        wioski_atakowane: IVillage[]
        wioski_atakowane_color: string
        wioski_szlachta: IVillage[]
    }
    planer: {
        operation: OperationType
        items: ITarget[]
        activeTarget: {
            player: IPlayer
            village: IVillage
        } | null
    }
}

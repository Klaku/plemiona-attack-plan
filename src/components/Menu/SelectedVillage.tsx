import React, { PropsWithChildren, useState, useEffect } from 'react'
import { CloseButton, Form, Table } from 'react-bootstrap'
import styled from 'styled-components'
import { IPlan, MapContext } from '../../contexts/Map'
import { IVillageData } from '../../types/IVillage'
import Plan from './Plan'

const SelectedVillage = (props: PropsWithChildren<{}>) => {
    const context = {
        map: React.useContext(MapContext),
    }
    const [village, setVillage] = useState(null as IVillageData | null)
    useEffect(() => setVillage(context.map.selectedVillage[0]), [context.map.selectedVillage[0]])

    const onDeletePlanClick = (planId: number) => {
        context.map.plans[1](context.map.plans[0].filter((x) => x.id != planId))
    }
    const onMoveDownClick = (planId: number) => {
        if (village == null) return
        let plans_targeted_active_village = context.map.plans[0].filter((x) => x.target.village_id_num == village.village_id_num)
        let selected_plan = plans_targeted_active_village.filter((x) => x.id == planId)[0]
        let prev_plans = plans_targeted_active_village.filter((x) => x.order < selected_plan.order)
        let next_plans = plans_targeted_active_village.filter((x) => x.order > selected_plan.order)
        selected_plan.order += 1.5
        let combined_plans = [...prev_plans, ...next_plans, selected_plan]
            .sort((a, b) => {
                return a.order > b.order ? 1 : -1
            })
            .map((x, i) => {
                return {
                    ...x,
                    order: i,
                }
            })
        context.map.plans[1]([...context.map.plans[0].filter((x) => x.target.village_id_num != village.village_id_num), ...combined_plans])
    }
    const onMoveUpClick = (planId: number) => {
        if (village == null) return
        let plans_targeted_active_village = context.map.plans[0].filter((x) => x.target.village_id_num == village.village_id_num)
        let selected_plan = plans_targeted_active_village.filter((x) => x.id == planId)[0]
        let prev_plans = plans_targeted_active_village.filter((x) => x.order < selected_plan.order)
        let next_plans = plans_targeted_active_village.filter((x) => x.order > selected_plan.order)
        selected_plan.order -= 1.5
        let combined_plans = [...prev_plans, ...next_plans, selected_plan]
            .sort((a, b) => {
                return a.order > b.order ? 1 : -1
            })
            .map((x, i) => {
                return {
                    ...x,
                    order: i,
                }
            })
        context.map.plans[1]([...context.map.plans[0].filter((x) => x.target.village_id_num != village.village_id_num), ...combined_plans])
    }
    if (village == null) {
        return <Wrapper></Wrapper>
    } else {
        return (
            <Wrapper>
                <Row style={{ justifyContent: 'flex-end', padding: 5 }}>
                    <CloseButton
                        onClick={() => {
                            context.map.selectedVillage[1](null)
                            context.map.isPlaningPhase[1](false)
                        }}
                    />
                </Row>
                <Row style={{ justifyContent: 'center', columnGap: 5 }}>
                    <span style={{ textAlign: 'center' }}>{village.name}</span>
                    <span>{`(${village.x}|${village.y})`}</span>
                </Row>
                <Row style={{ justifyContent: 'center' }}>{`${Intl.NumberFormat('de-DE').format(village.points_num)} Punktów`}</Row>
                <Row style={{ justifyContent: 'center', columnGap: 5 }}>
                    <span style={{ fontWeight: 700, textAlign: 'center' }}>{`${village.player.name} `}</span>
                    <span>{`${village.tribe.tag} (${Intl.NumberFormat('de-DE').format(village.tribe.points_num)} Punktów)`}</span>
                </Row>
                <Row>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: 'center' }}>
                    <Form.Check
                        id="toggle-planing-switch"
                        type="switch"
                        checked={context.map.isPlaningPhase[0]}
                        label="Planowanie"
                        onChange={() => context.map.isPlaningPhase[1](!context.map.isPlaningPhase[0])}
                    />
                </Row>
                <Row>
                    <Title>Plany</Title>
                </Row>
                {context.map.plans[0]
                    .filter((x) => x.target.village_id_num == village?.village_id_num)
                    .sort((a, b) => {
                        return a.order > b.order ? 1 : -1
                    })
                    .map((plan) => (
                        <Row key={plan.id} style={{ width: '100%', marginTop: 5 }}>
                            <Plan
                                plan={plan}
                                onDeleteClick={() => onDeletePlanClick(plan.id)}
                                onMoveDownClick={() => {
                                    onMoveDownClick(plan.id)
                                }}
                                onMoveUpClick={() => {
                                    onMoveUpClick(plan.id)
                                }}
                            />
                        </Row>
                    ))}
            </Wrapper>
        )
    }
}

export default SelectedVillage

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
export const Divider = styled.div`
    width: 100%;
    height: 1px;
    border-bottom: 1px solid ${(props) => props.theme.gray};
    margin: 10px 0;
`
export const Title = styled.div`
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    color: ${(props) => props.theme.dark};
    padding: 5px 15px;
`

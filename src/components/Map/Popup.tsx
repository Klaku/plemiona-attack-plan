import React, { PropsWithChildren } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { Popup as P } from 'react-leaflet'
import styled from 'styled-components'
import { AttackType, MapContext } from '../../contexts/Map'
import { IVillageData } from '../../types/IVillage'
const Popup = (
    props: PropsWithChildren<{
        village: IVillageData
    }>
) => {
    const context = {
        map: React.useContext(MapContext),
    }
    const CreatePlan = (type: AttackType) => {
        let plans = context.map.plans[0]
        let paraelPlans = plans.filter((plan) => plan.target.village_id_num == context.map.selectedVillage[0]?.village_id_num)
        context.map.plans[1]([
            ...plans,
            {
                target: context.map.selectedVillage[0] as IVillageData,
                source: props.village,
                order: paraelPlans.length,
                type: type,
                id: Date.now(),
            },
        ])
    }
    return (
        <P>
            <ButtonGroup>
                <Button variant="secondary" onClick={() => CreatePlan(AttackType.Fake)}>
                    Fake
                </Button>
                <Button variant="secondary" onClick={() => CreatePlan(AttackType.Off)}>
                    Off
                </Button>
                <Button variant="secondary" onClick={() => CreatePlan(AttackType.Snob)}>
                    Szlachta
                </Button>
            </ButtonGroup>
        </P>
    )
}

export default Popup

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

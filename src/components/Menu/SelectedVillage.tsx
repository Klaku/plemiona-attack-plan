import React, { PropsWithChildren } from 'react'
import { CloseButton, Form, Table } from 'react-bootstrap'
import styled from 'styled-components'
import { MapContext } from '../../contexts/Map'

const SelectedVillage = (props: PropsWithChildren<{}>) => {
    const context = {
        map: React.useContext(MapContext),
    }
    const village = context.map.selectedVillage[0]
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

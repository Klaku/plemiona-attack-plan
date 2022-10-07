import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { AttackTypeColor, AttackTypeDescription, IPlan } from '../../contexts/Map'
import { BsArrowUp, BsArrowDown, BsXLg } from 'react-icons/bs'
const Plan = (
    props: PropsWithChildren<{
        plan: IPlan
    }>
) => {
    return (
        <Wrapper style={{ backgroundColor: AttackTypeColor(props.plan.type) }}>
            <DetailsContainer>
                <Row>
                    <span>{props.plan.source.name}</span>
                    <span>{`(${props.plan.source.x}|${props.plan.source.y})`}</span>
                </Row>
                <Row>
                    <span>{props.plan.source.player.name}</span>
                    <span>({props.plan.source.tribe.tag})</span>
                </Row>
            </DetailsContainer>
            <ActionContainer>
                <BsXLg />
                <BsArrowUp />
                <BsArrowDown />
            </ActionContainer>
        </Wrapper>
    )
}

export default Plan

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`
export const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 10px;
`
export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 10px;
    justify-content: center;
    gap: 5px;
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    flex-wrap: wrap;
`

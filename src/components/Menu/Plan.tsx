import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { AttackTypeColor, AttackTypeDescription, IPlan } from '../../contexts/Map'
import { BsArrowUp, BsArrowDown, BsXLg } from 'react-icons/bs'
import { CalculateDistance, CalculateDuration } from '../../helpers/Calcs'
const Plan = (
    props: PropsWithChildren<{
        plan: IPlan
        onDeleteClick: () => void
        onMoveUpClick: () => void
        onMoveDownClick: () => void
    }>
) => {
    const distance = Math.floor(CalculateDistance([props.plan.source.x_num, props.plan.source.y_num], [props.plan.target.x_num, props.plan.target.y_num]) * 100) / 100
    return (
        <Wrapper style={{ backgroundColor: AttackTypeColor(props.plan.type) }}>
            <table style={{ width: '100%', margin: '0 5px' }}>
                <tbody>
                    <tr>
                        <td colSpan={2} style={{ minWidth: '50%' }}>
                            <ShortSpan>{`(${props.plan.source.x}|${props.plan.source.y})`}</ShortSpan>
                        </td>
                        <td style={{ cursor: 'pointer' }}>
                            <BsXLg onClick={() => props.onDeleteClick()} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <ShortSpan>{props.plan.source.player.name}</ShortSpan>
                        </td>
                        <td style={{ cursor: 'pointer' }}>
                            <BsArrowUp onClick={() => props.onMoveUpClick()} />
                        </td>
                    </tr>
                    <tr>
                        <td>Plemie:</td>
                        <td>
                            <ShortSpan>{props.plan.source.tribe.tag}</ShortSpan>
                        </td>
                        <td style={{ cursor: 'pointer' }}>
                            <BsArrowDown onClick={() => props.onMoveDownClick()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Odległość:</span>
                        </td>
                        <td colSpan={2}>
                            <span>{distance}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Podróż:</span>
                        </td>
                        <td colSpan={2} style={{ minWidth: '85px' }}>
                            <span>{CalculateDuration(distance, props.plan.type)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>Wysyłka:</span>
                        </td>
                        <td colSpan={2} style={{ minWidth: '85px' }}>
                            <span>{CalculateDuration(distance, props.plan.type)}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Wrapper>
    )
}

export default Plan
export const ShortSpan = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100px;
    white-space: nowrap;
`
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
    & > * {
        cursor: pointer;
    }
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    flex-wrap: wrap;
`

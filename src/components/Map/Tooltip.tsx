import React, { PropsWithChildren } from 'react'
import { IVillage } from '../../types/IVillage'
import { Tooltip as TT } from 'react-leaflet'
import styled from 'styled-components'
import { DataContext } from '../../contexts/Data.Context'
import { IPlayer } from '../../types/IPlayer'
import { ITribe } from '../../types/ITribe'
import Icon_Snob from '../../assets/images/unit_snob.png'
import { CalculateDuration, CalculateSendTime, OperationType, PlanerContext } from '../../contexts/Planer.Context'
const Tooltip = (props: PropsWithChildren<{ village: IVillage }>) => {
    const context = {
        data: React.useContext(DataContext),
        planer: React.useContext(PlanerContext),
    }
    const owner = (context.data.player.items as IPlayer[]).filter((x) => x.player_id_num == props.village.player_id_num)[0]
    const tribe = owner && (context.data.tribe.items as ITribe[]).filter((x) => x.tribe_id_num == owner.tribe_id_num)[0]
    const wychodzace = context.planer.items
        .filter((x) => x.source.player.player_id_num == owner.player_id_num)
        .sort((a, b) => {
            return a.dateApproach > b.dateApproach ? 1 : -1
        })
    const przychodzace = context.planer.items
        .filter((x) => x.target.player.player_id_num == owner.player_id_num)
        .sort((a, b) => {
            return a.dateApproach > b.dateApproach ? 1 : -1
        })
    return (
        <TT>
            <Table>
                <tbody>
                    <HeadingRow>
                        <td colSpan={2}>{`${props.village.name} (${props.village.x_num}|${props.village.y_num}) K${props.village.y.slice(0, 1)}${props.village.x.slice(0, 1)}`}</td>
                    </HeadingRow>
                    <tr>
                        <PropertyCell>Punkty:</PropertyCell>
                        <td>{Intl.NumberFormat('de-DE').format(props.village.points_num)}</td>
                    </tr>
                    {owner && (
                        <tr>
                            <PropertyCell>Właściciel:</PropertyCell>
                            <td>{`${owner.name} (${Intl.NumberFormat('de-DE').format(owner.points_num)} Punktów | ${Intl.NumberFormat('de-DE').format(owner.villages_num)} wiosek)`}</td>
                        </tr>
                    )}
                    {tribe && (
                        <tr>
                            <PropertyCell>Plemię:</PropertyCell>
                            <td>{`${tribe.name} (${Intl.NumberFormat('de-DE').format(tribe.points_num)} Punktów)`}</td>
                        </tr>
                    )}
                    {context.planer.activeTarget != null && (
                        <tr>
                            <PropertyCell>Czas Podróży:</PropertyCell>
                            <td>{CalculateDuration(props.village, context.planer.activeTarget.village, context.planer.operationType)}</td>
                        </tr>
                    )}
                    {przychodzace.length > 0 && (
                        <tr>
                            <CenterTd colSpan={2}>Przybywające</CenterTd>
                        </tr>
                    )}
                    {przychodzace.map((operation) => {
                        return (
                            <tr key={operation.Id}>
                                <PropertyCell>{operation.dateApproach.toLocaleTimeString()}</PropertyCell>
                                <td>
                                    <SplitTd>{`${operation.source.player.name}`}</SplitTd>
                                    <SplitTd>{`(${operation.source.village.x_num}|${operation.source.village.y_num})`}</SplitTd>
                                </td>
                            </tr>
                        )
                    })}
                    {wychodzace.length > 0 && (
                        <tr>
                            <CenterTd colSpan={2}>Wychodzące</CenterTd>
                        </tr>
                    )}
                    {wychodzace.map((operation) => {
                        return (
                            <tr key={operation.Id}>
                                <PropertyCell>{operation.dateApproach.toLocaleTimeString()}</PropertyCell>
                                <td>
                                    <RowContainer>
                                        <SplitTd>{`${operation.target.player.name}`}</SplitTd>
                                        <SplitTd>{`(${operation.target.village.x_num}|${operation.target.village.y_num})`}</SplitTd>
                                    </RowContainer>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </TT>
    )
}

export default Tooltip
export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`
export const SplitTd = styled.div``
export const CenterTd = styled.td`
    text-align: center;
    font-weight: 600;
    padding-top: 10px;
    color: #666;
`
export const BadgeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
`

export const Table = styled.table``
export const HeadingRow = styled.tr`
    font-weight: 600;
    border-bottom: 1px solid #333;
    & > td {
        padding: 0 5px;
    }
`
export const PropertyCell = styled.td`
    font-weight: 600;
    text-align: right;
    padding: 0 5px;
`

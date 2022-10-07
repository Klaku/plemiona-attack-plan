import React, { PropsWithChildren } from 'react'
import { Table } from 'react-bootstrap'
import { Tooltip as DefaultTooltip } from 'react-leaflet'
import styled from 'styled-components'
import { ISelectedVillage, IVillageData } from '../../types/IVillage'
const Tooltip = (
    props: PropsWithChildren<{
        village: IVillageData
    }>
) => {
    return (
        <DefaultTooltip>
            <Table>
                <TBody>
                    <tr className="strong">
                        <td colSpan={2}>{`${props.village.name} (${props.village.x}|${props.village.y})`}</td>
                    </tr>
                    <tr>
                        <td>Punkty:</td>
                        <td>{Intl.NumberFormat('de-DE').format(props.village.points_num)}</td>
                    </tr>
                    <tr>
                        <td>Właściciel:</td>
                        <td>{`${props.village.player.name} (${Intl.NumberFormat('de-DE').format(props.village.player.points_num)} Punktów)`}</td>
                    </tr>
                    <tr>
                        <td>Plemie:</td>
                        <td>{`${props.village.tribe.name} (${Intl.NumberFormat('de-DE').format(props.village.tribe.points_num)} Punktów)`}</td>
                    </tr>
                </TBody>
            </Table>
        </DefaultTooltip>
    )
}

export default Tooltip

export const TBody = styled.tbody`
    & > tr > td:first-child {
        min-width: 100px;
    }
    & > tr.strong {
        font-weight: 600;
    }
`

import React, { PropsWithChildren } from 'react'
import { IVillage } from '../../types/IVillage'
import { Tooltip as TT } from 'react-leaflet'
import styled from 'styled-components'
import { DataContext } from '../../contexts/Data.Context'
import { IPlayer } from '../../types/IPlayer'
import { ITribe } from '../../types/ITribe'
import Icon_Snob from '../../assets/images/unit_snob.png'
const Tooltip = (props: PropsWithChildren<{ village: IVillage }>) => {
    const context = {
        data: React.useContext(DataContext),
    }
    const owner = (context.data.player.items as IPlayer[]).filter((x) => x.player_id_num == props.village.player_id_num)[0]
    const tribe = owner && (context.data.tribe.items as ITribe[]).filter((x) => x.tribe_id_num == owner.tribe_id_num)[0]
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
                    {
                        <tr>
                            <td colSpan={2}>
                                <BadgeContainer>
                                    <div>
                                        <img src={Icon_Snob} />
                                    </div>
                                </BadgeContainer>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
        </TT>
    )
}

export default Tooltip

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

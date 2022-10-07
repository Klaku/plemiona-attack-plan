import { LatLngExpression } from 'leaflet'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { LayerGroup, LayersControl, Polygon, PolygonProps } from 'react-leaflet'
import { DataContext } from '../../contexts/Data'
import { FilterContext } from '../../contexts/Filter'
import { MapContext } from '../../contexts/Map'
import { IPlayer } from '../../types/IPlayer'
import { ISelectedVillage, IVillage, IVillageData } from '../../types/IVillage'
import Popup from './Popup'
import Tooltip from './Tooltip'
const Markers = (props: PropsWithChildren<{}>) => {
    const context = {
        map: React.useContext(MapContext),
        data: React.useContext(DataContext),
        filters: React.useContext(FilterContext),
    }
    const [villages, setVillages] = useState([] as IVillageData[])
    useEffect(() => {
        let _villages = [] as IVillageData[]
        context.filters.tribes[0].forEach((tribe) => {
            let players = context.data.player[0].filter((x) => x.tribe_id_num == tribe.tribe_id_num)
            players.forEach((player) => {
                context.data.village[0]
                    .filter((village) => village.player_id_num == player.player_id_num)
                    .forEach((village) => {
                        _villages.push({
                            ...village,
                            color: tribe.color,
                            tribe: tribe,
                            player: player,
                        })
                    })
            })
        })
        setVillages(_villages)
    }, [])
    const onVillageClickHandler = (village: IVillageData) => {
        if (!context.map.isPlaningPhase[0]) {
            context.map.selectedVillage[1](village)
        }
    }
    return (
        <LayersControl.Overlay checked name={'Oznaczenia Wiosek'}>
            <LayerGroup>
                {villages.map((village) => {
                    let isOffensiveVillage = context.filters.offensiveVillages[0].filter((offensiveVillage) => offensiveVillage.village_id_num == village.village_id_num).length == 1
                    let containSnob = false
                    let isSelected = false
                    return (
                        <Polygon
                            stroke={containSnob || isSelected}
                            eventHandlers={{
                                click: () => {
                                    onVillageClickHandler(village)
                                },
                            }}
                            color={isSelected ? '#0f0' : containSnob ? '#fff' : undefined}
                            fillColor={village.color}
                            fillOpacity={1}
                            key={village.village_id}
                            positions={CreateVillagePosition(village.x_num, village.y_num)}
                        >
                            <Tooltip village={village} />
                            {context.map.isPlaningPhase[0] && <Popup village={village} />}
                        </Polygon>
                    )
                })}
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default Markers

const CreateVillagePosition = (y: number, x: number) => {
    let size = 0.8
    return [
        [-x, y],
        [-x + size, y],
        [-x + size, y + size],
        [-x, y + size],
    ] as LatLngExpression[]
}

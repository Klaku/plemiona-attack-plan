import { LatLngExpression } from 'leaflet'
import React, { PropsWithChildren } from 'react'
import { LayerGroup, LayersControl, Polygon, PolygonProps } from 'react-leaflet'
import { DataContext } from '../../contexts/Data.Context'
import { MapContext } from '../../contexts/Map.Context'
import { CalculateSendTime, PlanerContext } from '../../contexts/Planer.Context'
import { SettingsContext } from '../../contexts/Settings.Context'
import { IPlayer } from '../../types/IPlayer'
import { ISelectedTribe } from '../../types/ITribe'
import { IVillage } from '../../types/IVillage'
import Popup from './Popup'
import Tooltip from './Tooltip'
const polygonProperties: PolygonProps = {
    fillOpacity: 1,
    positions: [[-500, 500]],
}
const TribeMarkers = (
    props: PropsWithChildren<{
        tribe: ISelectedTribe
    }>
) => {
    const context = {
        data: React.useContext(DataContext),
        map: React.useContext(MapContext),
        planner: React.useContext(PlanerContext),
        settings: React.useContext(SettingsContext),
    }
    const players = (context.data.player.items as IPlayer[]).filter((x) => x.tribe_id_num == props.tribe.tribe_id_num)
    const playerIds = players.map((x) => x.player_id_num)
    const villages = (context.data.village.items as IVillage[]).filter((x) => playerIds.indexOf(x.player_id_num) != -1)
    return (
        <LayersControl.Overlay checked name={props.tribe.tag}>
            <LayerGroup>
                {villages.map((village) => {
                    let color = context.map.wioski_ofensywne.filter((x) => x.village_id_num == village.village_id_num).length > 0 ? context.map.wioski_ofensywne_color : props.tribe.color
                    color = context.map.wioski_atakowane.filter((x) => x.village_id_num == village.village_id_num).length > 0 ? context.map.wioski_atakowane_color : color
                    let szlachta = context.map.wioski_szlachta.filter((x) => x.village_id_num == village.village_id_num).length > 0
                    let activeTarget = context.planner.activeTarget != null && context.planner.activeTarget.village.village_id_num == village.village_id_num
                    return (
                        <Polygon
                            stroke={szlachta || activeTarget}
                            eventHandlers={{
                                click: () => {
                                    if (context.planner.activeTarget != null) {
                                        let dateApproach =
                                            context.planner.items.filter((x) => x.target.village.village_id_num == context.planner.activeTarget?.village.village_id_num).length == 0
                                                ? context.settings.attack_start.value
                                                : new Date(
                                                      context.planner.items
                                                          .filter((x) => x.target.village.village_id_num == context.planner.activeTarget?.village.village_id_num)
                                                          .sort((a, b) => {
                                                              return a.dateApproach < b.dateApproach ? 1 : -1
                                                          })[0]
                                                          .dateApproach.getTime() + context.settings.delay.value
                                                  )
                                        let item = {
                                            Id: Date.now(),
                                            source: {
                                                village: village,
                                                player: players.filter((x) => x.player_id_num == village.player_id_num)[0],
                                            },
                                            target: {
                                                village: context.planner.activeTarget.village,
                                                player: context.planner.activeTarget.player,
                                            },
                                            OperationType: context.planner.operationType,
                                            dateSend: new Date(),
                                            dateApproach: dateApproach,
                                        }
                                        item.dateSend = CalculateSendTime(item)
                                        context.planner.setItems([...context.planner.items, item])
                                    }
                                },
                            }}
                            color={activeTarget ? '#0f0' : szlachta ? '#fff' : undefined}
                            fillColor={color}
                            fillOpacity={1}
                            key={village.village_id_num}
                            {...polygonProperties}
                            positions={CreateVillagePosition(village.x_num, village.y_num, szlachta) as LatLngExpression[]}
                        >
                            <Tooltip village={village} />
                            {context.planner.activeTarget == null && <Popup village={village} />}
                        </Polygon>
                    )
                })}
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default TribeMarkers

const CreateVillagePosition = (y: number, x: number, szlachta: boolean) => {
    let multi = szlachta ? 0.8 : 0.8
    return [
        [-x, y],
        [-x + multi, y],
        [-x + multi, y + multi],
        [-x, y + multi],
    ]
}

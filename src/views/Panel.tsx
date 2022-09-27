import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form } from 'react-bootstrap'
import { MapContainer, TileLayer, useMap, Polygon, Tooltip, Popup } from 'react-leaflet'
import * as leaflet from 'leaflet'
import { ITribe, TribeContext } from '../context/Tribe.context'
import { AppContext } from '../context/App.context'
import { IPlayer, PlayerContext } from '../context/Player.context'
import { IVillage, VillageContext } from '../context/Village.context'
import { Button } from '../assets/Button'
import DatePicker from 'react-datepicker'
export enum TypRozkazu {
    Fake = 0,
    Off = 1,
    Szlachta = 2,
}
export interface IRozkaz {
    id: number | null
    widoczny: boolean
    source: { village: IVillage; player: IPlayer } | null
    target: { village: IVillage; player: IPlayer } | null
    typRozkazu: TypRozkazu | null
}
const Panel = (props: PropsWithChildren<{}>) => {
    let [atakowane, setAtakowane] = useState(`564|517\n554|521`)
    let [atakujace, setAtakujace] = useState(`564|530\n567|528`)
    let [date, setDate] = useState(new Date())
    let [wrogowie, setWrogowie] = useState([] as ITribe[])
    let [update, setUpdate] = useState(new Date())
    let [sojusznicy, setSojusznicy] = useState([] as ITribe[])
    let [wrogowieNaMapie, setWrogowieNaMapie] = useState([] as { village: IVillage; player: IPlayer; tribe: ITribe }[])
    let [sojusznicyNaMapie, setSojusznicyNaMapie] = useState([] as { village: IVillage; player: IPlayer; tribe: ITribe }[])
    let [rozkazy, setRozkazy] = useState([] as IRozkaz[])
    let [nowyRozkaz, setNowyRozkaz] = useState({ id: null, source: null, target: null, typRozkazu: null, widoczny: false } as IRozkaz)
    let contexts = {
        app: useContext(AppContext),
        player: useContext(PlayerContext),
        tribe: useContext(TribeContext),
        village: useContext(VillageContext),
    }
    useEffect(() => {
        let strings = atakowane
            .split('\n')
            .filter((x) => x.length > 6)
            .filter((x) => x.indexOf('|') != -1)
            .map((x) => x.trim().split('|'))
        let wrogowieTMP = [] as ITribe[]
        strings.forEach((string) => {
            let village: IVillage[] = contexts.village.items.filter((x) => x.x == string[0] && x.y == string[1])
            if (village.length == 1) {
                let player = contexts.player.items.filter((x) => x.player_id == village[0].player_id)
                if (player.length == 1) {
                    let tribe = contexts.tribe.items.filter((x) => x.tribe_id == player[0].tribe_id)
                    if (tribe.length == 1) {
                        if (wrogowieTMP.filter((x) => x.tribe_id == tribe[0].tribe_id).length == 0) {
                            wrogowieTMP.push(tribe[0])
                        }
                    }
                }
            }
        })
        if (wrogowieTMP.length > 0) {
            setWrogowie(wrogowieTMP)
        }
    }, [atakowane])
    useEffect(() => {
        let strings = atakujace
            .split('\n')
            .filter((x) => x.length > 6)
            .filter((x) => x.indexOf('|') != -1)
            .map((x) => x.trim().split('|'))
        let sojusznicyTMP = [] as ITribe[]
        strings.forEach((string) => {
            let village: IVillage[] = contexts.village.items.filter((x) => x.x == string[0] && x.y == string[1])
            if (village.length == 1) {
                let player = contexts.player.items.filter((x) => x.player_id == village[0].player_id)
                if (player.length == 1) {
                    let tribe = contexts.tribe.items.filter((x) => x.tribe_id == player[0].tribe_id)
                    if (tribe.length == 1) {
                        if (sojusznicyTMP.filter((x) => x.tribe_id == tribe[0].tribe_id).length == 0) {
                            sojusznicyTMP.push(tribe[0])
                        }
                    }
                }
            }
        })
        if (sojusznicyTMP.length > 0) {
            setSojusznicy(sojusznicyTMP)
        }
    }, [atakujace])
    useEffect(() => {
        let mapa = wrogowie.map((tribe) => {
            let pairs = contexts.player.items
                .filter((x) => x.tribe_id == tribe.tribe_id)
                .map((player) => {
                    let player_village = contexts.village.items
                        .filter((x) => x.player_id == player.player_id)
                        .map((x) => {
                            return {
                                village: x,
                                player: player,
                            }
                        })
                    return player_village
                })
                .reduce((a, b) => {
                    return [...a, ...b]
                })
            return pairs.map((x) => {
                return {
                    ...x,
                    tribe: tribe,
                }
            })
        })
        if (mapa.length > 0) {
            let reduced = mapa.reduce((a, b) => {
                return [...a, ...b]
            })
            setWrogowieNaMapie(reduced)
        }
    }, [wrogowie])
    useEffect(() => {
        let mapa = sojusznicy.map((tribe) => {
            let pairs = contexts.player.items
                .filter((x) => x.tribe_id == tribe.tribe_id)
                .map((player) => {
                    let player_village = contexts.village.items
                        .filter((x) => x.player_id == player.player_id)
                        .map((x) => {
                            return {
                                village: x,
                                player: player,
                            }
                        })
                    return player_village
                })
                .reduce((a, b) => {
                    return [...a, ...b]
                })
            return pairs.map((x) => {
                return {
                    ...x,
                    tribe: tribe,
                }
            })
        })
        if (mapa.length > 0) {
            let reduced = mapa.reduce((a, b) => {
                return [...a, ...b]
            })
            setSojusznicyNaMapie(reduced)
        }
    }, [sojusznicy])
    return (
        <div>
            <Row>
                <div>
                    <span>Lista wiosek atakowanych</span>
                    <Form>
                        <Form.Control
                            value={atakowane}
                            onChange={(e) => {
                                setAtakowane(e.target.value)
                            }}
                            as="textarea"
                            rows={10}
                            placeholder={'500|500\n300|300\n123|123\n551|642'}
                        />
                    </Form>
                </div>
                <div>
                    <span>Lista wiosek Atakujących</span>
                    <Form>
                        <Form.Control
                            value={atakujace}
                            onChange={(e) => {
                                setAtakujace(e.target.value)
                            }}
                            as="textarea"
                            rows={10}
                            placeholder={'500|500\n300|300\n123|123\n551|642'}
                        />
                    </Form>
                </div>
            </Row>
            <div id="map" style={{ marginTop: 25 }}>
                <MapContainer
                    center={[-500, 500]}
                    zoom={2}
                    maxBounds={[
                        [0, 0],
                        [-1000, 1000],
                    ]}
                    style={{ height: 800, width: 800 }}
                    crs={leaflet.CRS.Simple}
                >
                    {[-100, -200, -300, -400, -500, -600, -700, -800, -900].map((x) => {
                        return (
                            <Polygon
                                stroke={false}
                                key={`${x} ${x}`}
                                fillOpacity={0.5}
                                fillColor={'#000'}
                                positions={[
                                    [x, 1000],
                                    [x + 1, 1000],
                                    [x + 1, 0],
                                    [x, 1000],
                                ]}
                            />
                        )
                    })}
                    {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => {
                        return (
                            <Polygon
                                stroke={false}
                                key={`${x}`}
                                fillOpacity={0.5}
                                fillColor={'#000'}
                                positions={[
                                    [-1000, x],
                                    [-1000, x + 1],
                                    [0, x + 1],
                                    [0, x],
                                ]}
                            />
                        )
                    })}
                    {rozkazy
                        .filter((x) => x.widoczny)
                        .map((rozkaz) => {
                            let color = rozkaz.typRozkazu == TypRozkazu.Fake ? '#666' : rozkaz.typRozkazu == TypRozkazu.Off ? '#000' : '#f00'
                            return (
                                <Polygon
                                    key={rozkaz.id}
                                    stroke={true}
                                    color={color}
                                    fillOpacity={0.7}
                                    positions={[
                                        [-1 * Number(rozkaz.source?.village.y) + 0.35, Number(rozkaz.source?.village.x) + 0.35],
                                        [-1 * Number(rozkaz.source?.village.y) + 0.35, Number(rozkaz.source?.village.x) + 0.35],
                                        [-1 * Number(rozkaz.target?.village.y) + 0.35, Number(rozkaz.target?.village.x) + 0.35],
                                        [-1 * Number(rozkaz.target?.village.y) + 0.35, Number(rozkaz.target?.village.x) + 0.35],
                                    ]}
                                />
                            )
                        })}
                    {wrogowieNaMapie.map((x) => {
                        let color = atakowane.indexOf(`${x.village.x}|${x.village.y}`) == -1 ? '#f00' : '#ff0'
                        return (
                            <Polygon
                                stroke={false}
                                eventHandlers={{
                                    click: () => {
                                        if (nowyRozkaz.id != null) {
                                            setNowyRozkaz({
                                                ...nowyRozkaz,
                                                target: {
                                                    village: x.village,
                                                    player: x.player,
                                                },
                                            })
                                        }
                                    },
                                }}
                                key={x.village.village_id + color}
                                fillOpacity={0.7}
                                fillColor={color}
                                positions={[
                                    [-1 * Number(x.village.y), Number(x.village.x)],
                                    [-1 * Number(x.village.y) + 0.8, Number(x.village.x)],
                                    [-1 * Number(x.village.y) + 0.8, Number(x.village.x) + 0.8],
                                    [-1 * Number(x.village.y), Number(x.village.x) + 0.8],
                                ]}
                            >
                                <Tooltip>
                                    <TT>
                                        <TTRowHeader>
                                            {x.village.name} ({x.village.x}|{x.village.y})
                                        </TTRowHeader>
                                        <TTRow>
                                            <div>Punkty</div>
                                            {Intl.NumberFormat('de-DE').format(Number(x.village.points))}
                                        </TTRow>
                                        <TTRow>
                                            <div>Gracz</div>
                                            <span>
                                                {x.player.name} ({Intl.NumberFormat('de-DE').format(Number(x.player.points))} punktów |{' '}
                                                {Intl.NumberFormat('de-DE').format(Number(x.player.villages))} wioski)
                                            </span>
                                        </TTRow>
                                        <TTRow>
                                            <div>Plemie</div>
                                            {x.tribe.name} ({Intl.NumberFormat('de-DE').format(Number(x.tribe.points))} punktów)
                                        </TTRow>
                                    </TT>
                                </Tooltip>
                                {nowyRozkaz.id == null && (
                                    <Popup>
                                        <TT>
                                            <TTRow style={{ justifyContent: 'center' }}>
                                                <Button
                                                    onClick={() => {
                                                        setAtakowane(atakowane + `\n${x.village.x}|${x.village.y}`)
                                                    }}
                                                >
                                                    + Atakowani
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setAtakowane(
                                                            atakowane
                                                                .replace(`${x.village.x}|${x.village.y}`, '')
                                                                .split('\n')
                                                                .filter((x) => x.length > 6)
                                                                .join('\n')
                                                        )
                                                    }}
                                                >
                                                    - Atakowani
                                                </Button>
                                            </TTRow>
                                            {rozkazy
                                                .filter((z) => z.target?.village.village_id == x.village.village_id)
                                                .map((c) => {
                                                    return (
                                                        <TTRow style={{ justifyContent: 'center', marginTop: '25' }}>
                                                            <div style={{ minWidth: 170, textAlign: 'right' }}>
                                                                {c.typRozkazu == TypRozkazu.Fake ? 'Fake' : c.typRozkazu == TypRozkazu.Off ? 'Off' : 'Grubasek'}
                                                            </div>
                                                            <div
                                                                style={{ minWidth: 230, textAlign: 'left' }}
                                                            >{`${c.source?.player.name} (${c.source?.village.x}|${c.source?.village.y})`}</div>
                                                        </TTRow>
                                                    )
                                                })}
                                        </TT>
                                    </Popup>
                                )}
                            </Polygon>
                        )
                    })}
                    {sojusznicyNaMapie.map((x) => {
                        let color = atakujace.indexOf(`${x.village.x}|${x.village.y}`) == -1 ? '#00f' : '#0ff'
                        return (
                            <Polygon
                                stroke={false}
                                eventHandlers={{
                                    click: () => {
                                        if (nowyRozkaz.id != null) {
                                            setNowyRozkaz({
                                                ...nowyRozkaz,
                                                source: {
                                                    village: x.village,
                                                    player: x.player,
                                                },
                                            })
                                        }
                                    },
                                }}
                                key={x.village.village_id + color}
                                fillOpacity={0.7}
                                fillColor={color}
                                positions={[
                                    [-1 * Number(x.village.y), Number(x.village.x)],
                                    [-1 * Number(x.village.y) + 0.8, Number(x.village.x)],
                                    [-1 * Number(x.village.y) + 0.8, Number(x.village.x) + 0.8],
                                    [-1 * Number(x.village.y), Number(x.village.x) + 0.8],
                                ]}
                            >
                                <Tooltip>
                                    <TT>
                                        <TTRowHeader>
                                            {x.village.name} ({x.village.x}|{x.village.y})
                                        </TTRowHeader>
                                        <TTRow>
                                            <div>Punkty</div>
                                            {Intl.NumberFormat('de-DE').format(Number(x.village.points))}
                                        </TTRow>
                                        <TTRow>
                                            <div>Gracz</div>
                                            <span>
                                                {x.player.name} ({Intl.NumberFormat('de-DE').format(Number(x.player.points))} punktów |{' '}
                                                {Intl.NumberFormat('de-DE').format(Number(x.player.villages))} wioski)
                                            </span>
                                        </TTRow>
                                        <TTRow>
                                            <div>Plemie</div>
                                            {x.tribe.name} ({Intl.NumberFormat('de-DE').format(Number(x.tribe.points))} punktów)
                                        </TTRow>
                                    </TT>
                                </Tooltip>
                                {nowyRozkaz.id == null && (
                                    <Popup>
                                        <TT>
                                            <TTRow style={{ justifyContent: 'center', marginBottom: '10px' }}>
                                                <Button
                                                    onClick={() => {
                                                        setAtakujace(atakujace + `\n${x.village.x}|${x.village.y}`)
                                                    }}
                                                >
                                                    + Atakujący
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setAtakujace(
                                                            atakujace
                                                                .replace(`${x.village.x}|${x.village.y}`, '')
                                                                .split('\n')
                                                                .filter((x) => x.length > 6)
                                                                .join('\n')
                                                        )
                                                    }}
                                                >
                                                    - Atakujący
                                                </Button>
                                            </TTRow>
                                            {rozkazy
                                                .filter((z) => z.source?.village.village_id == x.village.village_id)
                                                .map((c) => {
                                                    return (
                                                        <TTRow style={{ justifyContent: 'center', marginTop: '25' }}>
                                                            <div style={{ minWidth: 170, textAlign: 'right' }}>
                                                                {c.typRozkazu == TypRozkazu.Fake ? 'Fake' : c.typRozkazu == TypRozkazu.Off ? 'Off' : 'Grubasek'}
                                                            </div>
                                                            <div
                                                                style={{ minWidth: 230, textAlign: 'left' }}
                                                            >{`${c.target?.player.name} (${c.target?.village.x}|${c.target?.village.y})`}</div>
                                                        </TTRow>
                                                    )
                                                })}
                                        </TT>
                                    </Popup>
                                )}
                            </Polygon>
                        )
                    })}
                </MapContainer>
            </div>
            <ButtonContainer>
                <Button
                    onClick={() => {
                        setNowyRozkaz({
                            id: Date.now(),
                            source: null,
                            target: null,
                            typRozkazu: TypRozkazu.Fake,
                            widoczny: true,
                        })
                    }}
                >
                    Fake
                </Button>
                <Button
                    onClick={() => {
                        setNowyRozkaz({
                            id: Date.now(),
                            source: null,
                            target: null,
                            typRozkazu: TypRozkazu.Off,
                            widoczny: true,
                        })
                    }}
                >
                    Atak
                </Button>
                <Button
                    onClick={() => {
                        setNowyRozkaz({
                            id: Date.now(),
                            source: null,
                            target: null,
                            typRozkazu: TypRozkazu.Szlachta,
                            widoczny: true,
                        })
                    }}
                >
                    Grubas
                </Button>
            </ButtonContainer>
            <div>
                {nowyRozkaz.id != null && (
                    <TTable style={{ width: '100%', marginTop: 20, marginBottom: 30 }}>
                        <tbody>
                            <tr>
                                <td>{nowyRozkaz.typRozkazu == TypRozkazu.Fake ? 'Fake' : nowyRozkaz.typRozkazu == TypRozkazu.Off ? 'Off' : 'Grubasek'}</td>
                                <td>
                                    {nowyRozkaz.target && `${nowyRozkaz.target?.player.name} (${nowyRozkaz.target?.village.x}|${nowyRozkaz.target?.village.y})`}
                                </td>
                                <td>
                                    {nowyRozkaz.source && `${nowyRozkaz.source?.player.name} (${nowyRozkaz.source?.village.x}|${nowyRozkaz.source?.village.y})`}
                                </td>
                                <td
                                    style={{ color: 'green', cursor: 'pointer', maxWidth: 70 }}
                                    onClick={() => {
                                        if (nowyRozkaz.source != null && nowyRozkaz.target != null) {
                                            setRozkazy([...rozkazy, nowyRozkaz])
                                            setNowyRozkaz({
                                                id: null,
                                                source: null,
                                                target: null,
                                                typRozkazu: null,
                                                widoczny: false,
                                            })
                                        }
                                    }}
                                >
                                    Akceptuj
                                </td>
                                <td
                                    style={{ color: 'red', cursor: 'pointer', maxWidth: 70 }}
                                    onClick={() => {
                                        setNowyRozkaz({
                                            id: null,
                                            source: null,
                                            target: null,
                                            typRozkazu: TypRozkazu.Szlachta,
                                            widoczny: false,
                                        })
                                    }}
                                >
                                    Anuluj
                                </td>
                            </tr>
                        </tbody>
                    </TTable>
                )}
                {rozkazy.length > 0 && (
                    <TTable>
                        <thead>
                            <tr>
                                <th>Pokaż</th>
                                <th>Typ Rozkazu</th>
                                <th>Cel</th>
                                <th>Atakujący</th>
                                <th>Czas Podrózy</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rozkazy
                                .sort((a, b) => ((a.id || 0) > (b.id || 0) ? 1 : -1))
                                .map((x) => {
                                    let distans = 0
                                    if (x.target != null && x.source != null) {
                                        let lengX = Math.abs(Number(x.target.village.x) - Number(x.source.village.x))
                                        let lengY = Math.abs(Number(x.target.village.y) - Number(x.source.village.y))
                                        distans = Math.sqrt(Math.pow(lengX, 2) + Math.pow(lengY, 2))
                                    }
                                    let multiplier = x.typRozkazu == TypRozkazu.Szlachta ? 35 : 30
                                    let czas = new Date(Math.floor(distans * multiplier * 60 * 1000)).toISOString().substr(11, 8)
                                    return (
                                        <tr key={x.id}>
                                            <th>
                                                <Form.Check
                                                    onChange={(e) => {
                                                        let r = rozkazy.map((roz) => {
                                                            if (roz.id == x.id) {
                                                                return {
                                                                    ...roz,
                                                                    widoczny: !roz.widoczny,
                                                                }
                                                            } else {
                                                                return roz
                                                            }
                                                        })
                                                        setRozkazy(r)
                                                    }}
                                                    checked={x.widoczny}
                                                ></Form.Check>
                                            </th>
                                            <td>{x.typRozkazu == TypRozkazu.Fake ? 'Fake' : x.typRozkazu == TypRozkazu.Off ? 'Off' : 'Grubasek'}</td>
                                            <td>{`${x.target?.player.name} (${x.target?.village.x}|${x.target?.village.y})`}</td>
                                            <td>{`${x.source?.player.name} (${x.source?.village.x}|${x.source?.village.y})`}</td>
                                            <td>{czas}</td>
                                            <td
                                                style={{ color: 'red', cursor: 'pointer' }}
                                                onClick={() => {
                                                    setRozkazy(rozkazy.filter((a) => a.id != x.id))
                                                }}
                                            >
                                                Usuń
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </TTable>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30, marginBottom: 50 }}>
                <div>Kiedy atakujemy doktorku?</div>
                <DatePicker
                    selected={date}
                    onChange={(d) => {
                        if (d) {
                            setDate(d)
                        }
                    }}
                    showTimeSelect
                    dateFormat={'hh:mm dd/mm/yyyy'}
                ></DatePicker>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, marginBottom: 50 }}>
                <Button
                    onClick={() => {
                        let uniqueSources = rozkazy
                            .map((x) => x.source?.player.player_id)
                            .filter((x, i, a) => {
                                return a.indexOf(x) == i
                            })
                            .filter((x) => typeof x !== 'undefined')
                        let uniqueTargets = rozkazy
                            .map((x) => x.target?.player.player_id)
                            .filter((x, i, a) => {
                                return a.indexOf(x) == i
                            })
                            .filter((x) => typeof x !== 'undefined')

                        let playerMessages: PlayerMessage[] = [] as PlayerMessage[]
                        uniqueSources.forEach((source) => {
                            let output: PlayerMessage = {
                                Player: contexts.player.items.filter((x) => x.player_id == source)[0],
                                Targets: rozkazy
                                    .filter((x) => x.source?.player.player_id == source)
                                    .map((rozkaz) => {
                                        let distans = 0
                                        if (rozkaz.target != null && rozkaz.source != null) {
                                            let lengX = Math.abs(Number(rozkaz.target.village.x) - Number(rozkaz.source.village.x))
                                            let lengY = Math.abs(Number(rozkaz.target.village.y) - Number(rozkaz.source.village.y))
                                            distans = Math.sqrt(Math.pow(lengX, 2) + Math.pow(lengY, 2))
                                        }
                                        let multiplier = rozkaz.typRozkazu == TypRozkazu.Szlachta ? 35 : 30
                                        let czas = new Date(Math.floor(distans * multiplier * 60 * 1000)).getTime()
                                        return {
                                            target: `${rozkaz.target?.village.x}|${rozkaz.target?.village.y}`,
                                            time: new Date(date.getTime() - czas),
                                            sourceId: rozkaz.source?.village.village_id,
                                            targetId: rozkaz.target?.village.village_id,
                                            type: rozkaz.typRozkazu == TypRozkazu.Fake ? 'Fake' : rozkaz.typRozkazu == TypRozkazu.Off ? 'Off' : 'Grubasek',
                                            helpers: rozkazy
                                                .filter((rozka) => rozka.target?.village.village_id == rozkaz.target?.village.village_id)
                                                .map((mapper) => mapper.source?.player || null),
                                        }
                                    }),
                            }
                            playerMessages.push(output)
                        })

                        let output = ``
                        playerMessages.forEach((message) => {
                            let innerOutput = `Wiadomość do gracza: ${message.Player.name}\n\n`
                            innerOutput += `Twoje cele akcji na: ${date.toLocaleString()}\n\n`
                            message.Targets.sort((a, b) => {
                                return a.time > b.time ? 1 : -1
                            }).forEach((target) => {
                                innerOutput += `[b]${target.time.toLocaleString()}[/b] wysyłasz [b]${target.type}[/b] [coord]${target.target}[/coord]\n`
                                innerOutput += `Tę wioskę jednocześnie atakują: ${target.helpers
                                    .map((x) => x?.name)
                                    .filter((x, i, a) => {
                                        return a.indexOf(x) == i
                                    })
                                    .filter((x) => x != message.Player.name)
                                    .map((helper) => {
                                        return `[player]${helper}[/player]`
                                    })
                                    .join(', ')}\n`
                                innerOutput += `[url=https://${contexts.app.world.value}.plemiona.pl/game.php?village=${target.sourceId}&screen=place&target=${target.targetId}]Kliknij aby wysłać[/url]\n\n`
                            })
                            output += `${innerOutput}\n\n\n\n\n`
                        })

                        let element = document.createElement('a')
                        element.download = `Rozpiska ${date.toLocaleString()}.txt`
                        element.href = `data:text/plain; charset=utf-8,%EF%BB%BF${encodeURIComponent(output)}`
                        document.body.appendChild(element)
                        element.click()
                    }}
                >
                    Eksportuj
                </Button>
            </div>
        </div>
    )
}

export interface PlayerMessage {
    Player: IPlayer
    Targets: {
        target: string
        sourceId: string | undefined
        targetId: string | undefined
        time: Date
        type: string
        helpers: (IPlayer | null)[]
    }[]
}
export const TTable = styled.table`
    width: 100%;

    & > td {
        padding: 5px 10px;
    }
`
export default Panel
export const ButtonContainer = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 15px;
    & > div {
        width: 40%;
        text-align: center;
    }
`
export const TT = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
`
export const TTRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: flex-start;
    gap: 10px;
`
export const TTRowHeader = styled(TTRow)`
    font-weight: bold;
`

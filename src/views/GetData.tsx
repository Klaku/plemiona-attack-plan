import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { AppContext, AppView } from '../context/App.context'
import styled from 'styled-components'
import { ITribe, TribeContext } from '../context/Tribe.context'
import { IPlayer, PlayerContext } from '../context/Player.context'
import { IVillage, VillageContext } from '../context/Village.context'
const GetData = (props: PropsWithChildren<{ view: AppView }>) => {
    const context = useContext(AppContext)
    const [text, setText] = useState('')
    const [tribes, setTribes] = useState([] as ITribe[])
    const [players, setPlayers] = useState([] as IPlayer[])
    const [villages, setVillages] = useState([] as IVillage[])
    const cont = {
        tribe: useContext(TribeContext),
        player: useContext(PlayerContext),
        village: useContext(VillageContext),
    }
    useEffect(() => {
        let data = text.split('\n').map((row) => {
            let cells = row.split(',').map((cell) => {
                return decodeURIComponent(cell.trim().replace(/\+/gm, ' '))
            })
            switch (props.view) {
                case AppView.GetTribeInfo:
                    return {
                        tribe_id: cells[0],
                        name: cells[1],
                        tag: cells[2],
                        members: cells[3],
                        villages: cells[4],
                        points: cells[5],
                        all_points: cells[6],
                        rank: cells[7],
                    }
                case AppView.GetPlayerInfo:
                    return {
                        player_id: cells[0],
                        name: cells[1],
                        tribe_id: cells[2],
                        villages: cells[3],
                        points: cells[4],
                        rank: cells[5],
                    }
                case AppView.GetVillageInfo:
                    return {
                        village_id: cells[0],
                        name: cells[1],
                        x: cells[2],
                        y: cells[3],
                        player_id: cells[4],
                        points: cells[5],
                        rank: cells[6],
                    }
            }
        })
        switch (props.view) {
            case AppView.GetTribeInfo:
                setTribes(data as ITribe[])
                break
            case AppView.GetPlayerInfo:
                setPlayers(data as IPlayer[])
                break
            case AppView.GetVillageInfo:
                setVillages(data as IVillage[])
                break
        }
    }, [text])
    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Text>
                        <span>Kliknij w </span>
                        {context.view == AppView.GetTribeInfo && (
                            <a target={'_blank'} href={`https://${context.world.value}.plemiona.pl/map/ally.txt`}>
                                link
                            </a>
                        )}
                        {context.view == AppView.GetPlayerInfo && (
                            <a target={'_blank'} href={`https://${context.world.value}.plemiona.pl/map/player.txt`}>
                                link
                            </a>
                        )}
                        {context.view == AppView.GetVillageInfo && (
                            <a target={'_blank'} href={`https://${context.world.value}.plemiona.pl/map/village.txt`}>
                                link
                            </a>
                        )}
                        , skopiuj wszystko i wklej poniżej.
                    </Form.Text>
                    <Form.Control
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                        as="textarea"
                    />
                </Form.Group>
            </Form>
            <div style={{ textAlign: 'right', marginTop: 15 }}>
                <Button
                    onClick={() => {
                        switch (props.view) {
                            case AppView.GetTribeInfo:
                                cont.tribe.setItems(tribes)
                                context.setView(AppView.GetPlayerInfo)
                                break
                            case AppView.GetPlayerInfo:
                                cont.player.setItems(players)
                                context.setView(AppView.GetVillageInfo)
                                break
                            case AppView.GetVillageInfo:
                                cont.village.setItems(villages)
                                context.setView(AppView.Panel)
                                break
                        }
                    }}
                >
                    Dalej
                </Button>
            </div>
        </div>
    )
}

export default GetData

export const ListContainer = styled.table`
    & td {
        padding: 0 5px;
    }

    & th {
        padding: 0 5px;
    }
`

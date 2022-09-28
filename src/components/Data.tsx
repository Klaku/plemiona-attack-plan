import React, { PropsWithChildren, useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { DataContext } from '../contexts/Data.Context'
import { ScreenOptions, SettingsContext } from '../contexts/Settings.Context'
import { PlayerConverter, TribeConverter, VillageConverter } from '../helpers/Converters'
import CoppyFrame from './CoppyFrame'

const Data = (props: PropsWithChildren<{}>) => {
    const context = {
        data: React.useContext(DataContext),
        settings: React.useContext(SettingsContext),
    }
    const [villages, setVillages] = useState('')
    const [players, setPlayers] = useState('')
    const [tribes, setTribes] = useState('')
    const onReadyClick = () => {
        context.data.player.setItems(
            players
                .split('\n')
                .filter((x) => x.length > 10)
                .map((x) => {
                    return PlayerConverter(x)
                })
        )
        context.data.tribe.setItems(
            tribes
                .split('\n')
                .filter((x) => x.length > 10)
                .map((x) => {
                    return TribeConverter(x)
                })
        )
        context.data.village.setItems(
            villages
                .split('\n')
                .filter((x) => x.length > 10)
                .map((x) => {
                    return VillageConverter(x)
                })
        )
        context.settings.screen.update(ScreenOptions.App)
    }
    return (
        <Container>
            <Wrapper>
                <CoppyFrame path={`https://${context.settings.world.value}.plemiona.pl/map/village.txt`} value={villages} onChange={setVillages} />
                <CoppyFrame path={`https://${context.settings.world.value}.plemiona.pl/map/player.txt`} value={players} onChange={setPlayers} />
                <CoppyFrame path={`https://${context.settings.world.value}.plemiona.pl/map/ally.txt`} value={tribes} onChange={setTribes} />
            </Wrapper>
            <ButtonContainer>
                <Button disabled={villages.length < 50 || tribes.length < 50 || players.length < 50} onClick={onReadyClick}>
                    Gotowe
                </Button>
            </ButtonContainer>
        </Container>
    )
}

export default Data
export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 15px;
`
export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: 'center';
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100vw;
    align-items: center;
    gap: 15px;
`

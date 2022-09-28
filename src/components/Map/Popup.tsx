import React, { PropsWithChildren } from 'react'
import { IVillage } from '../../types/IVillage'
import { Popup as P } from 'react-leaflet'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { DataContext } from '../../contexts/Data.Context'
import { IPlayer } from '../../types/IPlayer'
import { PlanerContext } from '../../contexts/Planer.Context'
import { MapContext } from '../../contexts/Map.Context'
const Popup = (
    props: PropsWithChildren<{
        village: IVillage
    }>
) => {
    const context = {
        data: React.useContext(DataContext),
        planer: React.useContext(PlanerContext),
        map: React.useContext(MapContext),
    }
    const player = (context.data.player.items as IPlayer[]).filter((x) => x.player_id_num == props.village.player_id_num)[0]
    const Add = () => {
        context.planer.setActiveTarget({
            village: props.village,
            player: player,
        })
        context.map.setMapKey(new Date())
    }
    return (
        <P>
            {player && (
                <Wrapper>
                    <Button onClick={Add}>Wyświetl na Liście</Button>
                </Wrapper>
            )}
        </P>
    )
}

export default Popup
export const Wrapper = styled.div`
    padding: 15px;
`

import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { DataContext } from '../../contexts/Data.Context'
import { MapContext } from '../../contexts/Map.Context'
import { OperationType, PlanerContext } from '../../contexts/Planer.Context'
import { ITribe } from '../../types/ITribe'

const Targets = (props: PropsWithChildren<{}>) => {
    const context = {
        planer: React.useContext(PlanerContext),
        map: React.useContext(MapContext),
        data: React.useContext(DataContext),
    }
    const uniqueTargets = context.planer.items.filter((x, i, a) => {
        return a.map((x) => x.target.village.village_id_num).indexOf(x.target.village.village_id_num) == i
    })
    const tribes = context.data.tribe.items as ITribe[]
    return (
        <Wrapper>
            <Title>Cele Akcji</Title>
            {uniqueTargets.map((x) => {
                return (
                    <ListItem
                        onClick={() => {
                            context.planer.setActiveTarget(x.target)
                            context.map.setMapKey(new Date())
                        }}
                    >
                        <Header>
                            <div>{tribes.filter((tribe) => tribe.tribe_id_num == x.target.player.tribe_id_num)[0].tag}</div>
                            <div style={{ fontWeight: 600 }}>{x.target.player.name}</div>
                            <div>{`(${x.target.village.x_num}|${x.target.village.y_num})`}</div>
                        </Header>
                        <StatContainer>
                            <span style={{ color: '#666' }}>
                                {context.planer.items.filter((a) => a.target.village.village_id_num == x.target.village.village_id_num && a.OperationType == OperationType.Fake).length}
                            </span>
                            {` / `}
                            <span style={{ color: '#0d0' }}>
                                {context.planer.items.filter((a) => a.target.village.village_id_num == x.target.village.village_id_num && a.OperationType == OperationType.Atak).length}
                            </span>
                            {` / `}
                            <span style={{ color: '#d00' }}>
                                {context.planer.items.filter((a) => a.target.village.village_id_num == x.target.village.village_id_num && a.OperationType == OperationType.Szlachta).length}
                            </span>
                        </StatContainer>
                    </ListItem>
                )
            })}
        </Wrapper>
    )
}

export default Targets
export const Header = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`
export const StatContainer = styled.div`
    font-weight: 600;
    width: 100%;
    border-top: 1px solid #ddd;
`
export const ListItem = styled.div`
    padding: 5px 5px;
    margin: 5px;
    display: flex;
    border-left: 2px solid #666;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
export const Title = styled.div`
    width: 100%;
    font-size: 16px;
    padding: 0 5px;
    font-weight: 600;
    color: #666;
`

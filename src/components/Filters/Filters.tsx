import React, { PropsWithChildren, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import TribeEditModal from './TribeEdit.modal'
import { FilterContext } from '../../contexts/Filter'
import OffensiveVillagesModal from './OffensiveVillages.modal'
import TargetVillagesModal from './TargetVillages.modal'
import { MapContext } from '../../contexts/Map'
const Filters = (props: PropsWithChildren<{}>) => {
    const [isTribeEditModalVisible, setIsTribeEditModalVisible] = useState(false)
    const [isOffensiveVillagesModalVisible, setIsOffensiveVillagesModalVisible] = useState(false)
    const [isTargetVillagesModalVisible, setIsTargetVillagesModalVisible] = useState(false)
    const context = {
        filter: React.useContext(FilterContext),
        map: React.useContext(MapContext),
    }
    return (
        <Wrapper>
            <Title>Plemiona</Title>
            <ListContainer>
                {context.filter.tribes[0].map((tribe) => {
                    return (
                        <TribeWrapper key={tribe.tribe_id}>
                            <span>{`${tribe.tag}`}</span>
                            <ColorIndicator style={{ backgroundColor: tribe.color }}></ColorIndicator>
                        </TribeWrapper>
                    )
                })}
                <Button variant="outline-secondary" size={'sm'} onClick={() => setIsTribeEditModalVisible(true)}>
                    Dostosuj Plemiona
                </Button>
                <TribeEditModal isVisible={isTribeEditModalVisible} setIsVisible={setIsTribeEditModalVisible} />
            </ListContainer>
            <Title>Wioski Ofensywne</Title>
            <ListContainer>
                <Button variant="outline-secondary" size={'sm'} onClick={() => setIsOffensiveVillagesModalVisible(true)}>
                    Wprowadź
                </Button>
                <OffensiveVillagesModal isVisible={isOffensiveVillagesModalVisible} setIsVisible={setIsOffensiveVillagesModalVisible} />
            </ListContainer>
            <Title>Cele akcji</Title>
            <ListContainer>
                <Button variant="outline-secondary" size={'sm'} onClick={() => setIsTargetVillagesModalVisible(true)}>
                    Wprowadź
                </Button>
                <TargetVillagesModal isVisible={isTargetVillagesModalVisible} setIsVisible={setIsTargetVillagesModalVisible} />
            </ListContainer>
            <ListContainer>
                <Button variant="outline-primary" size={'sm'} onClick={() => context.map.key[1](Date.now())}>
                    Rysuj Mapę
                </Button>
            </ListContainer>
        </Wrapper>
    )
}

export default Filters
export const ColorIndicator = styled.div`
    width: 16px;
    height: 16px;
`
export const TribeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: ${(props) => props.theme.light};
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
`

export const Title = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => props.theme.dark};
    padding: 5px 15px;
    border-bottom: 1px solid ${(props) => props.theme.gray};
`
export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 15px;
    margin-bottom: 25px;
`

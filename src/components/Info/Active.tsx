import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { OperationType, PlanerContext } from '../../contexts/Planer.Context'
import { BsChevronDown } from 'react-icons/bs'
import Operation from './Operation'
import { Button, ButtonGroup } from 'react-bootstrap'
import { MapContext } from '../../contexts/Map.Context'
const Active = (props: PropsWithChildren<{}>) => {
    const context = React.useContext(PlanerContext)
    const mapContext = React.useContext(MapContext)
    return (
        <Wrapper>
            <Header>
                <TargetInfo>
                    <div>{`${context.activeTarget?.village.name} (${Intl.NumberFormat('de-DE').format(context.activeTarget?.village.points_num || 0)} Punktów)`}</div>
                    <div>{context.activeTarget?.player.name}</div>
                </TargetInfo>
            </Header>
            <ButtonContainer>
                <ButtonGroup size="sm">
                    <Button
                        onClick={() => {
                            context.setOperationType(OperationType.Fake)
                        }}
                        variant={context.operationType == OperationType.Fake ? 'primary' : 'secondary'}
                    >
                        Fake
                    </Button>
                    <Button
                        onClick={() => {
                            context.setOperationType(OperationType.Atak)
                        }}
                        variant={context.operationType == OperationType.Atak ? 'primary' : 'secondary'}
                    >
                        Atak
                    </Button>
                    <Button
                        onClick={() => {
                            context.setOperationType(OperationType.Szlachta)
                        }}
                        variant={context.operationType == OperationType.Szlachta ? 'primary' : 'secondary'}
                    >
                        Gruby
                    </Button>
                </ButtonGroup>
                <Button
                    size={'sm'}
                    onClick={() => {
                        context.setActiveTarget(null)
                        mapContext.setMapKey(new Date())
                    }}
                    variant="success"
                >
                    Zamknij
                </Button>
            </ButtonContainer>
            <Content>
                {context.items
                    .filter((x) => x.target.village.village_id_num == context.activeTarget?.village.village_id_num)
                    .map((target) => {
                        return <Operation target={target} key={target.Id} />
                    })}
            </Content>
        </Wrapper>
    )
}

export default Active
export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 5px 0;
    gap: 5px;
    justify-content: center;
    border-bottom: 1px solid #666;
    border-top: 1px solid #666;
`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`
export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const TargetInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

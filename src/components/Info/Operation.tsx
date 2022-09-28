import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { ITarget, OperationType, PlanerContext } from '../../contexts/Planer.Context'
import { CloseButton } from 'react-bootstrap'
const Operation = (
    props: PropsWithChildren<{
        target: ITarget
    }>
) => {
    const context = {
        planer: React.useContext(PlanerContext),
    }
    return (
        <Wrapper style={{ backgroundColor: props.target.OperationType == OperationType.Fake ? '#66666635' : props.target.OperationType == OperationType.Atak ? '#00ff0025' : '#ff000025' }}>
            <Row>
                <DataWrapper>
                    <div>{`${props.target.source.player.name} (${props.target.source.village.x_num}|${props.target.source.village.y_num})`}</div>
                    <div>{props.target.dateSend.toLocaleString()}</div>
                    <div>{props.target.dateApproach.toLocaleString()}</div>
                </DataWrapper>
                <div>
                    <CloseButton
                        onClick={() => {
                            context.planer.setItems(context.planer.items.filter((x) => x.Id != props.target.Id))
                        }}
                    />
                </div>
            </Row>
        </Wrapper>
    )
}

export default Operation
export const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px solid #666;
    padding: 5px;
`

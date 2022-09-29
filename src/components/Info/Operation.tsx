import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { CalculateSendTime, ITarget, OperationType, PlanerContext } from '../../contexts/Planer.Context'
import { CloseButton } from 'react-bootstrap'
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs'
const Operation = (
    props: PropsWithChildren<{
        target: ITarget
    }>
) => {
    const context = {
        planer: React.useContext(PlanerContext),
    }
    const Move = (up: boolean) => {
        let items = context.planer.items
            .filter((x) => x.target.village.village_id_num == props.target.target.village.village_id_num)
            .sort((a, b) => {
                return a.dateApproach > b.dateApproach ? 1 : -1
            })
        let currentIndex = items.map((x) => x.Id).indexOf(props.target.Id)
        if ((currentIndex < 1 && up) || (currentIndex - 1 == items.length && !up)) {
            console.warn('Exception')
            return
        }
        let otherItem = items[currentIndex - (up ? 1 : -1)]
        let currentItem = items[currentIndex]
        let tmpAproach = otherItem.dateApproach
        otherItem.dateApproach = currentItem.dateApproach
        currentItem.dateApproach = tmpAproach
        currentItem.dateSend = CalculateSendTime(currentItem)
        otherItem.dateSend = CalculateSendTime(otherItem)
        context.planer.setItems([...context.planer.items.filter((x) => x.Id != currentItem.Id && x.Id != otherItem.Id), currentItem, otherItem])
    }

    return (
        <Wrapper style={{ backgroundColor: props.target.OperationType == OperationType.Fake ? '#66666635' : props.target.OperationType == OperationType.Atak ? '#00ff0025' : '#ff000025' }}>
            <Row>
                <DataWrapper>
                    <TitleContainer>
                        <div>{props.target.source.player.name}</div>
                        <div>{`(${props.target.source.village.x_num}|${props.target.source.village.y_num})`}</div>
                    </TitleContainer>
                    <table>
                        <tbody>
                            <tr>
                                <CustomTd>
                                    <DateContainer>Atak:</DateContainer>
                                </CustomTd>
                                <td>
                                    <DateContainer>{props.target.dateSend.toLocaleString()}</DateContainer>
                                </td>
                            </tr>
                            <tr>
                                <CustomTd>
                                    <DateContainer>Dotarcie:</DateContainer>
                                </CustomTd>
                                <td>
                                    <DateContainer>{props.target.dateApproach.toLocaleString()}</DateContainer>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </DataWrapper>
                <ActionContainer>
                    <CloseButton
                        onClick={() => {
                            context.planer.setItems(context.planer.items.filter((x) => x.Id != props.target.Id))
                        }}
                    />
                    <IconContainer>
                        <BsArrowUpShort
                            onClick={() => {
                                Move(true)
                            }}
                        />
                        <BsArrowDownShort
                            onClick={() => {
                                Move(false)
                            }}
                        />
                    </IconContainer>
                </ActionContainer>
            </Row>
        </Wrapper>
    )
}

export default Operation
export const CustomTdProperty = styled.div``
export const CustomTd = styled.td`
    padding: 0 5px;
`
export const TitleContainer = styled.div`
    font-size: 14px;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`
export const DateContainer = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: #666;
`
export const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    align-items: center;
    font-size: 18px;
    & > * {
        cursor: pointer;
    }
`
export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

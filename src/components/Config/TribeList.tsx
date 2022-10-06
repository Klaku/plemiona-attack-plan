import React, { PropsWithChildren, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataContext } from '../../contexts/Data.Context'
import { ISelectedTribe, ITribe } from '../../types/ITribe'
import { SketchPicker as ColorPicker } from 'react-color'
import { Button, CloseButton, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { MapContext } from '../../contexts/Map.Context'
const TribeList = (props: PropsWithChildren<{}>) => {
    const context = React.useContext(DataContext)
    const map_context = React.useContext(MapContext)
    const [selected, setSelected] = useState([] as ISelectedTribe[])
    useEffect(() => {
        setSelected(map_context.tribes)
        setFilter('');
    }, [map_context.tribes])
    const tribes = context.tribe.items as ITribe[]
    const [filter, setFilter] = useState('')
    const Save = () => {
        map_context.setTribes(selected)
        map_context.setMapKey(new Date())
    }
    return (
        <Wrapper>
            <InnerWrapper>
                {selected.map((tribe) => {
                    return (
                        <SelectedTribe key={tribe.tribe_id_num}>
                            <div>
                                {tribe.tag}{' '}
                                <CloseButton
                                    style={{ width: 6, height: 6 }}
                                    onClick={() => {
                                        setSelected(selected.filter((x) => x.tribe_id_num != tribe.tribe_id_num))
                                    }}
                                />
                            </div>
                            <span>
                                <OverlayTrigger
                                    trigger="click"
                                    placement="right"
                                    rootClose={true}
                                    overlay={
                                        <Popover>
                                            <ColorPicker
                                                color={tribe.color}
                                                onChange={(e) => {
                                                    setSelected(
                                                        selected.map((x) => {
                                                            if (x.tribe_id_num == tribe.tribe_id_num) {
                                                                x.color = e.hex
                                                            }
                                                            return x
                                                        })
                                                    )
                                                }}
                                            />
                                        </Popover>
                                    }
                                >
                                    <div style={{ width: 16, height: 16, backgroundColor: tribe.color, cursor: 'pointer' }}></div>
                                </OverlayTrigger>
                            </span>
                        </SelectedTribe>
                    )
                })}
            </InnerWrapper>
            <InnerWrapper>
                <Form>
                    <Form.Control
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                        }}
                        size={'sm'}
                        type={'text'}
                    />
                </Form>
            </InnerWrapper>
            <InnerWrapper>
                {tribes
                    .sort((a, b) => {
                        return a.points_num > b.points_num ? -1 : 1
                    })
                    .filter((tribe) => {
                        return tribe.tag.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1 || tribe.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) != -1
                    })
                    .slice(0, 10)
                    .map((tribe) => {
                        return (
                            <TribeListItem
                                key={tribe.tribe_id_num}
                                onClick={() => {
                                    if (selected.filter((selected_tribe) => selected_tribe.tribe_id_num == tribe.tribe_id_num).length == 0) {
                                        setSelected([...selected, { ...tribe, color: '#000' }])
                                    }
                                }}
                            >
                                <div>{tribe.tag}</div>
                                <div>{Intl.NumberFormat('de-DE').format(tribe.points_num)}</div>
                            </TribeListItem>
                        )
                    })}
            </InnerWrapper>
            <InnerWrapper>
                <Button variant={'secondary'} size={'sm'} onClick={Save}>
                    Zapisz
                </Button>
            </InnerWrapper>
        </Wrapper>
    )
}

export default TribeList
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
export const InnerWrapper = styled(Wrapper)`
    gap: 0px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Tribe = styled(Row)``
const SelectedTribe = styled(Tribe)`
    padding: 5px;
    & > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        line-height: 16px;
        gap: 5px;
    }
`
const TribeListItem = styled(Tribe)`
    padding: 2px 5px;
    cursor: pointer;

    &:hover {
        background-color: #dce4e3;
    }
`

import React, { PropsWithChildren, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { DataContext } from '../../contexts/Data.Context'
import { MapContext } from '../../contexts/Map.Context'
import { ISelectedVillage, IVillage } from '../../types/IVillage'

const ZaznaczoneWioski = (
    props: PropsWithChildren<{
        onChange: (value: IVillage[]) => void
    }>
) => {
    const context = {
        map: React.useContext(MapContext),
        data: React.useContext(DataContext),
    }
    const villages = context.data.village.items as IVillage[]
    const [string, setString] = useState('')
    const Save = () => {
        props.onChange(
            string
                .split(',')
                .filter((x) => x.trim().match(/^\d{3}\|\d{3}/gm))
                .map((cords) => {
                    let d = cords.split('|').map((a) => Number(a))
                    let village = villages.filter((v) => v.x_num == d[0] && v.y_num == d[1])[0]
                    if (typeof village != 'undefined') {
                        return village
                    } else {
                        return null
                    }
                })
                .filter((x) => x != null) as IVillage[]
        )
        context.map.setMapKey(new Date())
    }
    return (
        <Wrapper>
            <Form.Control
                as="textarea"
                rows={3}
                value={string}
                onChange={(e) => {
                    setString(e.target.value)
                }}
            ></Form.Control>
            <Button size={'sm'} variant="secondary" onClick={Save}>
                Zapisz
            </Button>
        </Wrapper>
    )
}

export default ZaznaczoneWioski

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

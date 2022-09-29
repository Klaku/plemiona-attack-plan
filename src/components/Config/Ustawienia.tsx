import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { SettingsContext } from '../../contexts/Settings.Context'
const Ustawienia = (props: PropsWithChildren<{}>) => {
    const [start, setStart] = useState('')
    const context = {
        settings: React.useContext(SettingsContext),
    }
    useEffect(() => {
        let today = context.settings.attack_start.value
        setStart(
            `${('0' + today.getDate()).slice(-2)}/${('0' + (today.getMonth() + 1)).slice(-2)} ${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}:${(
                '0' + today.getSeconds()
            ).slice(-2)}:000`
        )
    }, [])
    const ValidateDate = () => {
        if (start.match(/^\d{2}\/\d{2} \d{2}:\d{2}:\d{2}:\d{3}/gm)) {
            let date = start.split(' ')[0]
            let time = start.split(' ')[1]
            context.settings.attack_start.update(
                new Date(
                    new Date().getFullYear(),
                    Number(date.split('/')[1]) - 1,
                    Number(date.split('/')[0]),
                    Number(time.split(':')[0]),
                    Number(time.split(':')[1]),
                    Number(time.split(':')[2]),
                    Number(time.split(':')[3])
                )
            )
        } else {
            let today = new Date()
            setStart(
                `${('0' + today.getDate()).slice(-2)}/${('0' + today.getMonth()).slice(-2)} ${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}:${(
                    '0' + today.getSeconds()
                ).slice(-2)}:000`
            )
        }
    }
    return (
        <Wrapper>
            <CustomForm>
                <Form.Label>Rozpoczęcie Akcji</Form.Label>
                <Form.Control
                    type="text"
                    value={start}
                    onBlur={ValidateDate}
                    style={{ textAlign: 'center' }}
                    onChange={(e) => {
                        setStart(e.target.value)
                    }}
                ></Form.Control>
                <Form.Text>Czas pierwszego ataku</Form.Text>
            </CustomForm>
            <CustomForm>
                <Form.Label>Odstęp pomiędzy komendami (ms)</Form.Label>
                <Form.Control
                    type="number"
                    value={context.settings.delay.value}
                    onBlur={ValidateDate}
                    style={{ textAlign: 'center' }}
                    onChange={(e) => {
                        context.settings.delay.update(Number(e.target.value))
                    }}
                ></Form.Control>
                <Form.Text>Czas pierwszego ataku</Form.Text>
            </CustomForm>
            <CustomForm>
                <Button variant="default">Format Widomości do Gracza</Button>
            </CustomForm>
        </Wrapper>
    )
}

export default Ustawienia

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
export const CustomForm = styled(Wrapper)`
    margin-bottom: 15px;
`

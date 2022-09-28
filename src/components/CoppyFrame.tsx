import React, { PropsWithChildren } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

const CoppyFrame = (
    props: PropsWithChildren<{
        path: string
        value: string
        onChange: (value: string) => void
    }>
) => {
    return (
        <Wrapper>
            <iframe src={props.path} />
            <Form>
                <Form.Control
                    value={props.value}
                    onChange={(e) => {
                        props.onChange(e.target.value)
                    }}
                    as="textarea"
                    rows={10}
                    placeholder="Wklej tutaj zawartość powyższego okna"
                />
            </Form>
        </Wrapper>
    )
}

export default CoppyFrame

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: 'flex-start';
    width: 100%;
    & > iframe {
        max-height: calc(50vh - 55px);
        height: calc(50vh - 85px);
        padding: 10px;
    }
`

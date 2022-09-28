import React, { PropsWithChildren } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import context from 'react-bootstrap/esm/AccordionContext'
import { SketchPicker as ColorPicker } from 'react-color'
const HeaderColorPicker = (
    props: PropsWithChildren<{
        value: string
        onChange: (value: string) => void
    }>
) => {
    return (
        <OverlayTrigger
            trigger="click"
            placement="right"
            rootClose={true}
            overlay={
                <Popover>
                    <ColorPicker
                        color={props.value}
                        onChange={(e) => {
                            props.onChange(e.hex)
                        }}
                    />
                </Popover>
            }
        >
            <div style={{ width: 16, height: 16, margin: 4, backgroundColor: props.value, cursor: 'pointer' }}></div>
        </OverlayTrigger>
    )
}

export default HeaderColorPicker

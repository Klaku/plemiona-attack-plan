import React, { PropsWithChildren, useContext, useState } from 'react'
import { ComponentDescription } from '../assets/ComponentDescription'
import image from '../assets/images/help-world-prefix.jpg'
import { Form, InputGroup, Button } from 'react-bootstrap'
import {} from '../assets/Button'
import { AppContext, AppView } from '../context/App.context'
const World = (props: PropsWithChildren<{}>) => {
    const context = useContext(AppContext)
    const [val, setVal] = useState('')
    return (
        <div>
            <Form>
                <Form.Group controlId="WorldData">
                    <Form.Label>Prefix świata</Form.Label>
                    <InputGroup>
                        <Form.Control
                            value={val}
                            onChange={(e) => {
                                setVal(e.target.value)
                            }}
                            type="text"
                            placeholder="pl182"
                        />
                        <Button
                            onClick={() => {
                                context.world.setValue(val)
                                context.setView(AppView.GetTribeInfo)
                            }}
                        >
                            Dalej
                        </Button>
                    </InputGroup>

                    <Form.Text className="text-muted">Przyda się do pobrania wielu danych których nie będzie Ci się chciało wpisywać z palca</Form.Text>
                </Form.Group>
            </Form>
            <div style={{ textAlign: 'right' }}></div>
        </div>
    )
}

export default World

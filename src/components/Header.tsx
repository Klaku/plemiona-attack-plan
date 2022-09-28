import React, { PropsWithChildren } from 'react'
import { NavDropdown } from 'react-bootstrap'
import styled from 'styled-components'
import { SettingsContext } from '../contexts/Settings.Context'
const HeaderComponent = (props: PropsWithChildren<{}>) => {
    let context = {
        settings: React.useContext(SettingsContext),
    }
    return (
        <Header>
            <ApplicationTitle>Planer Akcji</ApplicationTitle>
            <NavDropdown
                onSelect={(e) => {
                    console.log(e)
                    context.settings.world.update(e || '')
                }}
                defaultValue={context.settings.world.value}
                id="select_world"
                title={`Wybierz świat ${context.settings.world.value.length > 3 ? `( ${context.settings.world.value} )` : ''} `}
                menuVariant="dark"
            >
                {[182, 184, 186].map((world_id) => {
                    return (
                        <NavDropdown.Item eventKey={`pl${world_id}`} key={world_id} style={{ textAlign: 'center' }}>
                            pl{world_id}
                        </NavDropdown.Item>
                    )
                })}
            </NavDropdown>
        </Header>
    )
}

export default HeaderComponent

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    line-height: 50px;
    background-color: #264653;
    color: #fff;
    width: 100vw;
    height: 50px;
    max-height: 50px;
    & > * {
        padding: 0 20px;
    }
`

export const ApplicationTitle = styled.div`
    font-size: 16px;
    padding: 0 20px;
    font-weight: 600;
`

import React, { PropsWithChildren, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { DataContext } from '../../../contexts/Data.Context'
import { MapContext } from '../../../contexts/Map.Context'
import { PlanerContext } from '../../../contexts/Planer.Context'
import { SettingsContext } from '../../../contexts/Settings.Context'

const Exportuj = (props: PropsWithChildren<{ export: boolean }>) => {
    const context = {
        data: React.useContext(DataContext),
        settings: React.useContext(SettingsContext),
        planer: React.useContext(PlanerContext),
        map: React.useContext(MapContext),
    }
    const ExportHandler = () => {
        let data = JSON.stringify({
            settings: {
                world: context.settings.world.value,
                delay: context.settings.delay.value,
                screen: context.settings.screen.value,
                attack_start: context.settings.attack_start.value,
                player_message: context.settings.playerMessage.value,
            },
            map: {
                tribes: context.map.tribes,
                wioski_ofensywne: context.map.wioski_ofensywne,
                wioski_ofensywne_color: context.map.wioski_ofensywne_color,
                wioski_atakowane: context.map.wioski_atakowane,
                wioski_atakowane_color: context.map.wioski_atakowane_color,
                wioski_szlachta: context.map.wioski_szlachta,
            },
            planer: {
                operation: context.planer.operationType,
                items: context.planer.items,
                activeTarget: context.planer.activeTarget,
            },
        })
        if (props.export) {
            navigator.clipboard.writeText(data)
            toast.success('Zapisałem w schowku')
        } else {
            localStorage.setItem('saved_progress', data)
            toast.success('Zapisałem postępy')
        }
    }
    return (
        <Wrapper>
            <Button onClick={ExportHandler} variant="secondary">
                {props.export ? 'Exportuj' : 'Zapisz'}
            </Button>
        </Wrapper>
    )
}

export default Exportuj

export const Wrapper = styled.div``
export const TextWrapper = styled.div`
    max-width: 200px;
    max-height: 200px;
    overflow: auto;
`

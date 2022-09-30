import React, { PropsWithChildren, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { DataContext } from '../../../contexts/Data.Context'
import { MapContext } from '../../../contexts/Map.Context'
import { PlanerContext } from '../../../contexts/Planer.Context'
import { SettingsContext } from '../../../contexts/Settings.Context'

const Import = (props: PropsWithChildren<{ export: boolean }>) => {
    const context = {
        data: React.useContext(DataContext),
        settings: React.useContext(SettingsContext),
        planer: React.useContext(PlanerContext),
        map: React.useContext(MapContext),
    }
    const ImportHandler = () => {
        let data = JSON.parse(localStorage.getItem('saved_progress') || '{}')
        
        if (props.export) {
            navigator.clipboard.writeText(data)
            toast.success('Zapisałem w schowku')
        } else {
            toast.success('Zapisałem postępy')
        }
    }
    return (
        <Wrapper>
            <Button onClick={ImportHandler} variant="secondary">
                {props.export ? 'Exportuj' : 'Zapisz'}
            </Button>
        </Wrapper>
    )
}

export default Import

export const Wrapper = styled.div``
export const TextWrapper = styled.div`
    max-width: 200px;
    max-height: 200px;
    overflow: auto;
`

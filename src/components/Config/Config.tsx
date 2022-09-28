import React, { PropsWithChildren } from 'react'
import { FormControl, OverlayTrigger, Popover, Tab, Tabs } from 'react-bootstrap'
import styled from 'styled-components'
import TribeList from './TribeList'
import ZaznaczoneWioski from './ZaznaczoneWioski'

import { MapContext } from '../../contexts/Map.Context'
import HeaderColorPicker from './HeaderColorPicker'
import Ustawienia from './Ustawienia'
const Config = (props: PropsWithChildren<{}>) => {
    const context = {
        map: React.useContext(MapContext),
    }
    return (
        <Wrapper>
            <Tabs defaultActiveKey={'K'}>
                <CustomTab eventKey={'K'} title="Konfiguracja">
                    <Section>
                        <SectionTitle>Widoczne Plemiona</SectionTitle>
                        <TribeList />
                    </Section>
                    <Section>
                        <SectionTitleContainer>
                            <SectionTitle>Wioski Ofensywne</SectionTitle>
                            <HeaderColorPicker value={context.map.wioski_ofensywne_color} onChange={context.map.setWioskiOfensywneColor} />
                        </SectionTitleContainer>
                        <ZaznaczoneWioski onChange={context.map.setWioskiOfensywne} />
                    </Section>
                    <Section>
                        <SectionTitleContainer>
                            <SectionTitle>Wioski Atakowane</SectionTitle>
                            <HeaderColorPicker value={context.map.wioski_atakowane_color} onChange={context.map.setWioskiAtakowaneColor} />
                        </SectionTitleContainer>
                        <ZaznaczoneWioski onChange={context.map.setWioskiAtakowane} />
                    </Section>
                    <Section>
                        <SectionTitle>Wioski Zawierające Szlachtę</SectionTitle>
                        <ZaznaczoneWioski onChange={context.map.setWioskiSzlachta} />
                    </Section>
                </CustomTab>
                <CustomTab eventKey={'U'} title="Ustawienia">
                    <Section>
                        <Ustawienia />
                    </Section>
                </CustomTab>
            </Tabs>
        </Wrapper>
    )
}

export default Config

export const Wrapper = styled.div`
    width: 250px;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    & .tab-content {
        max-height: calc(100vh - 50px - 40px);
        overflow-y: auto;
    }
`
export const CustomTab = styled(Tab)``
export const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 5px;
`
export const SectionTitle = styled.div`
    width: 100%;
    font-size: 16px;
    padding: 0 5px;
    font-weight: 600;
    color: #666;
`
export const SectionTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`

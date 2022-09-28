import React, { PropsWithChildren } from 'react'
import { LayersControl, MapContainer, MapContainerProps } from 'react-leaflet'
import * as leaflet from 'leaflet'
import styled from 'styled-components'
import Kontynenty from './Kontynenty'
import Tlo from './Tlo'
import { MapContext } from '../../contexts/Map.Context'
import TribeMarkers from './TribeMarkers'
import Linie from './Linie'
const MapContainerProperties: MapContainerProps = {
    center: [-500, 500],
    zoom: 2,
    maxBounds: [
        [0, 0],
        [-1000, 1000],
    ],
    crs: leaflet.CRS.Simple,
}
const Map = (props: PropsWithChildren<{}>) => {
    const context = {
        map: React.useContext(MapContext),
    }
    return (
        <Wrapper id="map">
            <MapContainer {...MapContainerProperties} style={{ width: 'calc(100vw - 500px)', height: 'calc(100vh - 50px)' }}>
                <LayersControl position="topright" key={context.map.mapKey.toLocaleString()}>
                    <Tlo />
                    <Kontynenty />
                    {context.map.tribes.map((tribe) => {
                        return <TribeMarkers key={tribe.tribe_id_num} tribe={tribe} />
                    })}
                    <Linie />
                </LayersControl>
            </MapContainer>
        </Wrapper>
    )
}

export default Map

export const Wrapper = styled.div`
    flex-grow: 1;
    height: calc(100vh - 50px);
`

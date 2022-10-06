import React, { PropsWithChildren } from 'react'
import { LayersControl, MapContainer, MapContainerProps, Polygon, PolygonProps } from 'react-leaflet'
import styled from 'styled-components'
import * as leaflet from 'leaflet'
import { MapContext } from '../../contexts/Map'
import Continents from './Continents'
import { DataContext } from '../../contexts/Data'
import { FilterContext } from '../../contexts/Filter'
import Markers from './Markers'
const MapContainerProperties: MapContainerProps = {
    center: [-500, 500],
    zoom: 2,
    maxBounds: [
        [0, 0],
        [-1000, 1000],
    ],
    crs: leaflet.CRS.Simple,
}
const BackgroundProperties: PolygonProps = {
    stroke: false,
    fillOpacity: 1,
    color: '#333',
    fillColor: '#333',
    positions: [
        [0, 0],
        [-1000, 0],
        [-1000, 1000],
        [0, 1000],
    ],
}
const Map = (props: PropsWithChildren<{}>) => {
    const context = {
        map: React.useContext(MapContext),
        data: React.useContext(DataContext),
        filters: React.useContext(FilterContext),
    }

    return (
        <Wrapper>
            <MapContainer key={context.map.key[0]} {...MapContainerProperties} style={{ width: 'calc(100vw - 400px)', height: '100vh' }}>
                <Polygon {...BackgroundProperties} />
                <LayersControl position="topright">
                    <Continents />
                    <Markers />
                </LayersControl>
            </MapContainer>
        </Wrapper>
    )
}

export default Map

export const Wrapper = styled.div`
    display: flex;
    flex-grow: 1;
    height: 100vh;
`

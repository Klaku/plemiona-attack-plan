import React, { PropsWithChildren } from 'react'
import { LayerGroup, LayersControl, Polygon, PolygonProps } from 'react-leaflet'
const polygonProperties: PolygonProps = {
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
const Tlo = (props: PropsWithChildren<{}>) => {
    return (
        <LayersControl.Overlay checked name="Tło">
            <LayerGroup>
                <Polygon {...polygonProperties} />
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default Tlo

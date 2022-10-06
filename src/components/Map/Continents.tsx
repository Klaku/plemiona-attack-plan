import React, { PropsWithChildren } from 'react'
import { LayerGroup, LayersControl, Polygon, PolygonProps } from 'react-leaflet'
const HorizontalLineProperties = (x: number): PolygonProps => {
    return {
        stroke: true,
        fillOpacity: 0,
        color: '#ffffff30',
        positions: [
            [
                [x, 1000],
                [x, 0],
            ],
        ],
    }
}
const VerticalLineProperties = (x: number): PolygonProps => {
    return {
        stroke: true,
        fillOpacity: 0,
        color: '#ffffff30',
        positions: [
            [
                [-1000, x],
                [0, x],
            ],
        ],
    }
}
const Continents = (props: PropsWithChildren<{}>) => {
    return (
        <LayersControl.Overlay checked name="Linie Kontynentów">
            <LayerGroup>
                <Polygon {...HorizontalLineProperties(-100)} />
                <Polygon {...HorizontalLineProperties(0)} />
                <Polygon {...HorizontalLineProperties(-200)} />
                <Polygon {...HorizontalLineProperties(-300)} />
                <Polygon {...HorizontalLineProperties(-400)} />
                <Polygon {...HorizontalLineProperties(-500)} />
                <Polygon {...HorizontalLineProperties(-600)} />
                <Polygon {...HorizontalLineProperties(-700)} />
                <Polygon {...HorizontalLineProperties(-800)} />
                <Polygon {...HorizontalLineProperties(-900)} />
                <Polygon {...HorizontalLineProperties(-1000)} />
                <Polygon {...VerticalLineProperties(100)} />
                <Polygon {...VerticalLineProperties(0)} />
                <Polygon {...VerticalLineProperties(200)} />
                <Polygon {...VerticalLineProperties(300)} />
                <Polygon {...VerticalLineProperties(400)} />
                <Polygon {...VerticalLineProperties(500)} />
                <Polygon {...VerticalLineProperties(600)} />
                <Polygon {...VerticalLineProperties(700)} />
                <Polygon {...VerticalLineProperties(800)} />
                <Polygon {...VerticalLineProperties(900)} />
                <Polygon {...VerticalLineProperties(1000)} />
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default Continents

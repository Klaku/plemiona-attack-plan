import React, { PropsWithChildren } from 'react'
import { LayerGroup, LayersControl, Polygon, PolygonProps } from 'react-leaflet'
const polygonPropertiesX = (x: number): PolygonProps => {
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
const polygonPropertiesY = (x: number): PolygonProps => {
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
const Kontynenty = (props: PropsWithChildren<{}>) => {
    return (
        <LayersControl.Overlay checked name="Linie Kontynentów">
            <LayerGroup>
                <Polygon {...polygonPropertiesX(-100)} />
                <Polygon {...polygonPropertiesX(0)} />
                <Polygon {...polygonPropertiesX(-200)} />
                <Polygon {...polygonPropertiesX(-300)} />
                <Polygon {...polygonPropertiesX(-400)} />
                <Polygon {...polygonPropertiesX(-500)} />
                <Polygon {...polygonPropertiesX(-600)} />
                <Polygon {...polygonPropertiesX(-700)} />
                <Polygon {...polygonPropertiesX(-800)} />
                <Polygon {...polygonPropertiesX(-900)} />
                <Polygon {...polygonPropertiesX(-1000)} />
                <Polygon {...polygonPropertiesY(100)} />
                <Polygon {...polygonPropertiesY(0)} />
                <Polygon {...polygonPropertiesY(200)} />
                <Polygon {...polygonPropertiesY(300)} />
                <Polygon {...polygonPropertiesY(400)} />
                <Polygon {...polygonPropertiesY(500)} />
                <Polygon {...polygonPropertiesY(600)} />
                <Polygon {...polygonPropertiesY(700)} />
                <Polygon {...polygonPropertiesY(800)} />
                <Polygon {...polygonPropertiesY(900)} />
                <Polygon {...polygonPropertiesY(1000)} />
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default Kontynenty

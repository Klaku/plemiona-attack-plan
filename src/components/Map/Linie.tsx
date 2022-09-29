import React, { PropsWithChildren } from 'react'
import { LayerGroup, LayersControl, Polygon, PolygonProps } from 'react-leaflet'
import { OperationType, PlanerContext } from '../../contexts/Planer.Context'
const polygonProperties: PolygonProps = {
    stroke: true,
    fillOpacity: 0,
    positions: [
        [0, 0],
        [-1000, 0],
        [-1000, 1000],
        [0, 1000],
    ],
}
const Linie = (props: PropsWithChildren<{}>) => {
    const context = {
        planer: React.useContext(PlanerContext),
    }
    return (
        <LayersControl.Overlay checked name="Linie">
            <LayerGroup key={3}>
                {context.planer.items
                    .filter((x) => x.target.village.village_id_num == context.planer.activeTarget?.village.village_id_num || x.source.village.village_id_num == context.planer.activeTarget?.village.village_id_num)
                    .map((x) => {
                        return (
                            <Polygon
                                fillColor={x.OperationType == OperationType.Fake ? '#666' : x.OperationType == OperationType.Atak ? '#0f0' : '#f00'}
                                color={x.OperationType == OperationType.Fake ? '#666' : x.OperationType == OperationType.Atak ? '#0f0' : '#f00'}
                                key={x.Id}
                                {...polygonProperties}
                                positions={[
                                    [-1 * x.source.village.y_num + 0.4, x.source.village.x_num + 0.4],
                                    [-1 * x.target.village.y_num + 0.4, x.target.village.x_num + 0.4],
                                ]}
                            />
                        )
                    })}
            </LayerGroup>
        </LayersControl.Overlay>
    )
}

export default Linie

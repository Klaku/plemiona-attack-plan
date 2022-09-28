import React, { PropsWithChildren, useState } from 'react'
import { ISelectedTribe } from '../types/ITribe'
import { ISelectedVillage, IVillage } from '../types/IVillage'

export interface IMapContext {
    tribes: ISelectedTribe[]
    setTribes: (value: ISelectedTribe[]) => void
    wioski_ofensywne: IVillage[]

    wioski_ofensywne_color: string
    wioski_atakowane: IVillage[]
    wioski_atakowane_color: string
    setWioskiOfensywne: (value: IVillage[]) => void
    setWioskiOfensywneColor: (value: string) => void
    setWioskiAtakowane: (value: IVillage[]) => void
    setWioskiAtakowaneColor: (value: string) => void
    mapKey: Date
    setMapKey: (value: Date) => void
    wioski_szlachta: IVillage[]
    setWioskiSzlachta: (value: IVillage[]) => void
}

const defaultContext: IMapContext = {
    tribes: [],
    setTribes: () => {},
    wioski_ofensywne: [],
    setWioskiOfensywne: () => {},
    wioski_ofensywne_color: '#000',
    setWioskiOfensywneColor: () => {},
    wioski_atakowane: [],
    setWioskiAtakowane: () => {},
    wioski_atakowane_color: '#000',
    setWioskiAtakowaneColor: () => {},
    mapKey: new Date(),
    setMapKey: () => {},
    wioski_szlachta: [],
    setWioskiSzlachta: () => {},
}

export const MapContext = React.createContext(defaultContext)

export const MapContextProvider = (props: PropsWithChildren<{}>) => {
    const [tribes, setTribes] = useState([] as ISelectedTribe[])
    const [wioski_ofensywne, setWioskiOfensywne] = useState([] as IVillage[])
    const [wioski_szlachta, setWioskiSzlachta] = useState([] as IVillage[])
    const [wioski_ofensywne_color, setWioskiOfensywneColor] = useState('#000')
    const [wioski_atakowane, setWioskiAtakowane] = useState([] as IVillage[])
    const [wioski_atakowane_color, setWioskiAtakowaneColor] = useState('#000')
    const [mapKey, setMapKey] = useState(new Date())
    console.log(wioski_szlachta)
    return (
        <MapContext.Provider
            value={{
                tribes,
                setTribes,
                wioski_ofensywne,
                setWioskiOfensywne,
                wioski_ofensywne_color,
                setWioskiOfensywneColor,
                wioski_atakowane,
                setWioskiAtakowane,
                wioski_atakowane_color,
                setWioskiAtakowaneColor,
                mapKey,
                setMapKey,
                wioski_szlachta,
                setWioskiSzlachta,
            }}
        >
            {props.children}
        </MapContext.Provider>
    )
}

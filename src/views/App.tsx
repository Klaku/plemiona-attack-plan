import React, { PropsWithChildren, useContext } from 'react'
import styled from 'styled-components'
import { Button } from '../assets/Button'
import { AppContext, AppView } from '../context/App.context'
import GetData from './GetData'
import Panel from './Panel'
import World from './World'
const App = (props: PropsWithChildren<{}>) => {
    const context = useContext(AppContext)
    return (
        <AppWrapper>
            <div>
                <Title>{DescriptionByView(context.view)}</Title>
                {context.view == AppView.Start && (
                    <InfoContainer>
                        <TextSection>
                            <div>W pierwszych krokach poproszę o uzupełnienie danych.</div>
                            <div>Są one mi potrzebne do ułatwienia Ci pracy, przecież nikt nie lubi wpisywać wszystkiego z palca</div>
                        </TextSection>
                        <TextSection>
                            <div>Jeszcze jedno...</div>
                            <div>Nie posiadam części serwerowej więc nie umiem w zapisywanie</div>
                            <div>Jak mnie wyłączysz to wszystko trafi w eter</div>
                        </TextSection>
                        <Button
                            onClick={() => {
                                context.setView(AppView.GetWorldInfo)
                            }}
                        >
                            Rozpocznij
                        </Button>
                    </InfoContainer>
                )}
            </div>
            {context.view == AppView.GetWorldInfo && <World />}
            {context.view == AppView.GetTribeInfo && <GetData view={context.view} />}
            {context.view == AppView.GetPlayerInfo && <GetData view={context.view} />}
            {context.view == AppView.GetVillageInfo && <GetData view={context.view} />}
            {context.view == AppView.Panel && <Panel/>}
        </AppWrapper>
    )
}

const DescriptionByView = (view: AppView) => {
    switch (view) {
        case AppView.Start:
            return 'Witaj, zaplanujemy coś grubego?'
        case AppView.GetWorldInfo:
            return 'Zacznijmy od wyboru świata'
        default:
            return 'Działajmy'
    }
}

export default App

export const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    & > div {
        width: 900px;
        padding: 15px 50px;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
`
export const Title = styled.div`
    text-align: center;
    font-size: 22px;
`
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;

    & > * {
        text-align: center;
    }
`
export const TextSection = styled.div`
    margin: 5px 0 10px;
    font-weight: 300;
    line-height: 1.7em;
`

import React, { PropsWithChildren, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { DataContext } from '../../contexts/Data'
import { PlayerConverter, TribeConverter, VillageConverter } from '../../helpers/Converters'

const DataModal = (
    props: PropsWithChildren<{
        isVisible: boolean
        setIsVisible: (value: boolean) => void
    }>
) => {
    const handleClose = () => {
        props.setIsVisible(false)
    }
    const [prefix, setPrefix] = useState('pl182')
    const [isPrefixSet, setIsPrefixSet] = useState(false)
    const context = {
        data: React.useContext(DataContext),
    }
    const [villages, setVillages] = useState('')
    const [players, setPlayers] = useState('')
    const [tribes, setTribes] = useState('')
    const Save = () => {
        context.data.village[1](
            villages
                .split('\n')
                .filter((x) => x.length > 5)
                .map((x) => VillageConverter(x))
        )
        context.data.player[1](
            players
                .split('\n')
                .filter((x) => x.length > 5)
                .map((x) => PlayerConverter(x))
        )
        context.data.tribe[1](
            tribes
                .split('\n')
                .filter((x) => x.length > 5)
                .map((x) => TribeConverter(x))
        )
        handleClose()
    }
    return (
        <Modal show={props.isVisible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dane świata</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Prefix świata</Form.Label>
                <InputGroup>
                    <Form.Control value={prefix} onChange={(e) => setPrefix(e.target.value)} />
                    <Button variant="secondary" onClick={() => setIsPrefixSet(true)}>
                        Zastosuj
                    </Button>
                </InputGroup>
                <Form.Text className="text-muted">https://[prefix].plemiona.pl/</Form.Text>
                {isPrefixSet && (
                    <FrameWrapper>
                        <FrameSection>
                            <span>Skopiuj</span>
                            <span>Wklej</span>
                        </FrameSection>
                        <FrameSection>
                            <Frame src={`https://${prefix}.plemiona.pl/map/village.txt`} />
                            <TextArea as="textarea" rows={5} value={villages} onChange={(e) => setVillages(e.target.value)} />
                        </FrameSection>
                        <FrameSection>
                            <Frame src={`https://${prefix}.plemiona.pl/map/player.txt`} />
                            <TextArea as="textarea" rows={5} value={players} onChange={(e) => setPlayers(e.target.value)} />
                        </FrameSection>
                        <FrameSection>
                            <Frame src={`https://${prefix}.plemiona.pl/map/ally.txt`} />
                            <TextArea as="textarea" rows={5} value={tribes} onChange={(e) => setTribes(e.target.value)} />
                        </FrameSection>
                    </FrameWrapper>
                )}
            </Modal.Body>
            <Modal.Footer>
                {isPrefixSet && (
                    <Button disabled={villages.length < 50 || players.length < 50 || tribes.length < 50} onClick={Save}>
                        Zapisz
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default DataModal

export const FrameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    margin-top: 15px;
`
export const FrameSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
`
export const Frame = styled.iframe`
    width: 200px;
    height: 100px;
`
export const TextArea = styled(Form.Control)`
    width: 200px;
    height: 100px;
`

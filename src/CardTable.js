import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CardTable.css";
import Card from "./Card";

const CardTable = () => {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                setDeckId(resp.data.deck_id);
            } catch (error) {
                console.error("Error fetching the deck:", error);
            }
        };

        fetchDeck();
    }, []);

    const genRandom = () => {
        const min = -40;
        const max = 40;
        return Math.random() * (max - min) + min;
    };

    const getCard = async(deckId) => {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            let newCard = res.data.cards[0];
            newCard = {
                ...newCard,
                rotation: genRandom(),
                offsetY: genRandom()
            }
            setCards(cards => [...cards, newCard]);
            return cards;
        } catch (error) {
            console.error("Error dealing card:", error);
        }
    }

    const shuffle = async(deckId) => {
        try {
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            setCards([]);
        } catch (error) {
            console.error("Error shuffling deck:", error)
        }
    }

    return (
        <div className="CardTable">
            {deckId && cards.length < 52 && <button className="CardTable-button" onClick={() => getCard(deckId)}>Deal Card!</button>}
            {cards.length > 0 && <button className="CardTable-button" onClick={() => shuffle(deckId)}>Shuffle!</button>}
            <div className="CardTable-card">
                <div className="CardTable-alert">
                    {cards.length >= 52 && <p>No more cards remaining.</p>}
                </div>
                {cards.map(c => 
                    <Card 
                        key={c.code} 
                        image={c.image} 
                        alt={c.code}
                        rotation={c.rotation}
                        offsetY={c.offsetY}
                    />
                )}     
            </div>
        </div>
    )
}

export default CardTable;
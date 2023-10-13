import {useState} from "react";
import axios from "axios";
import {v1 as uuid} from "uuid";

export const useFlip = (value=true) => {
    const [isFlipped, setIsFlipped] = useState(value);

    const toggleFlip = () => {
        setIsFlipped(prevState => !prevState);
    }

    return [isFlipped, toggleFlip]
}

export const useAxios = (baseUrl) => {
    const [cards, setCards] = useState([]);

    const addCard = async(urlFragment='') => {
        try{
            const res = await axios.get(`${baseUrl}/${urlFragment}`);
                
            setCards(cards => [...cards, {...res.data, id: uuid()}]);
        } catch(e){
            console.error("Error:", e);
        }
    }    

    return [cards, addCard]
}
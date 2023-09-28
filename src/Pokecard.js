import React from "react";
import "./Pokecard.css";

const Pokecard = (props) => {
    return (
        <div className="Pokecard">
            <h3 className="Pokecard-name">{props.name}</h3>
            <img className="Pokecard-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt={props.name}/>
            <p className="Pokecard-type">Type: {props.type}</p>
            <p className="Pokecard-exp">EXP: {props.exp}</p>
        </div>
    )
}

export default Pokecard;
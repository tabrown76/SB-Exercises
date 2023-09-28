import React from "react";
import Pokecard from "./Pokecard";
import {defaultProps} from "./defaultProps";
import "./Pokedex.css";

const Pokedex = () => {
    return (    
        <div className="Pokedex">
            <h1 className="Pokedex-title">Pokedex</h1>
            {defaultProps.map(p => <Pokecard    key={p.id}
                                                name={p.name}
                                                id={p.id}
                                                type={p.type}
                                                exp={p.base_experience}
                                    />)}
        </div>
    )
}

export default Pokedex;
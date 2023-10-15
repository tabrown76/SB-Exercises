import React from "react";
import "./PotatoChips.css";
import PotatoChipsImage from "./PotatoChips.png";

const PotatoChips = () => {
    return (
        <>
            <p className="PotatoChips-image-text">Potato chips are gross...</p>
            <div className="PotatoChips">
                <img className="PotatoChips-image" src={PotatoChipsImage} alt="no-potato-chips"/>
            </div>
            <p className="PotatoChips-image-text">...no refunds!</p>
        </>
    )
}

export default PotatoChips;
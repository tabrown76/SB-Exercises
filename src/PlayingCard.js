import React from "react";
import backOfCard from "./back.png";
import {useFlip} from "./hooks";
import "./PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [facingUp, setFacingUp] = useFlip();
  
  return (
    <img
      src={facingUp ? front : back}
      alt="playing card"
      onClick={setFacingUp}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;

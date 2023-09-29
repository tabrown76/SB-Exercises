import React, {useState} from "react";
import "./EightBall.css";
import {msgArray} from "./msgArray";

const EightBall = () => {
    const shakeBall = () => {
        const randIdx = Math.floor(Math.random() * msgArray.length);
        const msgObj = msgArray[randIdx];
  
        return msgObj;
    }
    
    const [state, setState] = useState({
        msg: 'Think of a Question.',
        color: 'black' 
    });
    

    const updateState = () => {
        const newValues = shakeBall();
        setState(currentState => ({ ...currentState, ...newValues }));
    }
    
    return (
        <div className="EightBall" 
            style={{backgroundColor: state.color}}
            onClick={updateState}>
            <p className="EightBall-msg">
                {state.msg}
            </p>
        </div>
    )
}

export default EightBall;
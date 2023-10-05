import React, {useState} from "react";
import "./BoxList.css";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import {v4 as uuid} from "uuid";

const BoxList = () => {
    const [boxes, setBoxes] = useState([]);
    const addBox = (newBox) => {
        newBox.id = uuid();
        setBoxes(boxes => [...boxes, newBox]);
    }

    const handleClick = (boxId) => {
        setBoxes(boxes => boxes.filter(box => box.id !== boxId));
    }    

    return (
        <div className="BoxList">
            <NewBoxForm addBox={addBox}/>  
            <div className="BL-box">
                {boxes.map(box => <Box 
                                        backgroundColor={box.backgroundColor} 
                                        height={box.height}
                                        width={box.width}
                                        onClick={() => handleClick(box.id)}
                                        key={box.id}
                                    />)}
            </div>          
        </div>
    )
}

export default BoxList;
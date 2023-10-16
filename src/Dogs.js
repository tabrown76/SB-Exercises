import React from "react";
import { Link } from "react-router-dom";
import "./styles/Dogs.css";
import {v4 as uuid} from "uuid";

const Dogs = ({data}) => {
    const dogs = data.dogs;

    return (
        <div className="Dogs">
            <h1 className="Dogs-h1">These Dogs are Available for Immediate Adoption!</h1>
            <hr/>
            <div className="Dogs-images"> 
                {dogs.map(d =>
                                    <Link to={`/dogs/${d.name}`} key={uuid()} >        
                                        <img 
                                            className="Dogs-image" 
                                            src={`${process.env.PUBLIC_URL}/${d.src}.jpg`} 
                                            alt={d.name} 
                                        />
                                    </Link>
                                )}
            </div>
        </div>
    )
}

export default Dogs;
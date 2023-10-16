import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./styles/Dog.css";
import {v4 as uuid} from "uuid";

const Dog = ({ data }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    // Find the dog that matches the name in params (case-insensitive)
    const foundDog = data.dogs.find(d => d.name.toLowerCase() === params.name.toLowerCase());

    if (!foundDog) {
      navigate("/dogs");
      return;
    }

    setDog(foundDog);

    // Redirect to the correct URL if the case doesn't match
    if (foundDog.name !== params.name) {
      navigate(`/dogs/${foundDog.name}`);
    }

  }, [data, params, navigate]); 

  if (!dog) {
    return null; 
  }

  return (
    <div className="Dog">
        <h1 className="Dog-h1">{dog.name}</h1>
        <div className="Dog-content">
            <p className="Dog-p">{dog.name} is {dog.age} years old.</p>
            <div className="Dog-image-wrapper">
              <img 
                  className="Dog-image"
                  src={`${process.env.PUBLIC_URL}/${dog.src}.jpg`} 
                  alt={dog.name} 
              />
              <button><Link className="Dog-back-link" to="/dogs">Back</Link></button>
            </div>
            <ul className="Dog-ul">
                {dog.facts.map(f => <li className="Dog-li" key={uuid()}>{f}</li>)}
            </ul>
        </div>
    </div>
  );
};

export default Dog;



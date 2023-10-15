import React, {useEffect} from "react";
import "./Peanuts.css";

const Peanuts = () => {
    useEffect(() => {
        const container = document.querySelector('.Peanuts');
        
        for (let i = 0; i < 100; i++) {
          const peanut = document.createElement('div');
          peanut.className = 'peanut';
            
          const x = Math.random() * 100 + 'vw';
          const y = Math.random() * 100 + 'vh';
          const speed = Math.random() * 5 + 3 + 's';
            
          peanut.style.left = x;
          peanut.style.top = y;
          peanut.style.animationDuration = speed;
            
          container.appendChild(peanut);
        }
      }, []);

    return (
        <div className="Peanuts">
            <h1 className="Peanuts-h1">Oh, nuts...</h1>
        </div>
    )
}

export default Peanuts;


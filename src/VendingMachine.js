import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom"
import "./VendingMachine.css";

const VendingMachine = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(Number(localStorage.getItem("balance")) || 0);

    useEffect(() => {
        localStorage.setItem("balance", balance);
    }, [balance]);

    const incrementBalance = () => {
        setBalance(balance => balance + 1)
    }

    const decrementBalanceAndNavigate = async (path) => {
        if(Number(localStorage.balance) === 0){
            alert(`Current balance: ${balance}. Please insert money.`)
        } else{
            await new Promise(resolve => {
                setBalance(prevBalance => {
                  const newBalance = prevBalance - 1;
                  resolve(newBalance);
                  return newBalance;
                });
            });
            navigate(path);
        }
    }
      
    return (
        <div className="VendingMachine">
            <div className="VendingMachine-Snacks">
                <Link onClick={() => decrementBalanceAndNavigate("/potato-chips")}>Potato Chips</Link>
                <Link onClick={() => decrementBalanceAndNavigate("/granola-bar")}>Granola Bar</Link>
                <Link onClick={() => decrementBalanceAndNavigate("/peanuts")}>Peanuts</Link>
            </div>
            <img src="https://clipart-library.com/images/rinK7edjT.gif" alt="vending-machine" />
            <div className="VendingMachine-clicker">
                <p className="VendingMachine-balance">$ {balance}.00</p>
                <hr/>
                <button className="VendingMachine-button" onClick={incrementBalance}>Insert Money</button>
            </div>
        </div>
    )
}

export default VendingMachine;
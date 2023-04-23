import React, { useState } from "react";

// const Dropdown = () => {
   

function Dropdown1({selected, setSelected}) {
    const [isActive,setIsActive] = useState(false)
    const options = ['c', 'c++', 'python', 'java'];
   return(
    <div className="dropdown">
        <div className="dropdown-btn" onClick={e => 
            setIsActive(!isActive)}>
            언어
            <span className="fas fa-caret-down"></span>
        </div>
        {isActive && (
        <div className="dropdown-content">
            {options.map((option) =>(
                <div 
                    onClick={e => {
                        setSelected(option);
                        setIsActive(false);
                }}
                className="dropdown-item"
            >
                {option}
                </div>
              ))}
        </div>
        )}
    </div>
   );
  }
  
  export default Dropdown1;
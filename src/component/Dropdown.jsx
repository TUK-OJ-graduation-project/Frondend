import React, { useState } from "react";

// const Dropdown = () => {
   

function Dropdown({selected, setSelected}) {
    const [isActive,setIsActive] = useState(false)
    const options = ['lv 1', 'lv 2', 'lv 3', 'lv 4', 'lv 5'];
   return(
    <div className="dropdown">
        <div className="dropdown-btn" onClick={e => 
            setIsActive(!isActive)}>
            level
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
  
  export default Dropdown;
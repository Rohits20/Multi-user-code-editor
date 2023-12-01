import { useState } from "react";
import React from "react";
 import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["cpp", "java", "python", "C" , "GoLang" , "C#" , "NodeJS"];
  return (
    <div className="dropdown">
    <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
      {selected}
      

      <ArrowDropDownIcon/>
    </div>
    {isActive && (
      <div className="dropdown-content">
        {options.map((option) => (
          <div
            onClick={(e) => {
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
};

export default Dropdown;

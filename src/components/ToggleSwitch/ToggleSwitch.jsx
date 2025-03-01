import { useState, useEffect, useContext } from "preact/hooks";
import './ToggleSwitch.css';


function ToggleSwitch(){
return(
    // <div className="toggle-switch">
        <label className="toggle-switch">
            <input 
            className="toggle-switch_checkbox toggle-switch__checkbox_state_hidden"
            type="checkbox"
            name= "toggle-swich-checkbox"
            // value={currentTemperatureUnit}
            // onChange={handleToggleSwitchChange}
            // checked={isChecked}
            />
            <span className="toggle-switch__circle">
    Toggle Label
</span>
<span className="toggle-switch__text toggle-switch__text_F"></span>
<span className="toggle-switch__text toggle-switch__text_C"></span>
        </label>
        
    // </div>
);
};

export default ToggleSwitch;
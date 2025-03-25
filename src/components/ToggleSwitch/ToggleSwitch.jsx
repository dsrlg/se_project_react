import { useState, useEffect, useContext } from "preact/hooks";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    // <div className="toggle-switch">
    <label className="toggle-switch">
      <input
        className="toggle-switch__checkbox toggle-switch__checkbox_state_hidden"
        type="checkbox"
        name="toggle-swich__checkbox"
        value={currentTemperatureUnit}
        onChange={handleToggleSwitchChange}
        // checked={isChecked}
      />
      <span className="toggle-switch__circle"></span>
      <span
        style={{ color: `${currentTemperatureUnit === "F" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_F`}
      >
        F
      </span>
      <span
        style={{ color: `${currentTemperatureUnit === "C" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_C`}
      >
        C
      </span>
    </label>

    // </div>
  );
}

export default ToggleSwitch;

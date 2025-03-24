import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
      <img src={logo} alt="header logo" className="header__logo" />
      </Link>
      
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch/>

      {/* <div className="header__nav"> */}
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add Clothes
      </button>
      <Link to="/profile" className="header__link">
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt=" header avatar" className="header__avatar" />
      </div>
      </Link>
      {/* </div> */}
    </header>
  );
}

export default Header;

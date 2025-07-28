import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  handleAddClick,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="header logo" className="header__logo" />
        </Link>

        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <nav className="navigation">
        <ul className="navigation__container">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={handleAddClick}
                  type="button"
                  className="navigation__button"
                >
                  +Add Clothes
                </button>
              </li>
              <li>
                <Link to="/profile" className="navigation__link">
                  <span className="navigation__username"> {" "}{currentUser.name}</span>
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt="avatar"
                      className="navigation__user"
                    />
                  ) : (
                    <span className="navigation__user navigation__user_type_none">
                      {" "}
                      {currentUser?.name?.toUpperCase().chartAt(0) || ""}
                    </span>
                  )}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="navigation__button" onClick={onLoginClick}>
                  Log in
                </button>
              </li>
              <li>
                <button
                  className="navigation__button"
                  onClick={onRegisterClick}
                >
                  Sign up
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

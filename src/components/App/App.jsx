import { useEffect, useState } from "react";

import "./App.css";
//import { Route, Routes } from "react-router-dom";
//import currentTemperatureUnit from "../../contexts/currentTemperatureUnitContext.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordiantes, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C:999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setAciveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  

  const handleCardClick = (card) => {
    setAciveModal("preview");
    setSelectCard(card);
  };

  const handleAddClick = () => {
    setAciveModal("add-garment");
  };

  const closeActiveModal = () => {
    setAciveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordiantes, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        </div>
        <ModalWithForm
          buttonText="Add garment"
          titleText="New garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "add-garment"}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="ImageUrl"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="Hot"
              className="modal__label modal__label__type_radio"
            >
              <input
                id="Hot"
                name="weatherRadioButton"
                type="radio"
                className="modal__radio-input"
              />
              Hot
            </label>
            <label
              htmlFor="Warm"
              className="modal__label modal__label__type_radio"
            >
              <input
                id="Warm"
                name="weatherRadioButton"
                type="radio"
                className="modal__radio-input"
              />
              Warm
            </label>
            <label
              htmlFor="Cold"
              className="modal__label modal__label__type_radio"
            >
              <input
                name="weatherRadioButton"
                id="Cold"
                type="radio"
                className="modal__radio-input"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectCard}
          handleCloseClick={closeActiveModal}
        />
        <Footer></Footer>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

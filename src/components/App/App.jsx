import { useEffect, useState } from "react";
import React from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordiantes, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { defaultClothingItems } from "../../utils/constants";
import Profile from "../Profile/Profile.jsx";
import api from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setAciveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [cards, setCards] = useState([]);

  const handleDeleteClick = (cardId) => {
    api
      .handleDeleteCard(cardId)

      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardId)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

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

  const handleItemModalSubmit = ({ name, imageUrl, weather }) => {
    api
      .addItem({ name, imageUrl, weather })
      .then((newCard) => {
        console.log(newCard);
        // debugger;
        // const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
        setClothingItems([
          { name, imageUrl: imageUrl, weather, _id: newCard._id },
          ...clothingItems,
        ]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordiantes, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   fetch('/${baseUrl}/cards') // replace with your data source
  //     .then(response => response.json())
  //     .then(data => setCards(data))
  //     .catch(error => console.error(error));
  // }, []);

  // useEffect(() => {
  //   api.getCards().then(setCards);
  // }, [])

  // console.log(cards);
  // console.log(clothingItems);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  // CurrentTemperatureUnit={CurrentTemperatureUnit}
                  handleAddClick={handleAddClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onItemModalSubmit={handleItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectCard}
          isOpen={activeModal === "add-garment"}
          onItemModalSubmit={handleItemModalSubmit}
          handleCloseClick={closeActiveModal}
          onDelete={handleDeleteClick}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

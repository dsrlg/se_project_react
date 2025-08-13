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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { defaultClothingItems } from "../../utils/constants";
import Profile from "../Profile/Profile.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import api from "../../utils/api.js";
import { ConfirmationDeleteModal } from "../ConfirmationDeleteModal/ConfirmationDeleteModal";
import { h } from "preact";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [cards, setCards] = useState([]);

  function handleSubmit(request) {
    setIsLoading(true);
    return request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleCardDelete() {
    const token = localStorage.getItem("jwt"); // Define token
    const makeRequest = () =>
      api.handleDeleteCard(selectCard._id, token).then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id !== selectCard._id)
        );
      });

    handleSubmit(makeRequest, closeActiveModal);
  }

  const openConfirmationDeleteModal = () => {
    setActiveModal("delete-confirmation");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleUpdateProfile = (updatedData) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => 
    api
      .updateProfile({
        ...updatedData,
        token,
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
        setErrorMessage("");
      });
    handleSubmit(makeRequest , closeActiveModal);
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeRequest = !isLiked ? api.addCardLike : api.removeCardLike;

    likeRequest(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? (isValid(updatedCard) ? updatedCard.data : likeAppend(item)) : item))
        );

        function likeAppend(item) {
          item.likes.push(updatedCard.itemId);
          return item;
        }
      })
      .catch((err) => {
        console.error(err);
        // Optionally set an error message for the user
      });
  };
  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwt");
  };
  function isValid(updatedCard) {
    if (updatedCard && updatedCard.data) {
      return true;
    }
    return false;
  }
  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => 
    api
      .addItem({ name, imageUrl, weather, token })
      .then((newCard) => {
        // debugger;
        // const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
        setClothingItems([
          { name, imageUrl: imageUrl, weather, _id: newCard._id },
          ...clothingItems,
        ]);
      });
    handleSubmit(makeRequest, closeActiveModal);
  };

  useEffect(() => {
    getWeather(coordiantes, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   api.getCards().then(setCards);
  // }, [])

  

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((error) => {
        setErrorMessage(
          "Unable to load clothing items. Please refresh the page."
        );
        console.error("Error fetching clothing items:", error);
      });
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegistrationModal = () => {
    setActiveModal("register");
  };
  useEffect(() => {
    if (!activeModal) return;
    const handleOverlayClickClose = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("click", handleOverlayClickClose);

    return () => {
      document.removeEventListener("click", handleOverlayClickClose);
    };
  }, [activeModal]);

  const getUserData = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    const makeRequest = () =>
    api
      .register({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error(err);
        if (err.message.includes("409")) {
          setErrorMessage("This email is already registered");
        } else if (err.message.includes("login")) {
          setErrorMessage(
            "Registration successful but login failed. Please try logging in."
          );
        } else {
          setErrorMessage(
            err.message || "Registration failed. Please try again."
          );
        }
      });
    handleSubmit(makeRequest, closeActiveModal);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () =>
    api
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return api.checkToken(res.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        if (userData) {
          setCurrentUser(userData);
          closeActiveModal();
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message || "An error occurred during login");
      });
      handleSubmit(makeRequest, closeActiveModal);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={openLoginModal}
              setErrorMessage={setErrorMessage}
              onRegisterClick={openRegistrationModal}
              handleSignOut={handleSignOut}
              onAddNewItem={handleAddClick}
              isLoggedIn={currentUser !== null}
            />
            <Routes>
              <Route
                path="/"
                element={
                  weatherData.temp ? (
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  ) : (
                    <p>Loading...</p>
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute currentUser={currentUser}>
                    <Profile
                      isLoggedIn={currentUser !== null}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      handleEditProfile={handleEditProfile}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            handleCloseClick={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onItemModalSubmit={handleItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectCard}
            handleCloseClick={closeActiveModal}
            onDelete={openConfirmationDeleteModal}
          />
          <ConfirmationDeleteModal
            handleCloseClick={closeActiveModal}
            handleDeleteConfirm={handleCardDelete}
            isOpen={activeModal === "delete-confirmation"}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onSubmit={handleRegister}
            onClickLogin={openLoginModal}
            handleCloseClick={closeActiveModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onSubmit={handleLogin}
            onClickRegister={openRegistrationModal}
            handleCloseClick={closeActiveModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            handleCloseClick={closeActiveModal}
            onSubmit={handleUpdateProfile}
            errorMessage={errorMessage}
          />
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
              <button onClick={() => setErrorMessage(null)}>&times;</button>
            </div>
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

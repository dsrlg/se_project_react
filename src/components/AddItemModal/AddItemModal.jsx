import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState } from 'preact/hooks';

export default  function AddItemModal({handleCloseClick,isOpen, activeModal, onItemModalSubmit}){
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleWeatherChange = (e)=>{
    setName(e.target.value);
  }

  const handleImageUrlChange = (e)=>{
    setImageUrl(e.target.value);
  }

  const handleNameChange = (e)=>{
    setName(e.target.value);
  }
const handleSubmit = (e) =>{
e.preventDefault();
onItemModalSubmit({name, imageUrl,weather}); 
setImageUrl("");
setName("");
setWeather("");
};

return(
    <ModalWithForm
          buttonText="Add garment"
          titleText="New garment"
          activeModal={activeModal}
          handleCloseClick={handleCloseClick}
          isOpen={isOpen}
          onSubmit={handleSubmit

          }
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              required
              minLength="1"
              maxLength="30"
              onChange={handleNameChange}
              value={name}
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="text"
              className="modal__input"
              id="imageUrl"
              placeholder="ImageUrl"
              required
              onChange={handleImageUrlChange}
              value={imageUrl}
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
                value="Hot"
                onChange={handleWeatherChange}
                checked={weather === "Hot"}
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
                value="Warm"
                onChange={handleWeatherChange}
                checked={weather === "warm"}
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
                value="Cold"
                onChange={handleWeatherChange}
                checked={weather === "Cold"}
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
);
}
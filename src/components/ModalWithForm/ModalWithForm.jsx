import "./ModalWithForm.css";
import close from "../../assets/close.png";

import React from "react";
import {Modal} from "../Modal/Modal.jsx";
function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpen,
  handleCloseClick,
  onSubmit,
  isLoading,
  disabled,
  secondaryButtonText,
  secondaryButtonAction,
}) {
  return (
    isOpen && (
      <Modal onClose={handleCloseClick} isOpen={isOpen}>
        <h2 className="modal__title">{titleText}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons-container">
            <button
              type="submit"
              className="modal__submit"
              disabled={isLoading || disabled}
            >
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-btn"
                onClick={secondaryButtonAction}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </Modal>
    )
  );
}

export default ModalWithForm;

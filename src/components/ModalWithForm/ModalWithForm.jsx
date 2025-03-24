import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  isOpen,
  handleCloseClick,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          type="button"
          onClick={handleCloseClick}
          className="modal__close"
        ></button>
        <form 
        onSubmit={onSubmit}
        className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

import "./ItemModal.css";
import close from "../../assets/close.png";

function ItemModal({ activeModal, card, handleCloseClick, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          onClick={handleCloseClick}
          className="modal__close"
        >
          <img src={close} alt="close" />
        </button>
        <img src={card.imageUrl} alt="modal image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            className="modal__delete_card"
            onClick={() => onDelete(card._id)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

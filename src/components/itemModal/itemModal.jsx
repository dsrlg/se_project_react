import "./ItemModal.css";

function ItemModal({activeModal, card, handleCloseClick}){

    return(
<div  className={`modal ${activeModal ==="preview" && "modal__opened" }`}>
    <div className="modal__content modal__content_type_image"> 
    <button 
        type="button"
        onClick={handleCloseClick}
        className="modal__close">Close</button>
        <img src="{card.link}" alt="" className="modal__image" />
    </div>
    <div className="modal__footer">
        <h2 className="modal__caption">
            {card.name}
        </h2>
        <p className="modal__weather">
            Weather: {card.weather}
        </p>
    </div>
</div>
    );
}

export default ItemModal;
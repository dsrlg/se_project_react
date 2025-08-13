import "./ItemCard.css";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const token = localStorage.getItem("jwt");
  const [isLiked, setIsLiked] = useState(
    currentUser?._id && item.likes?.includes(currentUser._id)
  );
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    onCardLike({ _id: item._id, isLiked });
  };
  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {token && (
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_is-active" : ""
            }`}
            onClick={handleLikeClick}
          >
            ♥
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;

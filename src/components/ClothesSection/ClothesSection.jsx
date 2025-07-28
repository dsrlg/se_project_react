import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__menu">
        <p className="clothes-section__text">Your Items</p>
        <button
          className="clothes-section__button"
          onClick={handleAddClick}
          type="button"
        >
          +Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((filteredCard, index) => (
          <ItemCard
            key={filteredCard._id || `item-${index}`}
            item={filteredCard}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

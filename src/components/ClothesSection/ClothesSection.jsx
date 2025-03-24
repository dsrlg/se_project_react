import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
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
      <ul className="cards-section__items">
        {clothingItems.map((item) => {
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
          />;
        })}
      </ul>
    </div>
  );
}

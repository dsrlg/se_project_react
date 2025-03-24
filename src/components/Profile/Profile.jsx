import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";

export default function Profile({onCardClick, clothingItems, handleAddClick}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

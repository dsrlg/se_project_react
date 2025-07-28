import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({

  onCardClick,
  clothingItems,
  onCardLike,
  handleAddClick,
  handleEditProfile,
  handleSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleSignOut={handleSignOut}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
          handleEditProfile={handleEditProfile}

        />
      </section>
    </div>
  );
}

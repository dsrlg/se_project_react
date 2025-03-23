import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import "./Profile.css";


export default function Profile({onCardClick}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection/>
      </section>
    </div>
  );
}

import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection(onCardClick){
    return(
        <div className="clothes-section__items">
            <div>
                <p>Your Items</p>
                <button>+Add New</button>
                </div>
                <ul className="cards__list">
          {defaultClothingItems.map((filteredCard)=>{
            <ItemCard
            key={filteredCard._id}
            card={filteredCard}
            onCardClick={onCardClick}
            />
          })
        }
        </ul>
        </div>
            );
          }
    
import "./WorldMap.css";
import MapZone from "../MapZone";

import gardenIcon from "../../assets/icons/garden.png";
import plantsIcon from "../../assets/icons/plants.png";
import villageIcon from "../../assets/icons/village.png";
import farmIcon from "../../assets/icons/farm.png";
import galleryIcon from "../../assets/icons/gallery.png";
import shopIcon from "../../assets/icons/shop.png";

export default function WorldMap() {
  return (
    <div className="world-map">
      {/* Title */}
      <h1 className="map-title">Hasiru Haadi</h1>

      {/* Curved Path */}
      <svg
        className="map-path"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        <path
          d="
            M -100 160
            C 150 100, 300 220, 450 160
            C 600 100, 760 220, 900 160
            C 1050 110, 1200 180, 1350 150
          "
          fill="none"
          stroke="#a07055"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* subtle highlight */}
        <path
          d="
            M -100 160
            C 150 100, 300 220, 450 160
            C 600 100, 760 220, 900 160
            C 1050 110, 1200 180, 1350 150
          "
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Zones */}
      <MapZone
        label="Gallery"
        route="/gallery"
        icon={galleryIcon}
        position={{ top: "30%", left: "25%" }}
      />

      <MapZone
        label="Village"
        route="/village"
        icon={villageIcon}
        position={{ top: "42%", left: "52%" }}
        featured
      />

      <MapZone
        label="Shop"
        route="/shop"
        icon={shopIcon}
        position={{ top: "30%", left: "72%" }}
      />

      <MapZone
        label="Garden"
        route="/garden"
        icon={gardenIcon}
        position={{ top: "62%", left: "22%" }}
      />

      <MapZone
        label="Plants"
        route="/plants"
        icon={plantsIcon}
        position={{ top: "66%", left: "45%" }}
      />

      <MapZone
        label="Farm"
        route="/farm"
        icon={farmIcon}
        position={{ top: "54%", left: "78%" }}
      />
    </div>
  );
}

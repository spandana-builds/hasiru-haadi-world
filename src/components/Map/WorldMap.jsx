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
      {/* Title + tagline */}
      <div className="map-header">
        <h1 className="map-title">Hasiru Haadi</h1>
        <p className="map-tagline">A green world built by two sisters — plants, farm &amp; village life</p>
      </div>

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
      <MapZone label="Gallery" route="/gallery" icon={galleryIcon} position={{ top: "24%", left: "20%" }} delay={0} />
      <MapZone label="Shop"    route="/shop"    icon={shopIcon}    position={{ top: "24%", left: "80%" }} delay={0.1} />
      <MapZone label="Village" route="/village" icon={villageIcon} position={{ top: "42%", left: "50%" }} delay={0.2} featured />
      <MapZone label="Garden"  route="/garden"  icon={gardenIcon}  position={{ top: "64%", left: "20%" }} delay={0.3} />
      <MapZone label="Farm"    route="/farm"    icon={farmIcon}    position={{ top: "64%", left: "80%" }} delay={0.4} />
      <MapZone label="Plants"  route="/plants"  icon={plantsIcon}  position={{ top: "78%", left: "50%" }} delay={0.5} />

      {/* Explore hint */}
      <div className="explore-hint" aria-hidden="true">
        <span className="explore-pulse" />
        Tap a zone to explore
      </div>
    </div>
  );
}

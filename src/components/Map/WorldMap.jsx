import "./WorldMap.css";
import MapZone from "../MapZone";

import gardenIcon from "../../assets/icons/garden.png";
import plantsIcon from "../../assets/icons/plants.png";
import villageIcon from "../../assets/icons/village.png";
import farmIcon from "../../assets/icons/farm.png";
import galleryIcon from "../../assets/icons/gallery.png";
import shopIcon from "../../assets/icons/shop.png";
import journalIcon from "../../assets/icons/journal.png";

export default function WorldMap() {
  return (
    <div className="world-map">
      {/* Title + tagline */}
      <div className="map-header">
        <h1 className="map-title">Hasiru Haadi</h1>
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
      <MapZone label="Gallery" route="/gallery" icon={galleryIcon} position={{ top: "18%", left: "18%" }} delay={0} />
      <MapZone label="Shop" route="/shop" icon={shopIcon} position={{ top: "31%", left: "84%" }} delay={0.1} />
      <MapZone label="Village" route="/village" icon={villageIcon} position={{ top: "39%", left: "48%" }} delay={0.2} featured />
      <MapZone label="Garden" route="/garden" icon={gardenIcon} position={{ top: "58%", left: "12%" }} delay={0.3} />
      <MapZone label="Farm" route="/farm" icon={farmIcon} position={{ top: "49%", left: "83%" }} delay={0.4} />
      <MapZone label="Plants" route="/plants" icon={plantsIcon} position={{ top: "76%", left: "37%" }} delay={0.5} />
      <MapZone label="Journal" route="/journal" icon={journalIcon} position={{ top: "47%", left: "67%" }} delay={0.6} />

      {/* Explore hint */}
      <div className="explore-hint" aria-hidden="true">
        <span className="explore-pulse" />
        Tap a zone to explore
      </div>
    </div>
  );
}

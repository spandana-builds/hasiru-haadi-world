import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import WorldMap from "./components/Map/WorldMap";
import Garden from "./pages/Garden";
import Village from "./pages/Village";
import Plants from "./pages/Plants";
import Gallery from "./pages/Gallery";
import Farm from "./pages/Farm";
import Shop from "./pages/Shop";
import Journal from "./pages/Journal";
import BlogPost from "./pages/BlogPost";

const metadata = {
  "/": ["Hasiru Haadi — Garden, Farm & Green Living", "Explore Hasiru Haadi, a green world built by two sisters, with a backyard vegetable garden, plants, family farm, village stories and a nature-inspired shop."],
  "/garden": ["Our Garden | Hasiru Haadi", "Discover the Hasiru Haadi backyard vegetable garden, its garden beds, seasonal vegetables, herbs and harvest moments."],
  "/village": ["Yerigenahalli Village | Hasiru Haadi", "Explore stories and photographs from Yerigenahalli, its fields, village life and peaceful landscapes."],
  "/plants": ["My Plants | Hasiru Haadi", "Follow a personal plant journey, discover plant moments and explore the Hasiru Haadi plant watering tracker."],
  "/gallery": ["Gallery | Hasiru Haadi", "Browse photographs and everyday moments from the gardens, farm, plants and village life of Hasiru Haadi."],
  "/farm": ["Our Farm | Hasiru Haadi", "Learn about the Hasiru Haadi family farm, its coconut and areca trees, seasonal crops and irrigation."],
  "/shop": ["Hasiru Haadi Shop", "Visit the Hasiru Haadi marketplace, a small sister-led venture inspired by plants, nature and thoughtful living."],
  "/journal": ["Journal | Hasiru Haadi", "Stories rooted in nature — village memories, garden adventures, farm life and a personal green journey."]
};

function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = metadata[pathname] || ["Hasiru Haadi Journal", "Stories rooted in nature from Hasiru Haadi."];
    document.title = title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://hasiru-haadi-world.vercel.app${pathname}`;
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteMetadata />
      <Routes>
        <Route path="/" element={<WorldMap />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/village" element={<Village />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

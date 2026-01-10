import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldMap from "./components/Map/WorldMap";

import Garden from "./pages/Garden";
import Village from "./pages/Village";
import Plants from "./pages/Plants";
import Gallery from "./pages/Gallery";
import Farm from "./pages/Farm";
import Shop from "./pages/Shop";
import { useEffect } from "react";


function App() {
  useEffect(() => {
  document.title = "Hasiru Haadi — Garden, Farm & Green Living";
}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorldMap />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/village" element={<Village />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/farm" element={<Farm />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

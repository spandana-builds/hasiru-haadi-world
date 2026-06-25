import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import WorldMap from "./components/Map/WorldMap";
import Garden   from "./pages/Garden";
import Village  from "./pages/Village";
import Plants   from "./pages/Plants";
import Gallery  from "./pages/Gallery";
import Farm     from "./pages/Farm";
import Shop     from "./pages/Shop";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<WorldMap />} />
        <Route path="/garden"  element={<Garden />} />
        <Route path="/village" element={<Village />} />
        <Route path="/plants"  element={<Plants />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/farm"    element={<Farm />} />
        <Route path="/shop"    element={<Shop />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    document.title = "Hasiru Haadi — Garden, Farm & Green Living";
  }, []);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;

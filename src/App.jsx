import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import MediaLibrary from "./admin/MediaLibrary";
import AdminRoute from "./admin/AdminRoute";

function App() {
  useEffect(() => {
    document.title = "Hasiru Haadi — Stories Rooted in Nature";
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
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/media" element={<AdminRoute><MediaLibrary /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

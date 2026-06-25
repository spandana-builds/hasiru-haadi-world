import { useState } from "react";
import FadeIn      from "../components/FadeIn";
import PageWrapper from "../components/PageWrapper";
import ExploreMore from "../components/ExploreMore";
import BackToMap   from "../components/BackToMap";
import "./Gallery.css";

const imageModules = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true }
);
const images = Object.values(imageModules).map(mod => mod.default);

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <PageWrapper>
      <div className="gallery-page">
        <BackToMap />

        <FadeIn>
          <header className="gallery-header">
            <h1>Gallery</h1>
            <p>Moments collected slowly, without noise.</p>
          </header>
        </FadeIn>

        <FadeIn delay={0.05}>
          {images.length === 0 ? (
            <p className="gallery-empty">No images found. Check the gallery folder.</p>
          ) : (
            <section className="gallery-grid">
              {images.map((src, index) => (
                <div
                  className="gallery-item"
                  key={index}
                  onClick={() => setActiveImage(src)}
                >
                  <img src={src} alt={`Gallery ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </section>
          )}
        </FadeIn>

        <ExploreMore current="/gallery" />

        <footer className="gallery-footer">
          Some moments don't need captions.
        </footer>

        {/* Lightbox */}
        {activeImage && (
          <div className="lightbox" onClick={() => setActiveImage(null)}>
            <span className="lightbox-close">✕</span>
            <img src={activeImage} alt="Full view" onClick={e => e.stopPropagation()} />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

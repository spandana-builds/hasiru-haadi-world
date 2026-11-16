import { useEffect, useState } from "react";
import "./Gallery.css";
import BackToMap from "../components/BackToMap";

const imageModules = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

const images = Object.values(imageModules).map((mod) => mod.default);

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  return (
    <main className="gallery-page">
      <BackToMap />

      <header className="gallery-header">
        <h1>Gallery</h1>
        <p>Moments collected slowly, without noise.</p>
      </header>

      {images.length === 0 ? (
        <p className="gallery-empty" role="status">
          No images found. Check the gallery folder.
        </p>
      ) : (
        <section className="gallery-grid" aria-label="Photo gallery">
          {images.map((src, index) => (
            <button
              type="button"
              className="gallery-item"
              key={src}
              onClick={() => setActiveImage(src)}
              aria-label={`Open gallery image ${index + 1}`}
            >
              <img
                src={src}
                alt={`Hasiru Haadi gallery photograph ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </section>
      )}

      <footer className="gallery-footer">
        Some moments don’t need captions.
      </footer>

      {activeImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Close image preview"
            onClick={() => setActiveImage(null)}
            autoFocus
          >
            <span aria-hidden="true">✕</span>
          </button>
          <img
            src={activeImage}
            alt="Selected photograph enlarged"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}

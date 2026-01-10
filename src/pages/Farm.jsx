import BackToMap from "../components/BackToMap";
import "./Farm.css";

export default function Farm() {
  return (
    <div className="farm-page">
      <BackToMap />

      {/* Hero */}
      <section className="farm-hero fade-in">
        <h1>Our Farm</h1>
        <p className="farm-subtitle">
          Rooted in tradition, growing with care.
        </p>
      </section>

      {/* Story */}
      <section className="farm-story fade-in">
        <h2>Our Farm Story</h2>

        <p>
          Living in the heart of Kalpataru Naadu, our lives are shadowed by the 
          grace of coconut palms. Our farm, located just a walkable distance from 
          our home, is the center of our daily lives. While the land provides, it is my
          father who nurtures it; he is the backbone of every development here.


        </p>

        <p>
         We cultivate a diverse ecosystem: alongside the abundant coconut 
         trees, we grow areca nuts, mangoes, and cashew nuts. We also stay
         true to our roots by growing seasonal staples like Ragi—our primary 
         food source—and green gram. Recently, stepping towards further development, 
         my father expanded the plantation with new saplings. To ensure the land thrives
         sustainably, we rely on a borewell-sourced drip irrigation system, making every drop count.
        </p>

     
        <p className="farm-signature">
         It is a labor of love that sustains us, ensuring that our land flourishes for generations to come.
        </p>
      </section>

      {/* Footer */}
      <footer className="farm-footer">
        <p>Grounded in soil, guided by care.</p>
      </footer>
    </div>
  );
}

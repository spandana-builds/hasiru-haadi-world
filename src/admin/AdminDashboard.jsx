import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./admin.css";

const sections = [
  { number: "01", title: "Page content", description: "Manage text and images across your website.", status: "Coming next" },
  { number: "02", title: "Journal", description: "Create, edit, publish and remove stories.", status: "Coming next" },
  { number: "03", title: "Shop", description: "Manage products, photos and prices.", status: "Coming next" },
  { number: "04", title: "Media library", description: "Organise the images used across Hasiru Haadi.", status: "Coming next" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin", { replace: true });
  };

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar">
        <a href="/" className="admin-brand">hasiru haadi<span>.</span></a>
        <div className="admin-topbar-actions"><span className="admin-status"><i /> Private admin</span><button type="button" className="admin-signout" onClick={handleSignOut}>Sign out</button></div>
      </header>
      <section className="admin-welcome">
        <p className="admin-kicker">YOUR WEBSITE, YOUR SPACE</p>
        <h1>Good to see you.</h1>
        <p>Manage the stories, images and little details that make Hasiru Haadi yours.</p>
      </section>
      <section className="admin-section-grid" aria-label="Admin tools">
        {sections.map((section) => <article className="admin-tool-card" key={section.number}><span className="admin-tool-number">{section.number}</span><h2>{section.title}</h2><p>{section.description}</p><span className="admin-tool-status">{section.status}</span></article>)}
      </section>
      <p className="admin-dashboard-note">Your existing public website remains unchanged while we build these tools.</p>
    </main>
  );
}

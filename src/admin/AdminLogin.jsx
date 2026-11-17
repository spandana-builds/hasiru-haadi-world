import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminEmail, isSupabaseConfigured, supabase } from "../lib/supabase";
import "./admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isSupabaseConfigured || !adminEmail) {
    return <main className="admin-screen"><section className="admin-panel"><p className="admin-kicker">HASIRU HAADI · PRIVATE SPACE</p><h1>Admin setup</h1><p>Configure <code>VITE_SUPABASE_URL</code>, <code>VITE_SUPABASE_ANON_KEY</code> and <code>VITE_ADMIN_EMAIL</code> in your local <code>.env.local</code> file.</p><Link className="admin-back-link" to="/">← Back to website</Link></section></main>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (email.trim().toLowerCase() !== adminEmail) {
      setMessage("This email is not authorised for the admin panel.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <main className="admin-screen">
      <section className="admin-panel">
        <Link to="/" className="admin-brand">hasiru haadi<span>.</span></Link>
        <p className="admin-kicker">PRIVATE ADMIN SPACE</p>
        <h1>Welcome back.</h1>
        <p className="admin-description">Sign in to manage your green world.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email address</label>
          <input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {message && <p className="admin-message" role="alert">{message}</p>}
          <button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        <Link to="/" className="admin-back-link">← Back to website</Link>
      </section>
    </main>
  );
}

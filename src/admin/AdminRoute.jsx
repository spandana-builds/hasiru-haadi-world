import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { adminEmail, isSupabaseConfigured, supabase } from "../lib/supabase";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !adminEmail) {
      setStatus("configuration-error");
      return undefined;
    }

    let active = true;
    const verifySession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error || !data.session) {
        setStatus("signed-out");
        return;
      }
      const email = data.session.user.email?.toLowerCase();
      if (email !== adminEmail) {
        await supabase.auth.signOut();
        if (active) setStatus("signed-out");
        return;
      }
      setStatus("allowed");
    };

    verifySession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const email = session?.user?.email?.toLowerCase();
      setStatus(session && email === adminEmail ? "allowed" : "signed-out");
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (status === "checking") return <main className="admin-screen"><p>Checking administrator access…</p></main>;
  if (status === "configuration-error") {
    return <main className="admin-screen"><section className="admin-panel"><p className="admin-kicker">HASIRU HAADI · ADMIN</p><h1>Setup needed</h1><p>Add the Supabase URL, publishable/anon key and administrator email to your local environment file.</p></section></main>;
  }
  if (status !== "allowed") return <Navigate to="/admin" replace />;
  return children;
}

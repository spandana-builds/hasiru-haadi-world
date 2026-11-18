import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function usePageContent(pageKey) {
  const [content, setContent] = useState({});
  useEffect(() => {
    let alive = true;
    if (!supabase) return () => { alive = false; };
    supabase.from("page_content").select("field_key,content_value").eq("page_key", pageKey)
      .then(({ data, error }) => {
        if (alive && !error && data) setContent(Object.fromEntries(data.map((row) => [row.field_key, row.content_value])));
      });
    return () => { alive = false; };
  }, [pageKey]);
  return content;
}

"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// One increment per document load, including React Strict Mode remounts.
// A retry of the same request ID is also deduplicated atomically by Redis.
let viewRequest: Promise<number> | undefined;
function loadViews() {
  return viewRequest ??= fetch("/api/views", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-View-Counter": "1" },
    body: JSON.stringify({ visitId: crypto.randomUUID() }),
    cache: "no-store",
    credentials: "same-origin",
  }).then(async response => {
    if (!response.ok) throw new Error("View count unavailable");
    const data = await response.json();
    if (!Number.isSafeInteger(data.views) || data.views < 0) throw new Error("Invalid view count");
    return data.views as number;
  });
}

export function HomeViews() {
  const [views, setViews] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    loadViews().then(value => { if (active) setViews(value); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);
  return <p className="home-views" title={failed ? "조회수를 일시적으로 불러올 수 없습니다." : "메인 페이지 누적 조회수"}>
    <Eye size={15} aria-hidden="true"/><span>Home views</span>
    <span aria-live="polite" aria-label="누적 조회수">{views === null ? (failed ? "—" : "…") : new Intl.NumberFormat("en-US").format(views)}</span>
  </p>;
}

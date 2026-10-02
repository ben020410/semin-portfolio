"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Project } from "@/lib/projects";

export function RecentProjects({ projects }: { projects: Project[] }) {
  const recent = [...projects].sort((a, b) => b.completedMonth.localeCompare(a.completedMonth)).slice(0, 4);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    visibility();

    document.addEventListener("visibilitychange", visibility);

    return () => {
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!running || hovered || hidden || recent.length < 2) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % recent.length), 2500);
    return () => window.clearInterval(timer);
  }, [running, hovered, hidden, recent.length, index]);
  const p = recent[index];
  if (!p) return null;
  const change = (step: number) => { setRunning(false); setIndex(i => (i + step + recent.length) % recent.length); };
  return <section className="hero-figure recent-projects" aria-label="Recent projects" aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={e => { if (!(e.target as HTMLElement).closest(".rotation-toggle")) setRunning(false); }}>
    <div className="figure-top"><span>RECENT PROJECTS</span><span>{String(index + 1).padStart(2, "0")} / {String(recent.length).padStart(2, "0")}</span></div>
    <div className="recent-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${recent.length}`}>
      <a href={`/projects/${p.slug}`} className="recent-image" aria-label={`View ${p.title}`}><img key={p.slug} src={p.image} alt={p.imageAlt} width="944" height="502" fetchPriority={index === 0 ? "high" : "auto"}/></a>
      <div className="recent-caption"><div aria-live={running ? "off" : "polite"} aria-atomic="true"><strong>{p.title}</strong><p>{p.venue} · {p.year}</p></div><a href={`/projects/${p.slug}`} className="figure-link">View project</a></div>
    </div>
    <div className="recent-controls"><div className="recent-dots" aria-label="Choose a project">{recent.map((item, i) => <button key={item.slug} aria-label={`Show ${item.title}`} aria-current={i === index ? "true" : undefined} onClick={() => { setRunning(false); setIndex(i); }}><span/></button>)}</div><div className="recent-buttons"><button aria-label="Previous project" onClick={() => change(-1)}><ChevronLeft size={18}/></button><button className="rotation-toggle" aria-label={running ? "Pause slideshow" : "Play slideshow"} onClick={() => setRunning(r => !r)}>{running ? <Pause size={16}/> : <Play size={16}/>}</button><button aria-label="Next project" onClick={() => change(1)}><ChevronRight size={18}/></button></div></div>
  </section>;
}

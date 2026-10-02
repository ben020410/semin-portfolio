"use client";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
export function ProjectExplorer() { const [category, setCategory] = useState("All projects"); const visible = projects.filter(p => category === "All projects" || p.category === category); return <><div className="filter-bar"><div className="filters" aria-label="Filter projects by field">{["All projects", "Robotics & AI", "Data & Software"].map(c => <button key={c} className="filter" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div><p className="count" aria-live="polite">{visible.length} projects</p></div><div className="project-grid">{visible.map(p => <ProjectCard key={p.slug} project={p} number={projects.indexOf(p) + 1}/>)}</div></>; }

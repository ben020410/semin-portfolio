"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Moon, Sun, CodeXml, Mail, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projects } from "@/lib/projects";
export function SiteShell({ children }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [menu, setMenu] = useState(false), [search, setSearch] = useState(false), [query, setQuery] = useState(""), [dark, setDark] = useState(false);
    useEffect(() => { const saved = localStorage.getItem("semin-theme"); const d = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches; setDark(d); document.documentElement.dataset.theme = d ? "dark" : "light"; }, []);
    useEffect(() => { setMenu(false); setSearch(false); }, [pathname]);
    useEffect(() => { const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(s => !s);
    } if (e.key === "Escape")
        setMenu(false); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, []);
    function toggleTheme() { const d = !dark; setDark(d); document.documentElement.dataset.theme = d ? "dark" : "light"; localStorage.setItem("semin-theme", d ? "dark" : "light"); }
    const results = projects.filter(p => [p.title, p.summary, p.contribution, ...p.tags].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
    return <><a href="#main" className="skip-link">Skip to content</a><header className="site-header"><div className="wrap header-inner"><a href="/" className="brand"><span className="brand-mark" aria-hidden="true"><img src="/favicon.svg?v=3" width="30" height="30" alt=""/></span><span>Semin Na<small>RESEARCH & ENGINEERING</small></span></a><nav aria-label="Main navigation" className={menu ? "main-nav open" : "main-nav"}>{[["Home", "/"], ["Projects", "/projects"], ["About", "/about"]].map(([name, href]) => <a key={href} href={href} aria-current={pathname === href || (href === "/projects" && pathname.startsWith("/projects/")) ? "page" : undefined} onClick={() => setMenu(false)}>{name}</a>)}</nav><div className="header-actions"><button className="icon-button" aria-label="Search projects" onClick={() => { setQuery(""); setSearch(true); }}><Search size={18}/><kbd>⌘ K</kbd></button><button className="icon-button" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={toggleTheme}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><button className="icon-button menu-button" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X size={22}/> : <Menu size={22}/>}</button></div></div></header>{children}<footer className="wrap site-footer"><div><a className="footer-name" href="/">Semin Na<span> / 나세민</span></a><p>Aerospace Engineering · Seoul National University</p></div><div className="footer-links"><a href="https://github.com/ben020410" target="_blank" rel="noopener noreferrer"><CodeXml size={17}/>GitHub</a><a href="mailto:ben020410@snu.ac.kr"><Mail size={17}/>Email</a><a href="#main">Back to top</a></div><span className="footer-note">Autonomous robotics & embodied AI</span></footer><Dialog open={search} onOpenChange={setSearch}><DialogContent className="search-dialog"><DialogTitle>Find a project</DialogTitle><DialogDescription>Search research topics, methods, or contributions.</DialogDescription><label className="sr-only" htmlFor="project-search">Search projects</label><input id="project-search" className="search-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try calibration, VLM, or SVD…"/><div className="search-results" aria-live="polite">{results.length ? results.map(p => <a key={p.slug} href={`/projects/${p.slug}`} onClick={() => setSearch(false)}><strong>{p.title}</strong><span>{p.category} · {p.role}</span></a>) : <p className="empty-search">No matching projects. Try “vision” or “AI”.</p>}</div><p className="search-hint">Esc to close · Tab to navigate</p></DialogContent></Dialog></>;
}

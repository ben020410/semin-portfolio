import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ProjectDetails } from "@/components/project-details";
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const p = projects.find(p => p.slug === slug); return { title: p?.title ?? "Project not found", description: p?.summary }; }
export default async function ProjectPage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const p = projects.find(p => p.slug === slug); if (!p)
    notFound(); const next = projects[(projects.indexOf(p) + 1) % projects.length]; return <main id="main" className="wrap project-detail"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/projects">Projects</a><span>/</span><span>{p.category}</span></nav><p className="eyebrow">{p.venue.toUpperCase()} / {p.year}</p><h1 className="detail-title">{p.fullTitle}</h1><p className="detail-summary">{p.summary}</p><dl className="detail-meta"><div><dt>MY ROLE</dt><dd>{p.role}</dd></div><div><dt>PERIOD</dt><dd>{p.period}</dd></div><div><dt>FIELD</dt><dd>{p.category}</dd></div></dl><figure className="detail-figure"><img src={p.detailImage ?? p.image} alt={p.detailAlt ?? p.imageAlt} width="944" height="502" className="diagram-image"/><figcaption>{p.detailAlt ?? p.imageAlt}</figcaption></figure><ProjectDetails project={p}/><section className="source-section"><h2>Materials</h2><div className="source-links">{p.sources.map(s => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="material-button">{s.label}<span aria-hidden="true">↗</span></a>)}</div></section><div className="next-project"><div><span>NEXT PROJECT</span><strong>{next.title}</strong></div><a className="inline-link" href={`/projects/${next.slug}`}>Explore project</a></div></main>; }

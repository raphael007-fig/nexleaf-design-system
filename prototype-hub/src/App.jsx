import React, { Suspense, useEffect, useState } from 'react';
import { projects } from './projects.js';

// Tiny hash router — no dependency.
//   #/                      → projects index
//   #/<project>             → project page (its prototypes)
//   #/<project>/<prototype> → open a prototype
function useHashPath() {
  const parse = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [path, setPath] = useState(parse);
  useEffect(() => {
    const on = () => setPath(parse());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
}

const STATUS_COLOR = {
  Active: '#005bd3', Draft: '#616161', 'In Progress': '#005bd3',
  'In Review': '#856404', Done: '#0c5132', Archived: '#9e9e9e',
};

const jiraUrl = (key) => `https://nexleaf.atlassian.net/browse/${key}`;

function ProjectsIndex() {
  return (
    <div className="hub">
      <header className="hub-head">
        <div className="hub-brand">🌿 Nexleaf Prototype Hub</div>
        <p className="hub-sub">Projects, each with its prototypes — all built from the Poltail design system.</p>
      </header>
      {projects.length === 0 && (
        <div className="hub-empty">No projects yet. Run <code>npm run new-project</code> to create one.</div>
      )}
      <div className="hub-grid">
        {projects.map((p) => (
          <a key={p.slug} className="hub-card" href={`#/${p.slug}`}>
            <div className="hub-card-top">
              <span className="hub-status" style={{ color: STATUS_COLOR[p.status] || '#616161' }}>● {p.status}</span>
              {p.jiraEpic && <span className="hub-jira">{p.jiraEpic}</span>}
            </div>
            <div className="hub-card-title">{p.title}</div>
            <div className="hub-card-desc">{p.description}</div>
            <div className="hub-card-foot">
              <span className="hub-tag">{p.prototypes.length} prototype{p.prototypes.length === 1 ? '' : 's'}</span>
              <span className="hub-updated">{p.updated}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectPage({ project }) {
  return (
    <div className="hub">
      <header className="hub-head">
        <a href="#/" className="hub-back">← All projects</a>
        <div className="hub-brand" style={{ marginTop: 8 }}>{project.title}</div>
        <p className="hub-sub">{project.description}</p>
        <div className="hub-links">
          {project.jiraEpic && <a className="hub-link" href={jiraUrl(project.jiraEpic)} target="_blank" rel="noreferrer">Jira epic {project.jiraEpic}</a>}
          {project.prd && <a className="hub-link" href={project.prd} target="_blank" rel="noreferrer">PRD</a>}
          {project.figma && <a className="hub-link" href={project.figma} target="_blank" rel="noreferrer">Figma</a>}
        </div>
      </header>
      {project.prototypes.length === 0 && (
        <div className="hub-empty">No prototypes yet. Run <code>npm run new -- {project.slug} &lt;slug&gt; "Title"</code>.</div>
      )}
      <div className="hub-grid">
        {project.prototypes.map((p) => (
          <a key={p.slug} className="hub-card" href={`#/${project.slug}/${p.slug}`}>
            <div className="hub-card-top">
              <span className="hub-status" style={{ color: STATUS_COLOR[p.status] || '#616161' }}>● {p.status}</span>
              <span className="hub-type">{p.type}</span>
              {p.jiraKey && <span className="hub-jira">{p.jiraKey}</span>}
            </div>
            <div className="hub-card-title">{p.title}</div>
            <div className="hub-card-desc">{p.description}</div>
            <div className="hub-card-foot">
              <div className="hub-tags">{(p.tags || []).map((t) => <span key={t} className="hub-tag">{t}</span>)}</div>
              <span className="hub-updated">{p.updated}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Parses CHANGELOG.md into entries: "## <heading>" + body lines.
function parseChangelog(md) {
  if (!md) return [];
  return md
    .split(/^## /m)
    .slice(1)
    .map((block) => {
      const [heading, ...rest] = block.split('\n');
      return { heading: heading.trim(), body: rest.join('\n').trim() };
    });
}

function ActivityPanel({ proto, onClose }) {
  const entries = parseChangelog(proto.changelog);
  return (
    <aside className="hub-activity" aria-label="Activity log">
      <div className="hub-activity-head">
        <span>Activity — {proto.title}</span>
        <button className="hub-activity-close" onClick={onClose} aria-label="Close">✕</button>
      </div>
      {entries.length === 0 && <div className="hub-activity-empty">No activity recorded yet.</div>}
      {entries.map((e, i) => (
        <div key={i} className="hub-activity-entry">
          <div className="hub-activity-title">{e.heading}</div>
          <pre className="hub-activity-body">{e.body}</pre>
        </div>
      ))}
    </aside>
  );
}

export default function App() {
  const [projectSlug, protoSlug] = useHashPath();
  const [showActivity, setShowActivity] = useState(false);
  const project = projects.find((p) => p.slug === projectSlug);

  useEffect(() => setShowActivity(false), [projectSlug, protoSlug]);

  if (!project) return <ProjectsIndex />;

  const proto = protoSlug && project.prototypes.find((p) => p.slug === protoSlug);
  if (!proto) return <ProjectPage project={project} />;

  const Proto = React.lazy(proto.load);
  return (
    <div>
      <div className="hub-topbar">
        <a href={`#/${project.slug}`} className="hub-back">← {project.title}</a>
        <span className="hub-topbar-title">{proto.title}</span>
        <span className="hub-type">{proto.type}</span>
        {proto.jiraKey && (
          <a className="hub-jira" href={jiraUrl(proto.jiraKey)} target="_blank" rel="noreferrer">{proto.jiraKey}</a>
        )}
        <button className="hub-activity-btn" onClick={() => setShowActivity((v) => !v)}>
          {showActivity ? 'Hide activity' : 'Activity'}
        </button>
      </div>
      {showActivity && <ActivityPanel proto={proto} onClose={() => setShowActivity(false)} />}
      <Suspense fallback={<div className="hub-loading">Loading prototype…</div>}>
        <Proto />
      </Suspense>
    </div>
  );
}

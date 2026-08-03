import React, { Suspense, useEffect, useState } from 'react';
// RULE: every visible element in the hub is a Poltail design-system component.
// No hand-rolled UI. See .claude/skills/ds-components-only + FIGMA-MAP.md.
import {
  IndexTable, LinkCell, Badge, Tag, TagGroup,
  NavCard, Page, SlideOver, Btn, Card,
  TEXT_SUBDUED,
} from '@ds';
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

// Poltail Badge tones per status
const STATUS_TONE = {
  Active: 'info',
  Draft: 'default',
  'In Progress': 'info',
  'In Review': 'attention',
  Done: 'success',
  Archived: 'default',
};

const jiraUrl = (key) => `https://nexleaf.atlassian.net/browse/${key}`;
const go = (hash) => { window.location.hash = hash; };

function ProjectsIndex() {
  return (
    <div className="hub">
      <Page
        title="Nexleaf Prototype Hub"
        subtitle="Projects, each with its prototypes — all built from the Poltail design system."
      />
      {projects.length === 0 && (
        <Card>No projects yet. Run <code>npm run new-project</code> to create one.</Card>
      )}
      <div className="hub-grid">
        {projects.map((p) => (
          <NavCard
            key={p.slug}
            title={p.title}
            description={p.description}
            buttonLabel="Enter"
            onButtonClick={() => go(`#/${p.slug}`)}
            onClick={() => go(`#/${p.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectPage({ project }) {
  const [sortKey, setSortKey] = useState('updated');
  const [sortDir, setSortDir] = useState('desc');

  const sorted = [...project.prototypes].sort((a, b) => {
    const av = String(a[sortKey] ?? '');
    const bv = String(b[sortKey] ?? '');
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const links = [
    project.jiraEpic && { label: `Jira epic ${project.jiraEpic}`, href: jiraUrl(project.jiraEpic) },
    project.prd && { label: 'PRD', href: project.prd },
    project.figma && { label: 'Figma', href: project.figma },
  ].filter(Boolean);

  return (
    <div className="hub">
      <Page
        title={project.title}
        subtitle={project.description}
        backAction={{ label: 'All projects', onClick: () => go('#/') }}
        metadata={[{ label: project.status, tone: STATUS_TONE[project.status] || 'default' }]}
      />
      {links.length > 0 && (
        <div className="hub-links">
          <LinkCell items={links} visible={links.length} />
        </div>
      )}
      {project.prototypes.length === 0 && (
        <Card>
          No prototypes yet. Run <code>npm run new -- {project.slug} &lt;slug&gt; "Title"</code>.
        </Card>
      )}
      {project.prototypes.length > 0 && (
        <div className="hub-tablewrap">
        <IndexTable
          bare
          columns={[
            {
              key: 'title',
              label: 'Prototype',
              sortable: true,
              render: (row) => (
                <div>
                  <LinkCell items={[{ label: row.title, href: `#/${project.slug}/${row.slug}` }]} />
                  <div style={{ fontSize: 12, color: TEXT_SUBDUED, lineHeight: 1.45, marginTop: 2, maxWidth: 420 }}>
                    {row.description}
                  </div>
                </div>
              ),
            },
            {
              key: 'type',
              label: 'Type',
              render: (row) => <Badge>{row.type}</Badge>,
            },
            {
              key: 'status',
              label: 'Status',
              sortable: true,
              render: (row) => (
                <Badge tone={STATUS_TONE[row.status] || 'default'}>{row.status}</Badge>
              ),
            },
            {
              key: 'jiraKey',
              label: 'Jira',
              render: (row) =>
                row.jiraKey
                  ? <LinkCell items={[{ label: row.jiraKey, href: jiraUrl(row.jiraKey) }]} />
                  : '—',
            },
            {
              key: 'tags',
              label: 'Tags',
              render: (row) => (
                <TagGroup gap={6}>
                  {(row.tags || []).map((t) => <Tag key={t} label={t} />)}
                </TagGroup>
              ),
            },
            { key: 'updated', label: 'Updated', sortable: true },
            {
              key: 'open',
              label: '',
              render: (row) => (
                <LinkCell items={[{ label: 'Open →', href: `#/${project.slug}/${row.slug}` }]} />
              ),
            },
          ]}
          rows={sorted.map((p, i) => ({ id: p.slug || i, ...p }))}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={(key) => {
            if (key === sortKey) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
            else { setSortKey(key); setSortDir('asc'); }
          }}
        />
        </div>
      )}
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

export default function App() {
  const [projectSlug, protoSlug] = useHashPath();
  const [showActivity, setShowActivity] = useState(false);
  const project = projects.find((p) => p.slug === projectSlug);

  useEffect(() => setShowActivity(false), [projectSlug, protoSlug]);

  if (!project) return <ProjectsIndex />;

  const proto = protoSlug && project.prototypes.find((p) => p.slug === protoSlug);
  if (!proto) return <ProjectPage project={project} />;

  const Proto = React.lazy(proto.load);
  const entries = parseChangelog(proto.changelog);

  return (
    <div>
      <div className="hub-topbar">
        <Btn variant="tertiary" onClick={() => go(`#/${project.slug}`)}>← {project.title}</Btn>
        <span className="hub-topbar-title">{proto.title}</span>
        <Badge>{proto.type}</Badge>
        {proto.jiraKey && (
          <LinkCell items={[{ label: proto.jiraKey, href: jiraUrl(proto.jiraKey) }]} />
        )}
        <div className="hub-topbar-spacer" />
        <Btn variant="secondary" onClick={() => setShowActivity((v) => !v)}>
          {showActivity ? 'Hide activity' : 'Activity'}
        </Btn>
      </div>
      <SlideOver
        open={showActivity}
        onClose={() => setShowActivity(false)}
        title={`Activity — ${proto.title}`}
        width={420}
      >
        {entries.length === 0 && <Card>No activity recorded yet.</Card>}
        <div className="hub-activity-list">
          {entries.map((e, i) => (
            <Card key={i}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{e.heading}</div>
              <pre style={{ fontSize: 12, color: TEXT_SUBDUED, whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, lineHeight: 1.5 }}>
                {e.body}
              </pre>
            </Card>
          ))}
        </div>
      </SlideOver>
      <Suspense fallback={<Card>Loading prototype…</Card>}>
        <Proto />
      </Suspense>
    </div>
  );
}

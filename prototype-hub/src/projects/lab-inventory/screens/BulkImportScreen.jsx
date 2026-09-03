// ── Bulk import — spreadsheet register (Phase 1, §5.3) ─────────────────────────
// Each lab already keeps its register in Excel/Word, so the flow maps THEIR
// columns onto our fields instead of forcing re-keying:
//   upload → column map → preview + validation → confirm → rows created.
// Validation flags: duplicate asset tags (within the region), types we could
// not infer, and condition strings that need a human check (§8 mapping —
// "Old"/"New" are age, not condition, and are kept as notes).
import { useMemo, useState } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { Card, CardSectionTitle } from '@ds/components/Card/Card.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { IndexTable } from '@ds/components/IndexTable/IndexTable.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { Stepper } from '@ds/components/Stepper/Stepper.jsx';
import { Upload } from '@ds/components/Upload/Upload.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import { useViewport } from '@ds/foundation/useViewport.js';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '@ds/tokens/index.js';
import { LabShell } from './LabShell.jsx';
import {
  IMPORT_FIELDS, IMPORT_SHEET, CONDITION_MAP, LAB_FACILITIES, PERSONAS,
  LAB_EQUIPMENT, inferType, typeLabel,
} from './labData.js';

const TRAIL = [{ id: 'import', label: 'Import from Spreadsheet' }];
const PHASES = [
  { label: 'Upload', steps: ['upload'] },
  { label: 'Map Columns', steps: ['map'] },
  { label: 'Preview & Validate', steps: ['preview'] },
];

// §8 condition mapping applied to one raw row.
function mapRow(raw, mapping, facilityId) {
  const record = { facilityId, notes: [] };
  IMPORT_SHEET.headers.forEach((header, i) => {
    const field = mapping[header];
    if (!field || field === '__skip') return;
    record[field] = raw[i];
  });
  const issues = [];
  // Duplicate asset tags — within the region (existing register + this sheet).
  if (record.assetTag && LAB_EQUIPMENT.some((r) => r.assetTag.toLowerCase() === String(record.assetTag).toLowerCase())) {
    issues.push({ kind: 'dup', label: 'Duplicate asset tag' });
  }
  // Type inference from the name.
  record.type = inferType(record.name);
  if (!record.type) issues.push({ kind: 'type', label: 'Type not recognised' });
  // Condition mapping.
  const rawCondition = String(record.condition || '').trim().toLowerCase().replace(/[",]+$/, '');
  const mapped = CONDITION_MAP[rawCondition];
  if (!rawCondition) {
    record.condition = 'Not set';
  } else if (!mapped) {
    record.condition = 'Not set';
    issues.push({ kind: 'condition', label: `Condition “${record.condition ?? rawCondition}” needs review` });
  } else if (mapped.age) {
    record.condition = 'Not set';
    record.notes.push(`Sheet said “${rawCondition}” — age, not condition; kept as a note.`);
  } else {
    record.condition = mapped.condition;
    if (mapped.deployment) record.notes.push(`Deployment: ${mapped.deployment} (from “${rawCondition}”).`);
    if (mapped.review) issues.push({ kind: 'review', label: 'Condition needs a human check' });
  }
  return { record, issues, raw };
}

/**
 * @param {'upload'|'map'|'preview'|'importing'|'success'|'error'} state Initial step.
 */
export function BulkImportScreen({ state = 'upload', onDone, onCancel, onCrumb }) {
  const { width } = useViewport();
  const personaDef = PERSONAS[0]; // import is admin work — biomed-lead scope
  const [step, setStep] = useState(['importing', 'success', 'error'].includes(state) ? 'preview' : state);
  const [files, setFiles] = useState(() => (state === 'upload'
    ? []
    : [{ id: 'f1', name: IMPORT_SHEET.fileName, size: '84 KB', progress: 100, status: 'complete' }]));
  const [facilityId, setFacilityId] = useState(state === 'upload' ? '' : 'nhrl');
  const [mapping, setMapping] = useState({ ...IMPORT_SHEET.suggested });
  const [phase, setPhase] = useState(state === 'importing' ? 'importing' : state === 'success' ? 'success' : state === 'error' ? 'error' : 'idle');

  const parsed = useMemo(
    () => IMPORT_SHEET.rows.map((raw) => mapRow(raw, mapping, facilityId)),
    [mapping, facilityId],
  );
  const withIssues = parsed.filter((p) => p.issues.length);
  const clean = parsed.length - withIssues.length;

  const activePhaseIndex = PHASES.findIndex((p) => p.steps.includes(step));

  const header = (
    <Page
      flushTop
      title="Import from Spreadsheet"
      subtitle="Bring a lab’s existing register in as it is — map their columns to ours, review what the mapping found, then create the records."
      backAction={{ onClick: onCancel, ariaLabel: 'Back to Lab Equipment' }}
    />
  );

  if (phase === 'success') {
    return (
      <LabShell level="tertiary" trail={TRAIL} onCrumb={onCrumb}>
        {header}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SubmissionSuccessCard
            title={`${parsed.length} records imported to ${LAB_FACILITIES.find((f) => f.id === facilityId)?.label ?? 'the register'}`}
            sections={[
              {
                title: 'What was created',
                rows: [
                  ['Source file', IMPORT_SHEET.fileName],
                  ['Records created', `${parsed.length} (all cataloged — none monitored)`],
                  ['Flagged for follow-up', `${withIssues.length} — kept, marked for review`],
                  ['Condition mapping', 'Free-text mapped to the Passive Equipment vocabulary; “Old” kept as a note, not a condition'],
                ],
              },
            ]}
            primaryAction={{ label: 'Back to Lab Equipment', onClick: onDone }}
            secondaryActions={[{ label: 'Import another file', onClick: () => { setPhase('idle'); setStep('upload'); setFiles([]); } }]}
          />
        </div>
      </LabShell>
    );
  }

  return (
    <LabShell level="tertiary" trail={TRAIL} onCrumb={onCrumb}>
      {header}
      <Card style={{ maxWidth: 980 }}>
        <Stepper phases={PHASES} activeIndex={activePhaseIndex} compact={width < 720} />

        {step === 'upload' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 620 }}>
            <CardSectionTitle title="Upload the lab’s register" />
            <SearchSelect
              label="Facility"
              required
              placeholder="Which lab does this register belong to?"
              options={LAB_FACILITIES.filter((f) => personaDef.facilities.includes(f.id))}
              value={facilityId}
              onChange={(v) => setFacilityId(v && v.target ? v.target.value : v)}
            />
            <Upload
              label="Register spreadsheet"
              helperText="One file (XLSX or CSV), max 10 MB. Word tables: save as CSV first."
              accept=".xlsx,.csv"
              multiple={false}
              maxFiles={1}
              files={files}
              onAddFiles={() => setFiles([{ id: 'f1', name: IMPORT_SHEET.fileName, size: '84 KB', progress: 100, status: 'complete' }])}
              onRemove={() => setFiles([])}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <Btn variant="secondary" onClick={onCancel}>Cancel</Btn>
              <Btn variant="primary" disabled={!files.length || !facilityId} onClick={() => setStep('map')}>
                Continue to mapping
              </Btn>
            </div>
          </div>
        )}

        {step === 'map' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 620 }}>
            <CardSectionTitle title={`Map columns — ${IMPORT_SHEET.fileName}`} />
            <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
              Their headers, our fields. The suggestions below were matched automatically —
              change any that are wrong. Unmapped columns are not imported.
            </p>
            {IMPORT_SHEET.headers.map((h) => (
              <div key={h} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) 2fr', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 550, color: TEXT_DEFAULT, overflowWrap: 'anywhere' }}>{h}</span>
                <SelectInput
                  ariaLabel={`Map column ${h}`}
                  options={IMPORT_FIELDS}
                  value={mapping[h] || '__skip'}
                  onChange={(e) => setMapping((m) => ({ ...m, [h]: e.target.value }))}
                />
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <Btn variant="secondary" onClick={() => setStep('upload')}>Back</Btn>
              <Btn variant="primary" onClick={() => setStep('preview')}>Preview import</Btn>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <CardSectionTitle title="Preview & validation" />
            {phase === 'error' && (
              <Banner tone="critical" title="Import failed — no records were created"
                actions={[{ label: 'Try again', onClick: () => setPhase('idle') }]}>
                The server rejected the batch before writing anything. The file and your
                mapping are unchanged — retry when connectivity is back.
              </Banner>
            )}
            <Banner
              tone={withIssues.length ? 'warning' : 'success'}
              title={withIssues.length
                ? `${clean} of ${parsed.length} rows are ready · ${withIssues.length} need attention`
                : `All ${parsed.length} rows are ready to import`}
              inCard
            >
              Flagged rows are still imported — they are marked for review so nothing from
              the lab’s register is silently dropped.
            </Banner>
            <IndexTable
              bare
              columns={[
                { key: 'assetTag', label: 'Asset tag', width: 150, primary: true, render: (r) => r.record.assetTag || '—' },
                { key: 'name', label: 'Name', width: 200, render: (r) => r.record.name || '—' },
                { key: 'type', label: 'Type (inferred)', width: 160, render: (r) => (r.record.type ? typeLabel(r.record.type) : <Badge tone="warning">Not recognised</Badge>) },
                { key: 'make', label: 'Make', width: 170, render: (r) => r.record.make || '—' },
                { key: 'condition', label: 'Condition (mapped)', width: 180, render: (r) => r.record.condition },
                {
                  key: 'issues', label: 'Validation', width: 220,
                  render: (r) => (r.issues.length
                    ? (
                      <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
                        {r.issues.map((iss) => (
                          <Badge key={iss.kind} tone={iss.kind === 'dup' ? 'critical' : 'warning'} size="small">{iss.label}</Badge>
                        ))}
                      </span>
                    )
                    : <Badge tone="success" size="small">Ready</Badge>),
                },
              ]}
              rows={parsed.map((p, i) => ({ id: String(i), ...p }))}
              hideCheckbox
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <Btn variant="secondary" onClick={() => setStep('map')} disabled={phase === 'importing'}>
                Back to mapping
              </Btn>
              <Btn
                variant="primary"
                loading={phase === 'importing'}
                onClick={() => { setPhase('importing'); setTimeout(() => setPhase('success'), 1400); }}
              >
                {phase === 'importing' ? 'Importing…' : `Import ${parsed.length} records`}
              </Btn>
            </div>
          </div>
        )}
      </Card>
    </LabShell>
  );
}

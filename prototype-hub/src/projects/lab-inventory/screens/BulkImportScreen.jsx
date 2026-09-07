// ── Bulk import — spreadsheet register (Phase 1, §5.3) ─────────────────────────
// Rides the Add-Equipment WIZARD FRAME (StepFrame — full-width fixed-height
// card, stepper in the frame, pinned footer), matching Prototype C's surface
// (Raf, 2026-09-03: "should have the add equipment frame, and be full width").
// Each lab already keeps its register in Excel/Word, so the flow maps THEIR
// columns onto our fields instead of forcing re-keying:
//   upload → column map → preview + validation → confirm → rows created.
// Validation flags: duplicate asset tags (within the region), types we could
// not infer, and condition strings that need a human check (§8 mapping —
// "Old"/"New" are age, not condition, and are kept as notes).
import { useMemo, useState } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { IndexTable } from '@ds/components/IndexTable/IndexTable.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { Upload } from '@ds/components/Upload/Upload.jsx';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '@ds/tokens/index.js';
// The generic addition-flow wizard system (layer 1 of the Add Equipment flow).
import { StepFrame, FormSection } from '../../add-equipment/screens/AddEquipmentFlow.jsx';
import { LabShell } from './LabShell.jsx';
import {
  IMPORT_FIELDS, IMPORT_SHEET, CONDITION_MAP, LAB_FACILITIES, PERSONAS,
  LAB_EQUIPMENT, inferType, typeLabel, LAB_TYPES,
} from './labData.js';

const TRAIL = [{ id: 'import', label: 'Import from Spreadsheet' }];
const PHASES = [
  { label: 'Upload', steps: ['upload'] },
  { label: 'Map Columns', steps: ['map'] },
  { label: 'Preview & Validate', steps: ['preview'] },
];
const STEP_ORDER = ['upload', 'map', 'preview'];

// §8 condition mapping applied to one raw row.
function mapRow(raw, mapping, facilityId) {
  const record = { facilityId, notes: [] };
  IMPORT_SHEET.headers.forEach((header, i) => {
    const field = mapping[header];
    if (!field || field === '__skip') return;
    record[field] = raw[i];
  });
  if (record.sheetNotes) { record.notes.push(String(record.sheetNotes)); delete record.sheetNotes; }
  const issues = [];
  // Duplicate asset tags — within the region (existing register + this sheet).
  if (record.assetTag && LAB_EQUIPMENT.some((r) => r.assetTag.toLowerCase() === String(record.assetTag).toLowerCase())) {
    issues.push({ kind: 'dup', label: 'Duplicate asset tag' });
  }
  // Type: an explicitly mapped Equipment type column wins; inference from the
  // name is the fallback for the usual case where the sheet has no type column.
  if (record.type) {
    const wanted = String(record.type).trim().toLowerCase();
    const hit = LAB_TYPES.find((t) => t.label.toLowerCase() === wanted || t.id === wanted);
    if (hit) {
      record.type = hit.id;
    } else {
      record.notes.push(`Sheet said type “${String(record.type).trim()}” — not in the managed list.`);
      record.type = inferType(record.name);
    }
  } else {
    record.type = inferType(record.name);
  }
  if (!record.type) issues.push({ kind: 'type', label: 'Type not recognised' });
  // Condition mapping.
  const rawCondition = String(record.condition || '').trim().toLowerCase().replace(/[",]+$/, '');
  const mapped = CONDITION_MAP[rawCondition];
  if (!rawCondition) {
    record.condition = 'Not set';
  } else if (!mapped) {
    record.condition = 'Not set';
    issues.push({ kind: 'condition', label: `Status “${rawCondition}” needs review` });
  } else if (mapped.age) {
    record.condition = 'Not set';
    record.notes.push(`Sheet said “${rawCondition}” — age, not condition; kept as a note.`);
  } else {
    record.condition = mapped.condition;
    if (mapped.deployment) record.notes.push(`Deployment: ${mapped.deployment} (from “${rawCondition}”).`);
    if (mapped.review) issues.push({ kind: 'review', label: 'Status needs a human check' });
  }
  return { record, issues, raw };
}

/**
 * @param {'upload'|'map'|'preview'|'importing'|'success'|'error'} state Initial step.
 */
export function BulkImportScreen({ state = 'upload', onDone, onCancel, onCrumb }) {
  const personaDef = PERSONAS[0]; // import is admin work — biomed-lead scope
  const [step, setStep] = useState(['importing', 'success', 'error'].includes(state) ? 'preview' : state);
  const [files, setFiles] = useState(() => (state === 'upload'
    ? []
    : [{ id: 'f1', name: IMPORT_SHEET.fileName, size: 86016, progress: 100, status: 'complete' }]));
  const [facilityId, setFacilityId] = useState(state === 'upload' ? '' : 'nhrl');
  const [mapping, setMapping] = useState({ ...IMPORT_SHEET.suggested });
  const [phase, setPhase] = useState(state === 'importing' ? 'importing' : state === 'success' ? 'success' : state === 'error' ? 'error' : 'idle');

  const parsed = useMemo(
    () => IMPORT_SHEET.rows.map((raw) => mapRow(raw, mapping, facilityId)),
    [mapping, facilityId],
  );
  const withIssues = parsed.filter((p) => p.issues.length);
  const clean = parsed.length - withIssues.length;

  const [cancelOpen, setCancelOpen] = useState(false);

  const stepIndex = STEP_ORDER.indexOf(step);
  const stepper = {
    phases: PHASES,
    activeIndex: stepIndex,
    // Visited phases are tappable, like the install wizard.
    // Per-phase booleans, not indices — every step up to the current one.
    navigable: PHASES.map((_, i) => i <= stepIndex),
    onSelect: (i) => setStep(STEP_ORDER[i]),
  };

  const header = (
    <Page
      flushTop
      title="Import from Spreadsheet"
      subtitle="Bring a lab’s existing register in as it is — map their columns to ours, review what the mapping found, then create the records."
      backAction={{ onClick: () => setCancelOpen(true), ariaLabel: 'Back to Lab Equipment' }}
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
                heading: 'What was created',
                lines: [
                  { label: 'Source file', value: IMPORT_SHEET.fileName },
                  { label: 'Records created', value: `${parsed.length} (all in the register — none monitored)` },
                  { label: 'Flagged for follow-up', value: `${withIssues.length} — kept, marked for review` },
                  { label: 'Equipment status mapping', value: 'Free-text mapped to the lab’s five conditions; “Old” kept as a note, not a condition' },
                  {
                    label: 'Warranty & service',
                    value: `${parsed.filter((p2) => p2.record.warrantyEnd || p2.record.servicer || p2.record.lastService).length} of ${parsed.length} rows carried warranty or service columns — maintenance status is calculated from them, never imported`,
                  },
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

      {step === 'upload' && (
        <StepFrame
          stepper={stepper}
          title="Upload the lab’s register"
          subtitle="One spreadsheet per facility — the records land under the lab that owns them."
          footerLeft={<Btn variant="secondary" onClick={() => setCancelOpen(true)}>Cancel</Btn>}
          footerRight={(
            <Btn variant="primary" disabled={!files.length || !facilityId} onClick={() => setStep('map')}>
              Continue to mapping
            </Btn>
          )}
        >
          <FormSection title="Facility" required>
            <SearchSelect
              label="Facility"
              required
              placeholder="Which lab does this register belong to?"
              options={LAB_FACILITIES.filter((f) => personaDef.facilities.includes(f.id))}
              value={facilityId}
              onChange={(v) => setFacilityId(v && v.target ? v.target.value : v)}
            />
          </FormSection>
          <FormSection title="Register file" required>
            <Upload
              label="Register spreadsheet"
              helperText="One file (XLSX or CSV), max 10 MB. Word tables: save as CSV first."
              accept=".xlsx,.csv"
              multiple={false}
              maxFiles={1}
              files={files}
              onAddFiles={() => setFiles([{ id: 'f1', name: IMPORT_SHEET.fileName, size: 86016, progress: 100, status: 'complete' }])}
              onRemove={() => setFiles([])}
            />
          </FormSection>
        </StepFrame>
      )}

      {step === 'map' && (
        <StepFrame
          stepper={stepper}
          title={`Map columns — ${IMPORT_SHEET.fileName}`}
          subtitle="Their headers, our fields. The suggestions were matched automatically — change any that are wrong. Unmapped columns are not imported."
          footerLeft={<Btn variant="secondary" onClick={() => setStep('upload')}>Back</Btn>}
          footerRight={<Btn variant="primary" onClick={() => setStep('preview')}>Preview import</Btn>}
        >
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
        </StepFrame>
      )}

      {step === 'preview' && (
        <StepFrame
          stepper={stepper}
          title="Preview & validation"
          subtitle="Flagged rows are still imported — they are marked for review so nothing from the lab’s register is silently dropped."
          contentMaxWidth={1100}
          footerLeft={(
            <Btn variant="secondary" onClick={() => setStep('map')} disabled={phase === 'importing'}>
              Back to mapping
            </Btn>
          )}
          footerRight={(
            <Btn
              variant="primary"
              loading={phase === 'importing'}
              onClick={() => { setPhase('importing'); setTimeout(() => setPhase('success'), 1400); }}
            >
              {phase === 'importing' ? 'Importing…' : `Import ${parsed.length} records`}
            </Btn>
          )}
        >
          {phase === 'error' && (
            <Banner tone="critical" inCard
              actions={[{ label: 'Try again', onClick: () => setPhase('idle') }]}>
              <span style={{ display: 'block', fontWeight: 650 }}>Import failed — no records were created</span>
              The server rejected the batch before writing anything. The file and your
              mapping are unchanged — retry when connectivity is back.
            </Banner>
          )}
          <Banner tone={withIssues.length ? 'warning' : 'success'} inCard>
            <span style={{ display: 'block', fontWeight: 650 }}>
              {withIssues.length
                ? `${clean} of ${parsed.length} rows are ready · ${withIssues.length} need attention`
                : `All ${parsed.length} rows are ready to import`}
            </span>
            Duplicates, unrecognised types and conditions needing a human check are badged
            per row below.
          </Banner>
          <IndexTable
            bare
            columns={[
              { key: 'assetTag', label: 'Asset tag', width: 150, primary: true, render: (r) => r.record.assetTag || '—' },
              { key: 'name', label: 'Name', width: 200, render: (r) => r.record.name || '—' },
              { key: 'type', label: 'Type (inferred)', width: 160, render: (r) => (r.record.type ? typeLabel(r.record.type) : <Badge tone="warning">Not recognised</Badge>) },
              { key: 'make', label: 'Make', width: 170, render: (r) => r.record.make || '—' },
              { key: 'condition', label: 'Equipment status (mapped)', width: 180, render: (r) => r.record.condition },
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
        </StepFrame>
      )}

      {/* Back and Cancel confirm before discarding, the same as the add and
          monitoring flows (Raf, 2026-09-07). */}
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Discard this import?"
        size="small"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, width: '100%' }}>
            <Btn variant="secondary" onClick={() => setCancelOpen(false)}>Keep editing</Btn>
            <Btn variant="primary" tone="critical" onClick={() => { setCancelOpen(false); onCancel?.(); }}>
              Discard import
            </Btn>
          </div>
        )}
      >
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          Nothing has been created in the register yet. The uploaded file and the
          column mapping done here are discarded.
        </p>
      </Modal>
    </LabShell>
  );
}

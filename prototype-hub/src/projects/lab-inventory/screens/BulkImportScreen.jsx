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
import { Accordion } from '@ds/components/Accordion/Accordion.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '@ds/tokens/index.js';
// The generic addition-flow wizard system (layer 1 of the Add Equipment flow).
import { StepFrame, FormSection } from '../../add-equipment/screens/AddEquipmentFlow.jsx';
import { LabShell } from './LabShell.jsx';
import {
  IMPORT_FIELDS, IMPORT_FILES, readSheet, suggestMapping, CONDITION_MAP, LAB_FACILITIES, PERSONAS,
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
function mapRow(raw, headers, mapping, facilityId, source) {
  const record = { facilityId, notes: [] };
  headers.forEach((header, i) => {
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
  return { record, issues, raw, source };
}

/**
 * @param {'upload'|'map'|'preview'|'importing'|'success'|'error'} state Initial step.
 */
export function BulkImportScreen({ state = 'upload', initialFileIds = null, onDone, onCancel, onCrumb }) {
  const personaDef = PERSONAS[0]; // import is admin work — biomed-lead scope
  const [step, setStep] = useState(['importing', 'success', 'error'].includes(state) ? 'preview' : state);
  // Up to three files (Raf, 2026-09-07) — labs rarely keep one register. Status
  // is 'done' (not 'complete'): that is the value the DS Upload renders its
  // remove control for.
  // The upload step starts empty; initialFileIds lets a deep link show the
  // step WITH files attached, which is the only way to illustrate the three
  // file chips and their remove controls (Raf, 2026-09-08).
  const [fileIds, setFileIds] = useState(() => (initialFileIds
    ? initialFileIds
    : state === 'upload' ? [] : IMPORT_FILES.map((f) => f.id)));
  const chosen = IMPORT_FILES.filter((f) => fileIds.includes(f.id));
  const files = chosen.map((f) => ({ id: f.id, name: f.name, size: f.size, progress: 100, status: 'done' }));
  const [facilityId, setFacilityId] = useState(state === 'upload' ? '' : 'nhrl');
  // How each file is laid out: 'auto' trusts the per-sheet detection, the other
  // two force every sheet in that file one way.
  const [layout, setLayout] = useState({});
  const [openSheet, setOpenSheet] = useState(null);

  // Every sheet of every chosen file, read for orientation and headers.
  const sheets = useMemo(() => chosen.flatMap((file) => file.sheets.map((sheet) => {
    const forced = layout[file.id] && layout[file.id] !== 'auto' ? layout[file.id] : null;
    const read = readSheet(sheet.grid);
    if (!forced || forced === read.orientation) {
      return { file, sheet, key: `${file.id}|${sheet.name}`, ...read, forced: false };
    }
    // Forced the other way: re-read the grid with the axes swapped.
    const swapped = (sheet.grid[0] || []).map((_, c) => sheet.grid.map((r) => r[c] ?? ''));
    const base = forced === 'rows' ? swapped : sheet.grid;
    return {
      file, sheet, key: `${file.id}|${sheet.name}`, forced: true,
      orientation: forced,
      headers: (base[0] || []).map((h) => String(h ?? '').trim()),
      rows: base.slice(1),
      confidence: read.confidence,
    };
  })), [fileIds.join(','), JSON.stringify(layout)]);

  // Auto-mapping for every header of every sheet, keyed per sheet so the same
  // header name in two sheets can map differently.
  const [mappingOverrides, setMappingOverrides] = useState({});
  const mappingFor = (sh) => ({ ...suggestMapping(sh.headers), ...(mappingOverrides[sh.key] || {}) });
  const [phase, setPhase] = useState(state === 'importing' ? 'importing' : state === 'success' ? 'success' : state === 'error' ? 'error' : 'idle');

  const parsed = useMemo(
    () => sheets.flatMap((sh) => {
      const map = mappingFor(sh);
      return sh.rows
        .filter((raw) => raw.some((c) => String(c ?? '').trim()))
        .map((raw) => mapRow(raw, sh.headers, map, facilityId, `${sh.file.name} › ${sh.sheet.name}`));
    }),
    [sheets, JSON.stringify(mappingOverrides), facilityId],
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
                  { label: 'Source files', value: chosen.map((f) => f.name).join(', ') || '—' },
                  { label: 'Sheets read', value: sheets.map((sh) => `${sh.sheet.name} (${sh.orientation})`).join(', ') || '—' },
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
          subtitle="Up to three spreadsheets per facility — every sheet is read."
          footerLeft={<Btn variant="secondary" onClick={() => setCancelOpen(true)}>Cancel</Btn>}
          footerRight={(
            <Btn variant="primary" disabled={!files.length || !facilityId} onClick={() => setStep('map')}>
              Continue to mapping
            </Btn>
          )}
        >
          {/* No section heading — the field carries its own label. */}
          <SearchSelect
            label="Facility"
            required
            placeholder="Which lab does this register belong to?"
            options={LAB_FACILITIES.filter((f) => personaDef.facilities.includes(f.id))}
            value={facilityId}
            onChange={(v) => setFacilityId(v && v.target ? v.target.value : v)}
          />
          <FormSection title="Register files" required>
            <Upload
              label="Register spreadsheets"
              helperText="Up to three files (XLSX or CSV), max 10 MB each."
              accept=".xlsx,.csv"
              multiple
              maxFiles={3}
              files={files}
              onAddFiles={() => setFileIds((ids) => {
                const next = IMPORT_FILES.find((f) => !ids.includes(f.id));
                return next && ids.length < 3 ? [...ids, next.id] : ids;
              })}
              onRemove={(id) => setFileIds((ids) => ids.filter((x) => x !== id))}
            />
            {/* Under each file: what the layout was read as, and the chance to
                say otherwise (Raf, 2026-09-07). Detection is per sheet, so the
                default stays "as detected" — forcing applies to every sheet in
                that file. */}
            {chosen.map((file, i) => {
              const fileSheets = sheets.filter((sh) => sh.file.id === file.id);
              const kinds = [...new Set(fileSheets.map((sh) => sh.orientation))];
              const detected = kinds.length > 1 ? 'mixed — per sheet' : kinds[0] || 'unknown';
              return (
                <div key={file.id} style={{ maxWidth: 320 }}>
                  <SelectInput
                    label={`Spreadsheet ${i + 1} · layout`}
                    options={[
                      { id: 'auto', label: `As detected · ${detected}` },
                      { id: 'columns', label: 'By columns' },
                      { id: 'rows', label: 'By rows' },
                    ]}
                    value={layout[file.id] || 'auto'}
                    onChange={(e) => setLayout((l) => ({ ...l, [file.id]: e.target ? e.target.value : e }))}
                    helpText={`${fileSheets.length} ${fileSheets.length === 1 ? 'sheet' : 'sheets'} · ${fileSheets.reduce((n, sh) => n + sh.headers.length, 0)} columns · ${fileSheets.reduce((n, sh) => n + sh.rows.length, 0)} records`}
                  />
                </div>
              );
            })}
          </FormSection>
        </StepFrame>
      )}

      {step === 'map' && (
        <StepFrame
          stepper={stepper}
          title="Map columns"
          subtitle="Their headers, our fields — matched automatically, one section per sheet."
          footerLeft={<Btn variant="secondary" onClick={() => setStep('upload')}>Back</Btn>}
          footerRight={<Btn variant="primary" onClick={() => setStep('preview')}>Preview import</Btn>}
        >
          {chosen.map((file, fi) => (
            <div key={file.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 650, color: TEXT_DEFAULT }}>
                  Spreadsheet {fi + 1} · {file.name}
                </span>
                <span style={{ fontSize: 12, color: TEXT_SUBDUED }}>
                  {file.sheets.length} {file.sheets.length === 1 ? 'sheet' : 'sheets'} in this file
                </span>
              </div>
              {sheets.filter((sh) => sh.file.id === file.id).map((sh, si) => {
                const map = mappingFor(sh);
                const unmatched = sh.headers.filter((h) => map[h] === '__skip').length;
                return (
                  <Accordion
                    key={sh.key}
                    open={openSheet === sh.key || (openSheet === null && fi === 0 && si === 0)}
                    onToggle={() => setOpenSheet(openSheet === sh.key ? '' : sh.key)}
                    title={`Sheet ${si + 1} · ${sh.sheet.name}`}
                    description={`${sh.orientation === 'rows' ? 'Rows layout' : 'Columns layout'}${sh.forced ? ' (you set this)' : ' (detected)'} · ${sh.headers.length} columns · ${sh.rows.length} records${unmatched ? ` · ${unmatched} not matched` : ' · all matched'}`}
                    hasContent={sh.headers.length > 0}
                  >
                    {sh.orientation === 'rows' && (
                      <Banner tone="info" inCard hideIcon>
                        <span style={{ display: 'block', fontWeight: 650 }}>This sheet is laid out sideways</span>
                        The field names run down the first column and each record is a column
                        across. It has been turned the right way round — {sh.headers.length} fields,
                        {' '}{sh.rows.length} records — so it maps like any other sheet.
                      </Banner>
                    )}
                    {sh.headers.map((h) => (
                      <div key={h} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) 2fr', gap: 16, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 550, color: TEXT_DEFAULT, overflowWrap: 'anywhere' }}>{h}</span>
                        <SelectInput
                          ariaLabel={`Map ${sh.sheet.name} column ${h}`}
                          options={IMPORT_FIELDS}
                          value={map[h] || '__skip'}
                          onChange={(e) => setMappingOverrides((mo) => ({
                            ...mo,
                            [sh.key]: { ...(mo[sh.key] || {}), [h]: e.target ? e.target.value : e },
                          }))}
                        />
                      </div>
                    ))}
                  </Accordion>
                );
              })}
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

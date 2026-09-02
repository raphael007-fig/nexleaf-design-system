import React, { useState } from 'react';
// FLOW — PD-38. Amendment flow and history, all seven states from Figma section
// "A · AMENDMENT FLOW: states (PD-38)" node 9248:51450.
//
// The two windows are independent (see PD-38 and docs/coldtrace-domain.md):
//   past entry  = 7 days, entering a reading for a day never recorded
//   amendment   = 3 days, changing a reading that already exists
// A reason IS required and the audit trail is additive: the original record is
// preserved and each change is saved as a new amendment.
import { AppShell, Page, Card, Banner, Toast, Btn, ButtonGroup, SlideOver, Divider, NumberInput, TextareaInput, SelectInput, Accordion, CardField, Badge } from '@ds';
import StateSwitcher from '../../screens/StateSwitcher.jsx';
import { RECORDING_DATE, EQUIPMENT, AMENDMENTS, AMENDMENT_DAYS } from '../../screens/fixtures.js';

const STATES = [
  { id: 'A1', title: 'Amend Morning: view recording (editable)' },
  { id: 'A2', title: 'Amend Evening: view recording (editable)' },
  { id: 'A3', title: 'Amend Morning: history / audit trail' },
  { id: 'A4', title: 'Amend Evening: history / audit trail' },
  { id: 'A6', title: 'Amendment: summary after change (revertable history)' },
  { id: 'A7', title: 'Amend Morning: window expired (read-only)' },
];

const CCE = EQUIPMENT[0];
const FORMS   = ['A1', 'A2', 'A7'];
const HISTORY = ['A3', 'A4'];
const SUMMARY = ['A6'];

const REASONS = [
  { label: 'Incorrect max temperature', value: 'max' },
  { label: 'Alarm duration corrected',  value: 'alarm' },
  { label: 'Wrong reading entered',     value: 'wrong' },
  { label: 'Transcription error',       value: 'transcription' },
];

function AmendmentHistory({ revertable, onRevert }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {AMENDMENTS.map((a, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#303030' }}>{a.label}:</span>
            {revertable && i < AMENDMENTS.length - 1 && (
              <Btn variant="ghost" size="small" onClick={() => onRevert && onRevert(a)}>Revert to this version</Btn>
            )}
          </div>
          <span style={{ fontSize: 12, color: '#616161' }}>{a.by} · {a.at}</span>
          {a.reason && <span style={{ fontSize: 12, color: '#616161' }}>Reason: {a.reason}</span>}
          {a.field  && <span style={{ fontSize: 12, color: '#616161' }}>Fields Changed: {a.field}</span>}
          {a.from   && <span style={{ fontSize: 12, color: '#616161' }}>Previous: {a.from}</span>}
          {a.to     && <span style={{ fontSize: 12, color: '#616161' }}>Updated: {a.to}</span>}
          {i < AMENDMENTS.length - 1 && <div style={{ marginTop: 12 }}><Divider /></div>}
        </div>
      ))}
    </div>
  );
}

export default function Amendment() {
  const [state, setState] = useState('A1');
  const [toast, setToast] = useState(null);
  const [reason, setReason] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true);

  const evening    = state === 'A2' || state === 'A4';
  const expired    = state === 'A7';
  const session    = evening ? 'Evening' : 'Morning';
  // Rollback exists (settled 27 Aug, PD-38). A revert is itself a change, so on an
  // additive trail it is recorded as a further amendment rather than erasing history.
  const revertable = state === 'A6';

  React.useEffect(() => { setDrawer(SUMMARY.includes(state)); }, [state]);

  // ── the editable amend form, and the expired read-only case ──────────────
  if (FORMS.includes(state)) {
    return (
      <>
        <StateSwitcher section="A · AMENDMENT FLOW" states={STATES} value={state} onChange={setState} />
        <AppShell level="secondary" contentWidth="full">
          <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Page
                title={'Amend ' + session + ' Temperature'}
                subtitle={'Update a previously submitted ' + session.toLowerCase()
                  + ' temperature record. All amendments are recorded in the audit history.'}
                backAction={{ onAction: () => setToast('Back to the recording summary.') }}
              />

              <Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Banner tone="info" inCard>
                    Equipment Make/Model: {CCE.make} {CCE.model}
                    <br />Serial Number: {CCE.serial}
                  </Banner>

                  <div style={{ width: 320, maxWidth: '100%' }}>
                    <SelectInput
                      label="Reason for Change" required placeholder="Choose"
                      options={REASONS} value={reason} onChange={setReason} disabled={expired}
                    />
                  </div>

                  {evening && (
                    <div style={{ width: 624, maxWidth: '100%' }}>
                      <Accordion title="Morning recorded at 11:30 by Jane Mwangi" open={accordionOpen}
                        onToggle={() => setAccordionOpen((o) => !o)} hasContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#303030' }}>
                          <div>Morning temperature (°C): 1 °C</div>
                          <div>Yesterday max / min (°C): 2 °C / 1 °C</div>
                          <div>High Temperature Alarm Triggered?: No</div>
                          <div>Low Temperature Alarm Triggered?: No</div>
                        </div>
                      </Accordion>
                    </div>
                  )}

                  <div style={{ width: 624, maxWidth: '100%' }}>
                    <NumberInput label={session + ' temperature (°C)'} required suffix="°C"
                      value="1" onChange={() => {}} disabled={expired} />
                  </div>

                  {evening && (
                    <div style={{ width: 320, maxWidth: '100%' }}>
                      <SelectInput label="Equipment Status" required
                        options={[{ label: 'Functional', value: 'functional' }, { label: 'Faulty', value: 'faulty' }]}
                        value="functional" onChange={() => {}} disabled={expired} />
                    </div>
                  )}

                  <div style={{ width: 624, maxWidth: '100%' }}>
                    <TextareaInput label="General Comments"
                      placeholder={'Describe why this ' + session.toLowerCase() + ' reading was corrected...'}
                      value="" onChange={() => {}} rows={4} disabled={expired} />
                  </div>

                  <Banner tone={expired ? 'critical' : 'info'} inCard>
                    {expired
                      ? 'The ' + AMENDMENT_DAYS + '-day amendment window for this record has closed. It is now read-only and stays in the audit history.'
                      : 'The original record will be preserved. Your changes will be saved as a new amendment.'}
                  </Banner>

                  <Divider />

                  <ButtonGroup>
                    <Btn variant="primary" disabled={expired || !reason}
                      onClick={() => setState(evening ? 'A4' : 'A3')}>
                      {'Save ' + session + ' Amendment'}
                    </Btn>
                    <Btn variant="secondary" onClick={() => setToast('Amendment cancelled.')}>Cancel</Btn>
                  </ButtonGroup>
                </div>
              </Card>
            </div>
          </div>

          <Toast tone={expired ? 'critical' : 'info'} onDismiss={() => setToast(null)}>
            {expired
              ? 'Saved more than ' + AMENDMENT_DAYS + ' days ago. This reading can no longer be amended.'
              : 'Saved 2 days ago. You can amend this reading for 1 more day.'}
          </Toast>
        </AppShell>
      </>
    );
  }

  // ── history / audit trail, and the post-amendment summary with the drawer ──
  return (
    <>
      <StateSwitcher section="A · AMENDMENT FLOW" states={STATES} value={state} onChange={setState} />
      <AppShell level="secondary" contentWidth="full">
        <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Page level actions live in the header, not at the card bottom.
                Raphael's correction on A4, 27 Aug. */}
            <Page
              title="Temperature Readings Summary"
              backAction={{ onAction: () => setToast('Back to the workspace.') }}
              primaryAction={{ content: 'Print Page', onAction: () => setToast('Print the record summary.') }}
            />

            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Banner tone="info" inCard>
                  Equipment Make/Model: {CCE.make} {CCE.model}
                  <br />Serial Number: {CCE.serial}
                  <br />Facility: Nyeri Health Center
                </Banner>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge tone="success">Complete</Badge>
                  <span style={{ fontSize: 13, color: '#616161' }}>Recording Date: {RECORDING_DATE}</span>
                </div>

                <Divider />

                <CardField label="Morning temperature (°C)" value="1 °C" />
                <CardField label="Recorded By" value={'Juma Mwangi | ' + RECORDING_DATE + ' | 10:35 AM'} />
                <CardField label="Amended By" value={'Justin Sylvia | ' + RECORDING_DATE + ' | 10:35 AM'}
                  linkHref="#" onLinkClick={() => setDrawer(true)} />

                <Divider />

                <CardField label="Evening Temperature Reading" value="1 °C" />
                <CardField label="Equipment Status" value="Functional" />
                <CardField label="Recorded By" value={'Amani Karanja | ' + RECORDING_DATE + ' | 05:41 PM'} />

                {HISTORY.includes(state) && (
                  <>
                    <Divider />
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#303030' }}>Amendment history</div>
                    <AmendmentHistory revertable={false} />
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* A6 is the single post-amendment summary. A5 was an identical duplicate
            and was deleted on 27 Aug once rollback was confirmed to exist. */}
        <SlideOver
          open={drawer}
          onClose={() => setDrawer(false)}
          title="Amendment history view"
          width={650}
        >
          <AmendmentHistory
            revertable={revertable}
            onRevert={(a) => setToast('Reverted to ' + a.label + '. Recorded as a new amendment; the trail is additive, so nothing is erased.')}
          />
        </SlideOver>

        {toast && <Toast tone="info" onDismiss={() => setToast(null)}>{toast}</Toast>}
      </AppShell>
    </>
  );
}

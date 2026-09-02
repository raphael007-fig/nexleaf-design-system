import React, { useState } from 'react';
// FLOW — PD-37. The recording form, all fifteen states from Figma section
// "R · RECORDING FORM: states (PD-37)" node 9247:48686.
//
// Shells follow the contracts Raphael settled on 27 Aug (recorded in
// FIGMA-MAP.md and on PD-37): form pages carry a page header above the card;
// entry pages put the heading inside a centred card; success pages are a
// confirmation card. Blocking states dim the whole viewport and disable the
// primary action.
import {
  AppShell, Page, Card, Banner, Toast, Btn, ButtonGroup, Modal, Overlay,
  NumberInput, TextareaInput, SelectInput, RadioGroup, Accordion, Divider,
  OptionCard, TextInput, PolarisIconImg, TemperatureSubmissionSuccessCard,
} from '@ds';
import StateSwitcher from '../../screens/StateSwitcher.jsx';
import { RECORDING_DATE, EQUIPMENT } from '../../screens/fixtures.js';

const STATES = [
  { id: 'R1',  title: 'Record: entry modal' },
  { id: 'R2',  title: 'Record Morning: empty form' },
  { id: 'R3',  title: 'Record Morning: filled' },
  { id: 'R4',  title: 'Record Morning: confirming' },
  { id: 'R5',  title: 'Record Morning: success' },
  { id: 'R6',  title: 'Record Evening: empty form' },
  { id: 'R7',  title: 'Record Evening: filled' },
  { id: 'R8',  title: 'Record Evening: confirm modal' },
  { id: 'R9',  title: 'Record Evening: processing' },
  { id: 'R10', title: 'Record Evening: success' },
  { id: 'R11', title: 'Edge: evening blocked, record morning first' },
  { id: 'R12', title: 'Edge: morning complete, evening pending' },
  { id: 'R13', title: 'Edge: alarm = yes, action taken' },
  { id: 'R14', title: 'Edge: alarm = yes, action detail' },
  { id: 'R15', title: 'Error: success with alarm raised' },
];

const CCE = EQUIPMENT[0];
const ENTRY   = ['R1', 'R11', 'R12'];
const SUCCESS = ['R10', 'R15'];
const BLOCKING = { R1: 'modal', R4: 'spinner', R8: 'modal', R9: 'spinner', R11: 'modal', R12: 'modal' };
const EVENING = ['R6', 'R7', 'R8', 'R9', 'R10'];
const FILLED  = ['R3', 'R4', 'R5', 'R7', 'R8', 'R9', 'R13', 'R14'];
const ALARM   = ['R13', 'R14', 'R15'];

export default function RecordingForm() {
  const [state, setState] = useState('R2');
  const [toast, setToast] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(true);

  const evening  = EVENING.includes(state);
  const filled   = FILLED.includes(state);
  const alarm    = ALARM.includes(state);
  const blocking = BLOCKING[state];
  const session  = evening ? 'Evening' : 'Morning';

  const v = (val) => (filled ? val : '');

  // ── entry pages: the card IS the page, heading centred inside it ──────────
  if (ENTRY.includes(state)) {
    const blockedBanner =
      state === 'R11' ? { tone: 'warning', body: 'Please record the morning temperature reading first.' }
    : state === 'R12' ? { tone: 'info',    body: 'Morning reading is complete. The evening reading is still pending.' }
    : null;

    return (
      <>
        <StateSwitcher section="R · RECORDING FORM" states={STATES} value={state} onChange={setState} />
        <AppShell level="secondary" contentWidth="full">
          <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
            <Card>
              <div style={{ padding: '32px 16px 48px', display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <PolarisIconImg name="ArrowLeftIcon" size={20} />
                    <span style={{ fontSize: 20, fontWeight: 600, color: '#303030' }}>Select an Option</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#616161', marginTop: 8 }}>
                    Scan QR Code or Enter Equipment Serial No.
                  </div>
                </div>
                <div style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 24, padding: '0 40px', boxSizing: 'border-box' }}>
                  <TextInput label="Enter Fridge ID" placeholder="fridge-001" value="" onChange={() => {}} />
                  <Btn variant="primary" onClick={() => setState(state === 'R11' ? 'R2' : 'R6')}>Continue</Btn>
                </div>
              </div>
            </Card>
          </div>

          {blockedBanner && (
            <Toast tone={blockedBanner.tone} onDismiss={() => setToast(null)}>{blockedBanner.body}</Toast>
          )}

          <Modal
            open
            onClose={() => setState('R2')}
            title="How would you like to proceed?"
            size="medium"
            footer={
              <ButtonGroup>
                <Btn variant="secondary" onClick={() => setState('R2')}>Cancel</Btn>
                <Btn variant="primary" disabled onClick={() => {}}>Continue</Btn>
              </ButtonGroup>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <OptionCard
                title="Morning Readings"
                description={state === 'R12' ? 'Completed' : 'Pending'}
                onSelect={() => setState('R2')}
              />
              <OptionCard
                title="Evening Readings"
                description="Pending"
                disabled={state === 'R11'}
                onSelect={() => setState(state === 'R11' ? 'R11' : 'R6')}
              />
            </div>
          </Modal>
        </AppShell>
      </>
    );
  }

  // ── success pages: a confirmation card, no page header ───────────────────
  if (SUCCESS.includes(state)) {
    return (
      <>
        <StateSwitcher section="R · RECORDING FORM" states={STATES} value={state} onChange={setState} />
        <AppShell level="secondary" contentWidth="full">
          <div style={{ padding: '0 16px 32px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 960, maxWidth: '100%', marginTop: 108 }}>
              <TemperatureSubmissionSuccessCard
                equipment={{ name: CCE.make + ' ' + CCE.model, serial: CCE.serial, facility: 'Nyeri Health Center' }}
                recordingDate={RECORDING_DATE}
                morning={{ temp: '1', prevMax: '2', prevMin: '3', alarms: state === 'R15', recordedBy: 'Juma Mwangi', recordedAt: RECORDING_DATE + ' | 10:35 AM' }}
                evening={{ temp: '1', equipmentStatus: 'Functional', recordedBy: 'Amani Karanja', recordedAt: RECORDING_DATE + ' | 05:41 PM' }}
                equipmentStatus="Functional"
                submittedOn={RECORDING_DATE + ' | 03:45 PM'}
                onPrimary={() => setState('R1')}
                onViewLogs={() => setToast('Opens the temperature log.')}
                onServiceRequest={() => setToast('Opens a service request.')}
                onHome={() => setToast('Back to the dashboard.')}
              />
            </div>
          </div>

          <Toast tone={state === 'R15' ? 'warning' : 'success'} onDismiss={() => setToast(null)}>
            {state === 'R15'
              ? 'Readings saved for ' + RECORDING_DATE + ', with an alarm raised. The cold chain needs attention.'
              : 'Both readings saved. ' + RECORDING_DATE + ' is complete.'}
          </Toast>
        </AppShell>
      </>
    );
  }

  // ── form pages ───────────────────────────────────────────────────────────
  const headerToast =
    state === 'R5' ? { tone: 'success', body: 'Morning reading saved for ' + RECORDING_DATE + '. Evening still to record.' }
  : { tone: 'info', body: session + ' reading for ' + RECORDING_DATE + '. The evening reading opens once this is saved.' };

  return (
    <>
      <StateSwitcher section="R · RECORDING FORM" states={STATES} value={state} onChange={setState} />

      <AppShell level="secondary" contentWidth="full">
        <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Page
              title={evening ? 'Record Evening Temperature' : 'Record Daily Temperature'}
              subtitle={'Record the ' + session.toLowerCase() + ' temperature reading for this equipment.'}
              backAction={{ onAction: () => setState('R1') }}
            />

            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Banner tone="info" inCard hideIcon={false}>
                  Equipment Make/Model: {CCE.make} {CCE.model}
                  <br />Serial Number: {CCE.serial}
                </Banner>

                {/* The temperature row is a fixed 624 column so the input lines
                    up with the Max/Min inputs in the accordion below. Raphael's
                    correction, 27 Aug. */}
                <div style={{ width: 624, maxWidth: '100%' }}>
                  <NumberInput
                    label={session + ' temperature (°C)'}
                    required
                    suffix="°C"
                    value={v('1')}
                    onChange={() => {}}
                  />
                </div>

                <div style={{ width: 624, maxWidth: '100%' }}>
                  <Accordion
                    title={evening ? 'Current Day Alarm' : 'Previous Day Temperature Recording'}
                    required
                    open={accordionOpen}
                    onToggle={() => setAccordionOpen((o) => !o)}
                    hasContent
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {!evening && (
                        <NumberInput label="Maximum temperature (°C)" suffix="°C" value={v('2')} onChange={() => {}} />
                      )}
                      <RadioGroup
                        title="High Temperature Alarm triggered?"
                        name="high"
                        value={filled ? (alarm ? 'yes' : 'no') : ''}
                        onChange={() => {}}
                        options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                      />
                      {alarm && <TextInput label="Duration of Alarm" placeholder="HH:MM" value="" onChange={() => {}} />}
                      {!evening && (
                        <NumberInput label="Minimum temperature (°C)" suffix="°C" value={v('1')} onChange={() => {}} />
                      )}
                      <RadioGroup
                        title="Low Temperature Alarm triggered?"
                        name="low"
                        value={filled ? (alarm ? 'yes' : 'no') : ''}
                        onChange={() => {}}
                        options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
                      />
                      {alarm && <TextInput label="Duration of Alarm" placeholder="HH:MM" value="" onChange={() => {}} />}
                    </div>
                  </Accordion>
                </div>

                {alarm && (
                  <div style={{ width: 624, maxWidth: '100%' }}>
                    <SelectInput
                      label="Action Taken"
                      required
                      placeholder="Choose"
                      options={[
                        { label: 'Vaccine Transferred', value: 'transferred' },
                        { label: 'Thermostat Adjusted', value: 'thermostat' },
                        { label: 'Service Requested',   value: 'service' },
                      ]}
                      value={state === 'R14' ? 'transferred' : ''}
                      onChange={() => {}}
                    />
                  </div>
                )}

                {evening && (
                  <div style={{ width: 624, maxWidth: '100%' }}>
                    <SelectInput
                      label="Equipment Status" required placeholder="Choose"
                      options={[{ label: 'Functional', value: 'functional' }, { label: 'Faulty', value: 'faulty' }]}
                      value={v('functional')} onChange={() => {}}
                    />
                  </div>
                )}

                <div style={{ width: 624, maxWidth: '100%' }}>
                  <TextareaInput label="General Comments" placeholder="Write here" value="" onChange={() => {}} rows={4} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#616161' }}>
                  <PolarisIconImg name="CalendarIcon" size={16} />
                  Date and Time are auto recorded upon form recording
                </div>

                <Divider />

                <ButtonGroup>
                  <Btn
                    variant="primary"
                    disabled={!filled || !!blocking}
                    loading={blocking === 'spinner'}
                    onClick={() => setState(evening ? 'R9' : 'R4')}
                  >
                    {'Record ' + session + ' Temperature'}
                  </Btn>
                  <Btn variant="secondary" disabled={!!blocking} onClick={() => setState('R1')}>Cancel</Btn>
                </ButtonGroup>
              </div>
            </Card>
          </div>
        </div>

        <Toast tone={headerToast.tone} onDismiss={() => setToast(null)}>{headerToast.body}</Toast>

        {/* Blocking states dim the whole viewport, chrome included. */}
        {blocking === 'spinner' && (
          <Overlay onClose={() => setState(evening ? 'R7' : 'R3')}>
            <Card>
              <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <Btn variant="ghost" loading disabled onClick={() => {}}>Saving</Btn>
                <span style={{ fontSize: 13, color: '#303030' }}>
                  {evening ? 'Confirming your submission' : 'Confirming your recording'}
                </span>
              </div>
            </Card>
          </Overlay>
        )}

        {state === 'R8' && (
          <Modal
            open
            onClose={() => setState('R7')}
            title="Confirm Form Completion"
            size="medium"
            footer={
              <ButtonGroup>
                <Btn variant="secondary" onClick={() => setState('R7')}>Cancel</Btn>
                <Btn variant="primary" onClick={() => setState('R9')}>Save</Btn>
              </ButtonGroup>
            }
          >
            Are you sure you want to submit this form? The reading will be saved against {RECORDING_DATE}.
          </Modal>
        )}
      </AppShell>
    </>
  );
}

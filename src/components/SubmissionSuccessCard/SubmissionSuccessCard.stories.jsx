import {
  SubmissionSuccessCard,
  TemperatureSubmissionSuccessCard,
  SAMPLE_SUBMISSION,
} from './SubmissionSuccessCard.jsx';

export default {
  title: 'Components/SubmissionSuccessCard',
  component: SubmissionSuccessCard,
  parameters: { layout: 'padded' },
};

const noop = () => {};
const frame = (children) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 8 }}>{children}</div>
);

// ── The generic layout ────────────────────────────────────────────────────────
// Any "your submission was recorded" flow composes it — here, a service
// request. Sections are plain data; the dot line can sit anywhere.
export const Generic = {
  name: 'Generic (service request)',
  render: () => frame(
    <SubmissionSuccessCard
      title="Service Request Submitted"
      sections={[
        { lines: [
          'Equipment Name: MK 114 Vaccine Refrigerator',
          'Serial Number: CCE-2024-MK114-002',
          'Facility: Pumwani Maternity Hospital',
        ]},
        { lines: [
          { label: 'Ticket', value: 'SR-2026-0142' },
          { label: 'Submitted', value: 'Jul 21, 2026 | 02:03 PM' },
          { dot: 'warning', text: 'Status: Awaiting Technician' },
        ]},
        { heading: 'Request:', lines: [
          { label: 'Category', value: 'Compressor fault' },
          { label: 'Priority', value: 'High' },
          { label: 'Reported by', value: 'Juma Mwangi' },
        ]},
      ]}
      footer={{ label: 'Next step', value: 'A technician will be assigned within 24 hours.' }}
      primaryAction={{ label: 'Track Request', onClick: noop }}
      secondaryActions={[{ label: 'Back to Equipment', onClick: noop }]}
      homeAction={{ onClick: noop }}
    />
  ),
};

// ── Flush on a host surface ───────────────────────────────────────────────────
// A flow that already owns a white card (e.g. Add Equipment) passes
// surface={false} so the confirmation sits directly on that background with no
// nested white-on-white card or shadow.
export const FlushOnHostSurface = {
  name: 'Flush (surface={false}) on a host card',
  render: () => (
    <div style={{ background: '#fff', borderRadius: 12, padding: 40, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <SubmissionSuccessCard
          surface={false}
          title="Equipment added successfully"
          homeAction={{ onClick: noop }}
          sections={[
            { lines: [
              { label: 'Equipment', value: 'Vestfrost MK 144 · CCE-30977-KLF' },
              { label: 'Monitoring', value: 'Unmonitored Equipment' },
              { label: 'QR code', value: 'QR-3307' },
              { label: 'Facility', value: 'Mombasa North Health Centre · Coast Region' },
            ]},
            { heading: 'Completion status', lines: [
              { dot: 'success', text: 'Equipment registered' },
              { dot: 'success', text: 'QR code assigned' },
              { dot: 'success', text: 'Ready for temperature recording' },
            ]},
          ]}
          footer={{ label: 'What’s next', value: 'This equipment is ready for manual temperature recording.' }}
          primaryAction={{ label: 'Record First Temperature', onClick: noop }}
          secondaryActions={[{ label: 'View Equipment', onClick: noop }]}
        />
      </div>
    </div>
  ),
};

// ── Cold-chain preset — the four temperature-recording states ────────────────

// Morning recorded, evening still pending — amber status dot, CTA continues
// the day ("Record Evening Temperature").
export const MorningRecorded = {
  render: () => frame(
    <TemperatureSubmissionSuccessCard
      equipment={SAMPLE_SUBMISSION.equipment}
      recordingDate={SAMPLE_SUBMISSION.recordingDate}
      morning={SAMPLE_SUBMISSION.morning}
      onPrimary={noop} onViewLogs={noop} onServiceRequest={noop} onHome={noop}
    />
  ),
};

// Both readings in — green status dot, CTA loops to the next fridge
// ("Record Another CCE"). The evening's equipment status carries the footer.
export const DailyRecordComplete = {
  render: () => frame(
    <TemperatureSubmissionSuccessCard
      equipment={SAMPLE_SUBMISSION.equipment}
      recordingDate={SAMPLE_SUBMISSION.recordingDate}
      morning={SAMPLE_SUBMISSION.morning}
      evening={SAMPLE_SUBMISSION.evening}
      onPrimary={noop} onViewLogs={noop} onServiceRequest={noop} onHome={noop}
    />
  ),
};

// Back-filled against a past recording date — orange status dot and an extra
// "Submitted On" line so the audit trail is visible at a glance.
export const PastEntryMorning = {
  render: () => frame(
    <TemperatureSubmissionSuccessCard
      equipment={SAMPLE_SUBMISSION.equipment}
      recordingDate="Jul 14, 2026"
      pastEntry submittedOn="Jul 21, 2026"
      morning={SAMPLE_SUBMISSION.morning}
      onPrimary={noop} onViewLogs={noop} onServiceRequest={noop} onHome={noop}
    />
  ),
};

export const PastEntryComplete = {
  render: () => frame(
    <TemperatureSubmissionSuccessCard
      equipment={SAMPLE_SUBMISSION.equipment}
      recordingDate="Jul 14, 2026"
      pastEntry submittedOn="Jul 21, 2026"
      morning={SAMPLE_SUBMISSION.morning}
      evening={SAMPLE_SUBMISSION.evening}
      onPrimary={noop} onViewLogs={noop} onServiceRequest={noop} onHome={noop}
    />
  ),
};

// A morning reading that tripped the high-temperature alarm — the panel grows
// Duration and Action Taken lines.
export const WithAlarm = {
  render: () => frame(
    <TemperatureSubmissionSuccessCard
      equipment={SAMPLE_SUBMISSION.equipment}
      recordingDate={SAMPLE_SUBMISSION.recordingDate}
      morning={{
        ...SAMPLE_SUBMISSION.morning,
        alarms: true, alarmDuration: '00:20', alarmActions: 'Vaccine Transferred',
      }}
      onPrimary={noop} onViewLogs={noop} onServiceRequest={noop} onHome={noop}
    />
  ),
};

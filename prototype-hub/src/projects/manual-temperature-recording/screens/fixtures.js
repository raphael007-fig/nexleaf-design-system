// SHARED FIXTURE for the Manual Temperature Recording module.
// One source of sample data for every flow and screen in this project.
// Inconsistent sample data across a flow is itself a defect (see the "10 Pending"
// vs "13 Pending" disagreement logged on PD-36), so nothing here is re-declared
// locally: import from this file instead.
//
// 10 CCEs across 4 facilities, matching the Figma v2 fixture (section 9175:34937).

export const RECORDING_DATE = 'Thu, Aug 27, 2026';
export const PAST_ENTRY_DATE = 'Sat, Aug 1, 2026';

// Windows. Recorded in docs/coldtrace-domain.md; these are two independent
// windows, not two versions of one rule (see PD-38).
export const PAST_ENTRY_DAYS = 7;   // entering a reading for a day never recorded
export const AMENDMENT_DAYS = 3;    // changing a reading that already exists

export const EQUIPMENT = [
  { id: 1,  facility: 'Nairobi',  make: 'Vestfrost',       model: 'VLS 400A Greenline', serial: 'CCE-2024-NAI-100', type: 'Cold Room' },
  { id: 2,  facility: 'Nairobi',  make: 'B Medical',       model: 'TCW 40 SDD',         serial: 'CCE-2024-NAI-103', type: 'Vaccine Carrier' },
  { id: 3,  facility: 'Nairobi',  make: 'Dometic',         model: 'TCW 4000 AC',        serial: 'CCE-2024-NAI-104', type: 'Refrigerator' },
  { id: 4,  facility: 'Mombasa',  make: 'B Medical',       model: 'TCW 40 SDD',         serial: 'CCE-2024-MOM-109', type: 'Vaccine Carrier' },
  { id: 5,  facility: 'Mombasa',  make: 'Haier',           model: 'HBC-130',            serial: 'CCE-2024-MOM-101', type: 'Freezer' },
  { id: 6,  facility: 'Mombasa',  make: 'Zero Appliances', model: 'ZLF 30',             serial: 'CCE-2024-MOM-105', type: 'Freezer' },
  { id: 7,  facility: 'Kisumu',   make: 'Vestfrost',       model: 'VLS 400A Greenline', serial: 'CCE-2024-KIS-106', type: 'Cold Room' },
  { id: 8,  facility: 'Kisumu',   make: 'Aucma',           model: 'BC/BD-100',          serial: 'CCE-2024-KIS-102', type: 'Refrigerator' },
  { id: 9,  facility: 'Nyeri',    make: 'Aucma',           model: 'BC/BD-100',          serial: 'CCE-2024-NYE-108', type: 'Refrigerator' },
  { id: 10, facility: 'Nyeri',    make: 'Haier',           model: 'HBC-130',            serial: 'CCE-2024-NYE-107', type: 'Freezer' },
];

// Recording status per CCE. `mixed` is the realistic mid-day case that W1i proves:
// some complete, some morning-only, some untouched.
const STATUS = {
  pending:  { morning: false, evening: false, status: 'Pending',      tone: 'attention' },
  morning:  { morning: true,  evening: false, status: 'Morning Only', tone: 'info' },
  complete: { morning: true,  evening: true,  status: 'Complete',     tone: 'success' },
  amended:  { morning: true,  evening: true,  status: 'Amended',      tone: 'warning' },
};

export function readings(mode = 'mixed') {
  const pattern = {
    pending:  () => 'pending',
    complete: () => 'complete',
    mixed:    (i) => ['complete', 'complete', 'morning', 'pending', 'complete', 'morning', 'pending', 'complete', 'amended', 'pending'][i],
  }[mode] || (() => 'pending');

  return EQUIPMENT.map((e, i) => {
    const s = STATUS[pattern(i)] || STATUS.pending;
    return {
      ...e,
      morningDone: s.morning,
      eveningDone: s.evening,
      status: s.status,
      statusTone: s.tone,
      morningTemp: s.morning ? (2 + (i % 4) * 0.4).toFixed(1) : '-',
      eveningTemp: s.evening ? (3 + (i % 3) * 0.5).toFixed(1) : '-',
    };
  });
}

// The dashboard card and its drawer read from one list so their counts agree.
export const TASKS = {
  morning: readings('mixed').filter((r) => !r.morningDone)
    .map((r) => ({ id: 'm' + r.id, name: r.make + ' ' + r.model, facility: r.facility, session: 'Morning' })),
  evening: readings('mixed').filter((r) => r.morningDone && !r.eveningDone)
    .map((r) => ({ id: 'e' + r.id, name: r.make + ' ' + r.model, facility: r.facility, session: 'Evening' })),
  completed: [],
};

export const AMENDMENTS = [
  { by: 'Raphael Okojie', at: 'Oct 27, 2025 · 08:04 AM', label: 'Original submission', reason: null, field: null, from: null, to: null },
  { by: 'Moses Mwangi',   at: 'Oct 27, 2025 · 11:20 AM', label: 'Amendment 1',        reason: 'Incorrect max temperature', field: 'Previous Day Maximum', from: '6°C',   to: '4°C' },
  { by: 'Susan Mwangi',   at: 'Oct 28, 2025 · 09:05 AM', label: 'Amendment 2 (Current)', reason: 'Alarm duration corrected', field: 'Previous Day Maximum', from: '00:20', to: '00:30' },
];

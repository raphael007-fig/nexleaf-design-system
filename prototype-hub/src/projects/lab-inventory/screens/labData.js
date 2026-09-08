// ── Kenya NPHL Lab MVP — shared reference data (prototype backend) ─────────────
// One source for every screen in this project, so the register, the add form,
// the import preview, and the cold-room flow all agree on facilities, types,
// conditions and rows. Grounded in the Sep 2 2026 brief:
//   • Hierarchy: Kenya Lab (global group, never selectable) → NPHL (region) →
//     labs = facilities. Region is ALWAYS derived from facility (never asked).
//   • D1 (A): the walk-in cold room is a central NPHL asset under a dedicated
//     "Central Cold Store" facility.
//   • D6 (A): the 4 known labs + Calibration Centre now; the remaining labs
//     drop into this config list without a rebuild.
//   • Condition vocabulary is the LAB's own 5-value set (Raf, 2026-09-07):
//     Functional · Faulty · Decommissioned · Unknown. It replaces
//     the Passive Equipment 4-value set the first draft borrowed. "Not set" is
//     the display for null — distinct from "Unknown", which is a real answer
//     meaning nobody has verified this equipment yet.

// ── Facilities (NPHL region) ──────────────────────────────────────────────────
export const NPHL_REGION = { id: 'nphl', label: 'National Public Health Lab' };

export const LAB_FACILITIES = [
  { id: 'nhrl',   label: 'HIV Reference Lab (NHRL)' },
  { id: 'nmarl',  label: 'Malaria Reference Lab (NMARL)' },
  { id: 'nobrl',  label: 'Oncology / Biosafety Reference Lab (NOBRL)' },
  { id: 'nfsnrl', label: 'Food Safety & Nutrition Reference Lab (NFSNRL)' },
  { id: 'calib',  label: 'Calibration Centre' },
  // D1 (A): the shared walk-in cold room lives here, not inside a unit lab.
  { id: 'ccs',    label: 'Central Cold Store' },
];

export const facilityLabel = (id) =>
  LAB_FACILITIES.find((f) => f.id === id)?.label ?? '—';

// ── LabEquipmentType — the managed list (D3: seeded, extensible, NOT PQS) ─────
// `monitoring` is the monitored/not-monitored switch the Type field carries:
//   'v1'    → monitorable now (walk-in cold room only)
//   'later' → monitorable in a later phase (fridge/freezer)
//   'none'  → never monitored
export const LAB_TYPES = [
  { id: 'walk-in-cold-room', label: 'Walk-in Cold Room',              monitoring: 'v1' },
  { id: 'fridge-freezer',    label: 'Fridge / Freezer',               monitoring: 'later' },
  { id: 'ultra-cold',        label: 'Ultra-cold freezer (−40/−86 °C)', monitoring: 'none' },
  { id: 'microscope',        label: 'Microscope',                     monitoring: 'none' },
  { id: 'centrifuge',        label: 'Centrifuge',                     monitoring: 'none' },
  { id: 'analyser',          label: 'Analyser',                       monitoring: 'none' },
  { id: 'incubator',         label: 'Incubator',                      monitoring: 'none' },
  { id: 'biosafety-cabinet', label: 'Biosafety cabinet',              monitoring: 'none' },
  { id: 'balance',           label: 'Balance',                        monitoring: 'none' },
  { id: 'pipette',           label: 'Pipette',                        monitoring: 'none' },
  { id: 'ph-meter',          label: 'PH meter',                       monitoring: 'none' },
  { id: 'thermo-timer',      label: 'Thermometer / Timer',            monitoring: 'none' },
  { id: 'water-bath',        label: 'Water bath',                     monitoring: 'none' },
  { id: 'it-facility',       label: 'Computer / Printer / UPS',       monitoring: 'none' },
  // Last in the list on purpose: a visible escape hatch for anyone who does not
  // think to type. Selecting it asks what the equipment actually is. Never
  // monitorable — nothing is configured for a type nobody has defined.
  { id: 'other',             label: 'Other',                          monitoring: 'none' },
];

export const typeById = (id) => LAB_TYPES.find((t) => t.id === id) || null;
export const typeLabel = (id) => typeById(id)?.label ?? '—';
export const isMonitorableNow = (id) => typeById(id)?.monitoring === 'v1';
export const isMonitorableLater = (id) => typeById(id)?.monitoring === 'later';

// ── Make / model — a seeded, extensible managed list (same pattern as D3) ─────
// Labs re-buy from the same handful of manufacturers, so typing the make by
// hand produced the spelling drift we see in the paper registers ("Eppendorf",
// "eppendorf", "Eppendorf AG"). These lists are what NPHL's own inventory
// already contains, so a user PICKS in the common case. They are NOT PQS — lab
// kit is not in the PQS catalogue — and both fields stay creatable, because a
// lab will always own something the list has never seen.
export const LAB_MAKES = [
  'Agilent', 'Bio-Rad', 'BioTek', 'Dell / APC', 'Eppendorf', 'Eppendorf New Brunswick',
  'Esco', 'Fluke', 'Foster Refrigerator', 'Grant Instruments', 'Haier Biomedical',
  'Hanna Instruments', 'Hettich', 'Labconco', 'Lasany', 'Memmert', 'Mettler Toledo',
  'Olympus', 'Panasonic Biomedical', 'Roche', 'Sartorius', 'Scientific Industries',
  'Shimadzu', 'Thermo Forma', 'Tuttnauer',
];

// Models the NPHL inventory already holds, by make. A make with no entry simply
// offers no suggestions — the field still accepts a typed model.
export const LAB_MODELS = {
  'Agilent': ['8890 GC / 5977C MS', '1260 Infinity II'],
  'BioTek': ['50 TS', 'ELx50'],
  'Dell / APC': ['OptiPlex 7010 / BX950'],
  'Eppendorf': ['5810 R', '5702 R', 'Research plus', 'ThermoMixer C'],
  'Eppendorf New Brunswick': ['Innova U535', 'Innova U725'],
  'Esco': ['Airstream AC2-4S8'],
  'Fluke': ['1523', '1524'],
  'Foster Refrigerator': ['PROB1100H'],
  'Grant Instruments': ['JB Nova 12'],
  'Haier Biomedical': ['HYC-390', 'HYC-509', 'DW-86L388J'],
  'Hanna Instruments': ['HI2211'],
  'Hettich': ['EBA 200', 'ROTINA 380'],
  'Labconco': ['Purifier Logic+'],
  'Lasany': ['LPD-102'],
  'Memmert': ['IN55', 'UF55'],
  'Mettler Toledo': ['ME204', 'ME103'],
  'Olympus': ['CX23', 'CX43'],
  'Panasonic Biomedical': ['MDF-DU502VH'],
  'Roche': ['cobas 6800', 'cobas 4800'],
  'Sartorius': ['Entris II', 'Quintix'],
  'Scientific Industries': ['Vortex-Genie 2'],
  'Shimadzu': ['Nexera LC-40 (LC-40D XR, SIL-40C XR, CTO-40C, SPD-M40)'],
  'Thermo Forma': ['8600 Series', '3111'],
  'Tuttnauer': ['2540', '3870 EA'],
};

// Options for the Make picker, and for the Model picker once a make is chosen.
export const makeOptions = () => LAB_MAKES.map((m) => ({ id: m, label: m }));
export const modelOptions = (make) => {
  const list = LAB_MODELS[make];
  if (list) return list.map((m) => ({ id: m, label: m }));
  // No make chosen yet (or an unlisted one): offer every model we know.
  return Object.values(LAB_MODELS).flat().sort().map((m) => ({ id: m, label: m }));
};

// ── Condition — the lab's own 5-value vocabulary (Raf, 2026-09-07) ────────────
// Severity ladder the tones follow: Functional (green) → Unknown (amber, needs
// verifying) → Faulty (red, needs repair) → Decommissioned (grey, the
// deliberate end state).
// CCE's deployment vocabulary, all three values. "Not in use" was dropped after
// the Sep 2026 meeting on the grounds that it duplicated Decommissioned, and
// REINSTATED by Raf on 2026-09-08: a working, installed instrument that nobody
// is currently running is not decommissioned, and the register has to be able
// to say so. Equipment status still answers whether it WORKS; this answers
// whether it is being USED.
export const DEPLOYMENT_STATUS = ['Installed', 'Deployed', 'Not in use'];

export const CONDITIONS = [
  'Functional',
  'Faulty',
  'Decommissioned',
  'Unknown',
];
export const CONDITION_TONES = {
  'Functional': 'success',
  'Faulty': 'critical',
  'Unknown': 'warning',
  'Decommissioned': 'default',
  'Not set': 'default',
};

// ── Register rows — realistic seed grounded in the parsed inventories (§2) ────
// Asset tags follow each lab's OWN scheme (the real identifier); serial is
// often missing — deliberately null on several rows. One row — the walk-in
// cold room — is monitored, with N sensors on the ONE record (D2, intended
// model).
export const LAB_EQUIPMENT = [
  {
    id: 'ccs-wicr-001', facilityId: 'ccs',
    assetTag: 'MOH/DLS/NPHL/CCS/WICR-001',
    type: 'walk-in-cold-room', name: 'Walk-in Cold Room (reagent store)',
    make: 'Foster Refrigerator', model: 'PROB1100H',
    serial: 'FR-PROB-2019-4471', qrCode: 'QR-70021',
    location: 'Central cold store, Block C',
    condition: 'Functional', acquired: '2019-11-02',
    monitored: true,
    device: {
      baseStation: 'ColdTrace 5 · IMEI 356938035643809',
      kind: 'CT5',
      // Per-sensor CONFIGURATION, not readings. `cce` is the cold-chain-equipment
      // role (in-room sensors count toward in-range; the ambient one never does),
      // and alarms/delays are INHERITED from the Walk-in Cold Room region
      // configuration (D5) — they are shown so a biomed can see what a sensor is
      // actually enforcing, and overridden per sensor only deliberately.
      sensors: [
        { id: 'sensor-a', label: 'Sensor A', placement: 'Front-left, mid-height', cce: 'In-room', alarms: '2 °C / 8 °C (Low / High)', delays: '1 hr / 10 hrs (Low / High)', config: 'Walk-in Cold Room configuration' },
        { id: 'sensor-b', label: 'Sensor B', placement: 'Rear-right, mid-height', cce: 'In-room', alarms: '2 °C / 8 °C (Low / High)', delays: '1 hr / 10 hrs (Low / High)', config: 'Walk-in Cold Room configuration' },
        { id: 'sensor-c', label: 'Sensor C', placement: 'Centre, near door', cce: 'In-room', alarms: '2 °C / 8 °C (Low / High)', delays: '1 hr / 10 hrs (Low / High)', config: 'Walk-in Cold Room configuration' },
        { id: 'sensor-d', label: 'Sensor D (ambient)', placement: 'Outside, ante-room', cce: 'Ambient', alarms: 'None — ambient is not alarmed', delays: '—', config: 'Excluded from in-range maths' },
      ],
    },
    notes: 'Shared NPHL asset — serves all reference labs. Thresholds follow the Walk-in Cold Room configuration (2–8 °C).',
  },
  {
    id: 'nhrl-022', facilityId: 'nhrl', assetTag: 'NHRL/EQP/022',
    type: 'ultra-cold', name: 'Ultra-low freezer −86 °C',
    make: 'Eppendorf New Brunswick', model: 'Innova U535',
    serial: 'U535-8842-KE', location: 'Molecular lab, Room 12',
    condition: 'Functional', acquired: '2021-03-15', monitored: false,
  },
  {
    id: 'nhrl-031', facilityId: 'nhrl', assetTag: 'NHRL/EQP/031',
    type: 'ultra-cold', name: 'Upright freezer −40 °C',
    make: 'Thermo Forma', model: '8600 Series',
    serial: null, location: 'Molecular lab, Room 12',
    condition: 'Functional', acquired: '2018-07-01', monitored: false,
  },
  {
    id: 'nhrl-044', facilityId: 'nhrl', assetTag: 'NHRL/EQP/044',
    type: 'analyser', name: 'Viral load analyser',
    make: 'Roche', model: 'cobas 6800',
    serial: 'C6800-2020-118', location: 'Molecular lab, Room 14',
    condition: 'Functional', acquired: '2020-01-20', monitored: false,
  },
  {
    id: 'nhrl-058', facilityId: 'nhrl', assetTag: 'NHRL/EQP/058',
    type: 'fridge-freezer', name: 'Reagent refrigerator',
    make: 'Haier Biomedical', model: 'HYC-390',
    serial: 'HYC390-7723', location: 'Serology, Room 8',
    previousCondition: 'Functional', conditionChangedAt: '2026-07-19',
    condition: 'Faulty', acquired: '2017-05-11', monitored: false,
  },
  {
    id: 'nhrl-061', facilityId: 'nhrl', assetTag: 'NHRL/EQP/061',
    type: 'centrifuge', name: 'Refrigerated centrifuge',
    make: 'Eppendorf', model: '5810 R',
    serial: '5810R-3391', location: 'Sample prep, Room 6',
    condition: 'Functional', acquired: '2022-09-30', monitored: false,
  },
  {
    id: 'nhrl-070', facilityId: 'nhrl', assetTag: 'NHRL/EQP/070',
    type: 'biosafety-cabinet', name: 'Biosafety cabinet Class II',
    make: 'Esco', model: 'Airstream AC2-4S8',
    serial: null, location: 'Molecular lab, Room 12',
    condition: 'Functional', acquired: '2019-02-14', monitored: false,
  },
  {
    id: 'nmarl-mic-002', facilityId: 'nmarl', assetTag: 'NMARL/TR/MIC/002',
    type: 'microscope', name: 'Binocular microscope',
    make: 'Olympus', model: 'CX23',
    serial: 'CX23-51120', location: 'Microscopy bench 2',
    condition: 'Functional', acquired: '2023-04-05', monitored: false,
  },
  {
    id: 'nmarl-mic-006', facilityId: 'nmarl', assetTag: 'NMARL/TR/MIC/006',
    type: 'microscope', name: 'Teaching microscope',
    make: 'Olympus', model: 'CX43',
    serial: null, location: 'Training room',
    condition: 'Faulty', acquired: '2014-08-22', monitored: false,
  },
  {
    id: 'nmarl-inc-001', facilityId: 'nmarl', assetTag: 'NMARL/TR/INC/001',
    type: 'incubator', name: 'Culture incubator',
    make: 'Memmert', model: 'IN55',
    serial: 'IN55-0921', location: 'Culture room',
    condition: 'Functional', acquired: '2020-10-01', monitored: false,
  },
  {
    id: 'nobrl-e-001', facilityId: 'nobrl', assetTag: 'MOH/DLS/NPHL/NOBRL/E-001',
    type: 'biosafety-cabinet', name: 'Biosafety cabinet Class II',
    make: 'Labconco', model: 'Purifier Logic+',
    serial: 'PL-2216-887', location: 'Biosafety suite',
    condition: 'Functional', acquired: '2021-06-18', monitored: false,
  },
  {
    id: 'nobrl-e-014', facilityId: 'nobrl', assetTag: 'MOH/DLS/NPHL/NOBRL/E-014',
    type: 'centrifuge', name: 'Benchtop centrifuge',
    make: 'Hettich', model: 'EBA 200',
    serial: null, location: 'Histology, Room 3',
    condition: 'Faulty', acquired: '2016-12-09', monitored: false,
  },
  {
    id: 'nobrl-e-020', facilityId: 'nobrl', assetTag: 'MOH/DLS/NPHL/NOBRL/E-020',
    type: 'water-bath', name: 'Water bath',
    make: 'Grant Instruments', model: 'JB Nova 12',
    serial: 'JBN12-4402', location: 'Histology, Room 3',
    condition: 'Functional', acquired: '2022-02-27', monitored: false,
  },
  {
    id: 'nfsnrl-77', facilityId: 'nfsnrl', assetTag: 'S/NO 77',
    type: 'analyser', name: 'Gas chromatograph–mass spectrometer',
    make: 'Agilent', model: '8890 GC / 5977C MS',
    serial: 'AG8890-2021-05', location: 'Chemistry lab, Bay 1',
    condition: 'Functional', acquired: '2021-11-30', monitored: false,
  },
  {
    id: 'nfsnrl-81', facilityId: 'nfsnrl', assetTag: 'S/NO 81',
    type: 'balance', name: 'Analytical balance',
    make: 'Mettler Toledo', model: 'ME204',
    serial: null, location: 'Weighing room',
    condition: 'Functional', acquired: '2019-09-12', monitored: false,
  },
  {
    id: 'nfsnrl-85', facilityId: 'nfsnrl', assetTag: 'S/NO 85',
    type: 'ph-meter', name: 'Benchtop pH meter',
    make: 'Hanna Instruments', model: 'HI2211',
    serial: 'HI2211-6710', location: 'Chemistry lab, Bay 2',
    condition: 'Functional', acquired: '2020-05-19', monitored: false,
  },
  {
    // Edge-case row (deliberate): longest asset tag + name + location in the
    // register, so truncation/wrapping is exercised by real data, not lorem.
    id: 'nfsnrl-93', facilityId: 'nfsnrl',
    assetTag: 'MOH/DLS/NPHL/NFSNRL/CHEM/BAY2/EQP-2021-0093-A',
    type: 'analyser',
    name: 'High-performance liquid chromatography system with autosampler, column oven and diode-array detector',
    make: 'Shimadzu', model: 'Nexera LC-40 (LC-40D XR, SIL-40C XR, CTO-40C, SPD-M40)',
    serial: null,
    location: 'Chemistry lab, Bay 2, bench 4 (shared with microbiology overflow)',
    condition: 'Functional', acquired: '2021-04-14', monitored: false,
  },
  {
    id: 'nfsnrl-90', facilityId: 'nfsnrl', assetTag: 'S/NO 90',
    type: 'it-facility', name: 'Results workstation + UPS',
    make: 'Dell / APC', model: 'OptiPlex 7010 / BX950',
    serial: null, location: 'Data office',
    condition: 'Decommissioned', acquired: '2013-01-25', monitored: false,
  },
  {
    id: 'calib-014', facilityId: 'calib', assetTag: 'CAL/EQP/014',
    type: 'thermo-timer', name: 'Reference thermometer set',
    make: 'Fluke', model: '1523',
    serial: 'FL1523-30017', location: 'Calibration bench A',
    condition: 'Functional', acquired: '2022-06-08', monitored: false,
  },
  {
    id: 'calib-021', facilityId: 'calib', assetTag: 'CAL/EQP/021',
    type: 'pipette', name: 'Single-channel pipette set (10–1000 µL)',
    make: 'Eppendorf', model: 'Research plus',
    serial: null, location: 'Calibration bench B',
    condition: 'Functional', acquired: '2023-08-16', monitored: false,
  },
  {
    id: 'calib-030', facilityId: 'calib', assetTag: 'CAL/EQP/030',
    type: 'balance', name: 'Calibration weights + balance',
    make: 'Sartorius', model: 'Entris II',
    serial: 'SR-ENT-1189', location: 'Calibration bench A',
    condition: 'Faulty', acquired: '2018-03-03', monitored: false,
  },

  // ── Added 2026-09-07 (Raf): the register needs every equipment status and
  // both monitoring states represented, or the KPI cards and tabs can't be
  // judged. Monitoring stays type-led — walk-in cold rooms are the only v1
  // monitorable type (D5), so the second monitored record is another cold room
  // rather than an invented exception.
  {
    id: 'nfsnrl-wicr-002', facilityId: 'nfsnrl',
    assetTag: 'MOH/DLS/NPHL/NFSNRL/WICR-002',
    type: 'walk-in-cold-room', name: 'Walk-in Cold Room (sample archive)',
    make: 'Porkka', model: 'C1200',
    serial: 'PK-C1200-2021-8830', qrCode: 'QR-70044',
    location: 'Sample archive, Block D',
    previousCondition: 'Faulty', conditionChangedAt: '2026-09-04',
    condition: 'Functional', acquired: '2021-05-14',
    monitored: true,
    device: {
      baseStation: 'ColdTrace X · IMEI 356938035644127',
      kind: 'CTX',
      sensors: [
        { id: 'sensor-a', label: 'CTX-88301', placement: 'Front-left, mid-height', cce: 'In-room', alarms: '2 °C / 8 °C (Low / High)', delays: '1 hr / 10 hrs (Low / High)', config: 'Walk-in Cold Room configuration' },
        { id: 'sensor-b', label: 'CTX-88302', placement: 'Rear-right, mid-height', cce: 'In-room', alarms: '2 °C / 8 °C (Low / High)', delays: '1 hr / 10 hrs (Low / High)', config: 'Walk-in Cold Room configuration' },
        { id: 'sensor-c', label: 'CTX-88303', placement: 'Ambient, outside door', cce: 'Ambient', alarms: 'Not applicable', delays: 'Not applicable', config: 'Walk-in Cold Room configuration' },
      ],
    },
  },
  // Unknown — imported from a paper register and never verified. The honest
  // default, and the reason the status exists at all.
  {
    id: 'nhrl-112', facilityId: 'nhrl', assetTag: 'NHRL/EQP/112',
    type: 'analyser', name: 'Chemistry analyser',
    make: 'Roche', model: 'cobas c 311',
    serial: 'RC311-4417', location: 'Chemistry, Room 15',
    condition: 'Unknown', acquired: '2017-02-20', monitored: false,
    notes: 'Imported from the 2024 paper register — nobody has verified it since.',
  },
  {
    id: 'nmarl-118', facilityId: 'nmarl', assetTag: 'NMARL/TR/CEN/004',
    type: 'centrifuge', name: 'Haematocrit centrifuge',
    make: 'Hettich', model: 'Haematokrit 200',
    serial: null, location: 'Sample prep, Room 2',
    condition: 'Unknown', acquired: null, monitored: false,
    notes: 'No purchase date on the sheet; status never confirmed.',
  },
  {
    id: 'nobrl-124', facilityId: 'nobrl', assetTag: 'NOBRL/EQP/124',
    type: 'water-bath', name: 'Shaking water bath',
    make: 'Grant Instruments', model: 'OLS26',
    serial: 'GR-OLS-7741', location: 'Cell culture, Room 4',
    previousCondition: 'Faulty', conditionChangedAt: '2026-09-06',
    condition: 'Unknown', acquired: '2019-09-30', monitored: false,
  },
  // Faulty — waiting on a repair.
  {
    id: 'nfsnrl-131', facilityId: 'nfsnrl', assetTag: 'NFSNRL/EQP/131',
    type: 'incubator', name: 'CO2 incubator',
    make: 'Thermo Scientific', model: 'Heracell 150i',
    serial: 'TS-HC150-2210', location: 'Culture room 1',
    previousCondition: 'Functional', conditionChangedAt: '2026-08-04',
    condition: 'Faulty', acquired: '2018-11-12', monitored: false,
    notes: 'CO2 sensor drifting — vendor quote requested.',
  },
  {
    id: 'nhrl-137', facilityId: 'nhrl', assetTag: 'NHRL/EQP/137',
    type: 'ph-meter', name: 'Benchtop pH meter',
    make: 'Mettler Toledo', model: 'SevenCompact S220',
    serial: 'MT-S220-9903', location: 'Media room',
    condition: 'Faulty', acquired: '2020-07-07', monitored: false,
  },
  // Decommissioned — retired, kept for audit, excluded from active counts.
  {
    id: 'nmarl-142', facilityId: 'nmarl', assetTag: 'NMARL/TR/MIC/012',
    type: 'microscope', name: 'Monocular microscope (retired)',
    make: 'Olympus', model: 'CX21',
    serial: 'OL-CX21-1180', location: 'Store, Room 9',
    previousCondition: 'Faulty', conditionChangedAt: '2026-06-28',
    condition: 'Decommissioned', acquired: '2009-04-01', monitored: false,
    notes: 'Retired 2025 — replaced by the CX23 pair. Kept for audit.',
  },
  {
    id: 'calib-148', facilityId: 'calib', assetTag: 'CAL/EQP/048',
    type: 'balance', name: 'Analytical balance (retired)',
    make: 'Sartorius', model: 'BP211D',
    serial: 'SR-BP211-0442', location: 'Calibration store',
    condition: 'Decommissioned', acquired: '2008-10-19', monitored: false,
  },
  // Functional, monitorable LATER — a fridge/freezer stays in the register
  // unmonitored until phase 2 lands.
  {
    id: 'nobrl-155', facilityId: 'nobrl', assetTag: 'NOBRL/EQP/155',
    type: 'fridge-freezer', name: 'Vaccine refrigerator',
    make: 'Haier Biomedical', model: 'HYC-509',
    serial: 'HB-509-3318', location: 'Serology, Room 8',
    condition: 'Functional', acquired: '2023-01-25', monitored: false,
  },
  {
    id: 'nfsnrl-161', facilityId: 'nfsnrl', assetTag: 'NFSNRL/EQP/161',
    type: 'fridge-freezer', name: 'Reagent freezer −20 °C',
    make: 'Liebherr', model: 'LGex 3410',
    serial: 'LB-3410-6612', location: 'Reagent store, Block D',
    condition: 'Functional', acquired: '2022-03-11', monitored: false,
  },
];
// ── Volume for judging the table and the KPI row ──────────────────────────────
// Raf, 2026-09-07: "let it be like 54 records and with about 35% of it being
// monitored". Written as compact tuples and expanded, so 23 more records don't
// bury the hand-authored ones above.
//
// NOTE this deliberately exceeds D5: V1 monitors the walk-in cold room only,
// and 35% monitored means monitored fridges, freezers and ultra-colds. The
// monitored set is at least kept to types that could physically carry a sensor
// — never a microscope or a balance.
//   [facility, tag, type, name, make, model, condition, monitored]
const EXTRA_ROWS = [
  ['nhrl',   'NHRL/EQP/170', 'fridge-freezer', 'Blood bank refrigerator',     'Haier Biomedical', 'HXC-608',        'Functional',      true],
  ['nhrl',   'NHRL/EQP/171', 'ultra-cold',     'Ultra-low freezer −86 °C',    'Thermo Scientific', 'TSX400',        'Functional',      true],
  ['nhrl',   'NHRL/EQP/172', 'fridge-freezer', 'Reagent refrigerator (lab 2)', 'Liebherr',        'LKPv 6520',      'Faulty',          true],
  ['nhrl',   'NHRL/EQP/173', 'fridge-freezer', 'Plasma refrigerator',         'Haier Biomedical', 'HXC-158',        'Functional',      true],
  ['nhrl',   'NHRL/EQP/174', 'pipette',        'Multichannel pipette set',    'Gilson',           'Pipetman L',     'Unknown',         false],
  ['nmarl',  'NMARL/TR/FRZ/003', 'fridge-freezer', 'Sample freezer −20 °C',   'Haier Biomedical', 'DW-25L262',      'Functional',      true],
  ['nmarl',  'NMARL/TR/FRG/004', 'fridge-freezer', 'Reagent refrigerator',    'Haier Biomedical', 'HYC-390',        'Functional',      true],
  ['nmarl',  'NMARL/TR/MIC/008', 'microscope',  'Fluorescence microscope',    'Olympus',          'BX53',           'Functional',      false],
  ['nmarl',  'NMARL/TR/FRZ/005', 'ultra-cold',  'Ultra-low freezer −80 °C',   'Eppendorf',        'CryoCube F570',  'Functional',      true],
  ['nobrl',  'NOBRL/EQP/170', 'ultra-cold',    'Ultra-low freezer −80 °C',    'Eppendorf',        'CryoCube F740',  'Functional',      true],
  ['nobrl',  'NOBRL/EQP/171', 'fridge-freezer', 'Tissue bank refrigerator',   'Liebherr',         'LKUv 1610',      'Functional',      true],
  ['nobrl',  'NOBRL/EQP/172', 'biosafety-cabinet', 'Biosafety cabinet Class II', 'Esco',          'Airstream AC2',  'Unknown',         false],
  ['nobrl',  'NOBRL/EQP/173', 'fridge-freezer', 'Media refrigerator',         'Liebherr',         'LKPv 1420',      'Functional',      true],
  ['nfsnrl', 'NFSNRL/EQP/170', 'fridge-freezer', 'Sample refrigerator',       'Haier Biomedical', 'HYC-509',        'Functional',      true],
  ['nfsnrl', 'NFSNRL/EQP/171', 'ultra-cold',   'Ultra-low freezer −86 °C',    'Thermo Scientific', 'TSX600',        'Functional',      true],
  ['nfsnrl', 'NFSNRL/EQP/172', 'fridge-freezer', 'Standards refrigerator',    'Liebherr',         'LKPv 1420',      'Functional',      true],
  ['nfsnrl', 'NFSNRL/EQP/173', 'analyser',     'HPLC system',                 'Agilent',          '1260 Infinity II', 'Functional',    false],
  ['nfsnrl', 'NFSNRL/EQP/174', 'fridge-freezer', 'Sample refrigerator (bench 3)', 'Haier Biomedical', 'HYC-390',    'Faulty',          true],
  ['calib',  'CAL/EQP/060',   'fridge-freezer', 'Reference standards fridge', 'Liebherr',         'LKUv 1610',      'Functional',      true],
  ['calib',  'CAL/EQP/061',   'thermo-timer',  'Reference thermometer (spare)', 'Fluke',          '1524',           'Functional',      false],
  ['calib',  'CAL/EQP/062',   'it-facility',   'Calibration workstation',     'Dell',             'OptiPlex 7010',  'Decommissioned',  false],
  ['ccs',    'MOH/DLS/NPHL/CCS/FRZ-003', 'ultra-cold', 'Ultra-low freezer −86 °C (store)', 'Thermo Scientific', 'TSX400', 'Functional', true],
  ['ccs',    'MOH/DLS/NPHL/CCS/FRG-004', 'fridge-freezer', 'Vaccine refrigerator (store)', 'Haier Biomedical', 'HYC-509', 'Functional', true],
];

const LOCATIONS = {
  nhrl: ['Molecular lab, Room 12', 'Serology, Room 8', 'Sample prep, Room 6', 'Chemistry, Room 15'],
  nmarl: ['Microscopy bench 2', 'Sample prep, Room 2', 'Training room', 'Culture room'],
  nobrl: ['Cell culture, Room 4', 'Tissue bank, Room 1', 'Molecular lab, Room 7', 'Store, Room 9'],
  nfsnrl: ['Reagent store, Block D', 'Sample archive, Block D', 'Chemistry bench 3', 'Media room'],
  calib: ['Calibration bench A', 'Calibration bench B', 'Calibration store'],
  ccs: ['Central cold store, Block C', 'Central cold store, Block A'],
};

// A monitored record needs a device; single-sensor devices for the appliances,
// with the thresholds their type's configuration carries.
const deviceFor = (i, type) => ({
  baseStation: `ColdTrace ${i % 3 === 0 ? 'X' : '5'} · IMEI 3569380356${String(44200 + i * 7).slice(0, 5)}`,
  kind: i % 3 === 0 ? 'CTX' : 'CT5',
  sensors: [{
    id: 'sensor-a',
    label: i % 3 === 0 ? `CTX-${88400 + i}` : 'Sensor A',
    placement: 'Mid-height, centre',
    cce: 'In-room',
    alarms: type === 'ultra-cold' ? '−86 °C / −60 °C (Low / High)' : '2 °C / 8 °C (Low / High)',
    delays: '1 hr / 10 hrs (Low / High)',
    config: type === 'ultra-cold' ? 'Ultra-cold freezer configuration' : 'Refrigerator configuration',
  }],
});

LAB_EQUIPMENT.push(...EXTRA_ROWS.map(([facilityId, assetTag, type, name, make, model, condition, monitored], i) => ({
  id: `gen-${assetTag.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
  facilityId,
  assetTag,
  type,
  name,
  make,
  model,
  serial: `${make.slice(0, 2).toUpperCase()}-${1000 + i * 37}-${2018 + (i % 8)}`,
  location: LOCATIONS[facilityId][i % LOCATIONS[facilityId].length],
  condition,
  acquired: `${2017 + (i % 9)}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + ((i * 3) % 27)).padStart(2, '0')}`,
  monitored,
  ...(monitored ? { qrCode: `QR-${70100 + i}`, device: deviceFor(i, type) } : {}),
})));


// ── Roles & scope (§3) — no role model; the 4 region-scoped lists ─────────────
// Each persona is a projection of the same register through its granted scope.
export const PERSONAS = [
  {
    id: 'lead',
    label: 'Biomed lead (Victory)',
    grant: 'Admin Regions = NPHL',
    facilities: LAB_FACILITIES.map((f) => f.id), // all labs under NPHL
    canInstall: true, canInvite: true, canReport: true,
    modules: ['inventory', 'temperature', 'reports', 'service', 'learning'],
  },
  {
    id: 'tech',
    label: 'Lab technician (NHRL)',
    grant: 'User Regions = HIV Reference Lab',
    facilities: ['nhrl'],
    canInstall: true, canInvite: false, canReport: false,
    // No reports/training data in scope yet → those surfaces stay hidden.
    modules: ['inventory', 'service'],
  },
  {
    id: 'qa',
    label: 'Lab manager / QA (NFSNRL)',
    grant: 'Read Only Regions = Food Safety & Nutrition Ref Lab',
    facilities: ['nfsnrl'],
    canInstall: false, canInvite: false, canReport: true,
    modules: ['inventory', 'reports'],
  },
];

// Interleave monitored records through the list, one in three, so the first
// pages of the register show both kinds (Raf, 2026-09-07 — "give me more
// monitored on page 1 and 2"). The register renders in array order and the
// monitored appliances were all appended last, which buried them on page 5.
(() => {
  const mon = LAB_EQUIPMENT.filter((r) => r.monitored);
  const un = LAB_EQUIPMENT.filter((r) => !r.monitored);
  const ordered = [];
  while (mon.length || un.length) {
    if (mon.length) ordered.push(mon.shift());
    if (un.length) ordered.push(un.shift());
    if (un.length) ordered.push(un.shift());
  }
  LAB_EQUIPMENT.length = 0;
  LAB_EQUIPMENT.push(...ordered);
})();

export const rowsForPersona = (personaId) => {
  const p = PERSONAS.find((x) => x.id === personaId) || PERSONAS[0];
  return LAB_EQUIPMENT.filter((r) => p.facilities.includes(r.facilityId));
};

// ── Alarm contacts — facility directory (cap 5 per D4, hard, with counter) ────
// The platform's real cap: a facility can hold 10 RTMD alarm contacts (the
// third-party add-equipment flow states it on screen). This supersedes the
// provisional 5 recommended for D4 — flagged on PD-41.
export const MAX_ALARM_CONTACTS = 10;
export const CONTACT_DIRECTORY = [
  { id: 'c1', name: 'Victory Adhiambo',  phone: '+254 711 204 118', occupation: 'Biomedical Engineer' },
  { id: 'c2', name: 'Ednah Chebet',      phone: '+254 722 815 903', occupation: 'EPI Supervisor' },
  { id: 'c3', name: 'Samuel Kilonzo',    phone: '+254 733 640 271', occupation: 'Cold Chain Technician' },
  { id: 'c4', name: 'Grace Wanjiru',     phone: '+254 745 092 386', occupation: 'Vaccine Handler' },
  { id: 'c5', name: 'Brian Ochieng',     phone: '+254 756 318 447', occupation: 'Biomedical Technician' },
  { id: 'c6', name: 'Naomi Chirwa',      phone: '+254 767 559 210', occupation: 'Nurse' },
  { id: 'c7', name: 'Kevin Mutua',       phone: '+254 778 402 995', occupation: 'Health Center Manager' },
  // Past c7 so the 10-contact cap can actually be reached and shown.
  { id: 'c8',  name: 'Halima Said',       phone: '+254 789 663 174', occupation: 'Laboratory Technologist' },
  { id: 'c9',  name: 'Peter Otieno',      phone: '+254 790 227 508', occupation: 'Facility In-charge' },
  { id: 'c10', name: 'Janet Moraa',       phone: '+254 701 884 632', occupation: 'Data Officer' },
  { id: 'c11', name: 'Isaac Cheruiyot',   phone: '+254 712 470 951', occupation: 'Store Keeper' },
  { id: 'c12', name: 'Beatrice Wanjiru',  phone: '+254 723 015 786', occupation: 'Quality Officer' },
  { id: 'c13', name: 'George Njoroge',    phone: '+254 734 592 240', occupation: 'Biomedical Engineer' },
];

// ── Cold-room monitoring devices (Phase 2) — dropdowns only, never free text ──
export const BASE_STATIONS = [
  { id: 'rtmd-1', imei: '356938035643809', model: 'ColdTrace 5', kind: 'CT5' },
  { id: 'rtmd-2', imei: '359871060312345', model: 'ColdTrace 5', kind: 'CT5' },
  { id: 'rtmd-3', imei: '352099001761481', model: 'ColdTrace X', kind: 'CTX' },
];
export const CT5_SENSORS = ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'];
export const CTX_SENSORS = [
  'SEN-10021', 'SEN-10022', 'SEN-10036', 'SEN-10041', 'SEN-10057',
  'SEN-10063', 'SEN-10078', 'SEN-10084', 'SEN-10092', 'SEN-10105',
];

// ── Bulk import — the real files' headers → our fields (§8) ───────────────────
// Every column a record can hold — i.e. every field steps 1 and 2 of the add
// form collect (Raf, 2026-09-07), so a spreadsheet can carry as much as a
// hand-entered record. In the same order the form asks them.
//
// Two deliberate absences: Facility (chosen once for the whole file — one
// spreadsheet per facility) and Maintenance status (calculated from the
// schedule and last service date, never imported).
export const IMPORT_FIELDS = [
  // ── Step 1 · Facility & equipment ──
  { id: 'type',          label: 'Equipment type' },
  { id: 'name',          label: 'Name (+ infer type)' },
  { id: 'make',          label: 'Make' },
  { id: 'model',         label: 'Model' },
  { id: 'serial',        label: 'Serial number' },
  { id: 'assetTag',      label: 'Asset tag' },
  { id: 'location',      label: 'Location / room' },
  { id: 'condition',     label: 'Equipment status' },
  { id: 'deployment',    label: 'Deployment status' },
  { id: 'acquired',      label: 'Purchase date' },
  { id: 'qrCode',        label: 'QR code' },
  { id: 'sheetNotes',    label: 'Notes' },
  // ── Step 2 · Warranty & maintenance ──
  { id: 'warrantyStart', label: 'Warranty start date' },
  { id: 'warrantyEnd',   label: 'Warranty end date' },
  { id: 'schedule',      label: 'Maintenance schedule' },
  { id: 'lastService',   label: 'Last service date' },
  { id: 'agreement',     label: 'Service agreement (yes/no)' },
  { id: 'servicer',      label: 'Service provider' },
  { id: 'servicerPhone', label: 'Service provider phone' },
  { id: 'servicerEmail', label: 'Service provider email' },
  { id: 'coverFrom',     label: 'Cover start date' },
  { id: 'coverTo',       label: 'Cover end date' },
  { id: '__skip',        label: 'Don’t import' },
];

// ── Reading a real lab spreadsheet ───────────────────────────────────────────
// Labs send whatever they have: several files, several sheets per file, and
// some sheets laid out sideways (our field names running DOWN the first column
// with one record per column) rather than as a header row. The import has to
// work all of that out for itself (Raf, 2026-09-07), so the seed data below is
// RAW GRIDS — exactly what a parser would hand us — and the orientation,
// headers and rows are derived, never declared.

// Header synonyms, so an unseen header still finds its field. Matched loosely:
// lowercased, punctuation stripped, substring or whole-word hit.
const FIELD_SYNONYMS = {
  assetTag:      ['asset tag', 'asset no', 'equipment id', 'equipment no', 'equip id', 'inventory no', 'tag no', 'asset code', 'id no'],
  type:          ['equipment type', 'type of equipment', 'category', 'equipment category', 'class'],
  name:          ['name of equipment', 'equipment name', 'description', 'item', 'equipment', 'name'],
  make:          ['manufacturer', 'make', 'brand', 'supplier brand'],
  model:         ['model', 'model no', 'model number'],
  serial:        ['serial no', 'serial number', 'serial', 'sn'],
  location:      ['current location', 'location', 'room', 'department', 'unit', 'placement', 'where'],
  condition:     ['status', 'condition', 'working status', 'functional status', 'state'],
  deployment:    ['deployment', 'deployment status', 'in use', 'in service', 'installed'],
  acquired:      ['purchase date', 'date purchased', 'date of purchase', 'acquired', 'acquisition date', 'year purchased', 'procurement date'],
  qrCode:        ['qr', 'qr code', 'barcode'],
  sheetNotes:    ['notes', 'remarks', 'comments', 'observation'],
  warrantyStart: ['warranty start', 'warranty from', 'warranty commencement'],
  warrantyEnd:   ['warranty expiry', 'warranty end', 'warranty to', 'warranty until', 'warranty expires'],
  schedule:      ['maintenance schedule', 'service interval', 'ppm frequency', 'service frequency', 'maintenance frequency'],
  lastService:   ['last serviced', 'last service', 'date serviced', 'last ppm', 'last maintenance'],
  agreement:     ['service agreement', 'contract', 'under contract', 'service contract'],
  servicer:      ['service company', 'service provider', 'servicer', 'vendor', 'maintained by', 'service agent'],
  servicerPhone: ['service phone', 'provider phone', 'contact number', 'service contact', 'telephone'],
  servicerEmail: ['service email', 'provider email', 'email'],
  coverFrom:     ['cover start', 'cover from', 'contract start'],
  coverTo:       ['cover end', 'cover to', 'contract end', 'contract expiry'],
};

const norm = (v) => String(v ?? '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Best field for a spreadsheet header, or null when nothing matches.
 * Longest synonym first, so "warranty expiry" never loses to "warranty".
 */
export function suggestField(header) {
  const h = norm(header);
  if (!h) return null;
  let best = null;
  let bestLen = 0;
  Object.entries(FIELD_SYNONYMS).forEach(([field, syns]) => {
    syns.forEach((syn) => {
      const matched = h === syn || h.includes(syn);
      if (matched && syn.length > bestLen) { best = field; bestLen = syn.length; }
    });
  });
  return best;
}

const transpose = (grid) => (grid[0] || []).map((_, c) => grid.map((row) => row[c] ?? ''));

/**
 * Work out whether a raw grid is laid out in COLUMNS (a header row, one record
 * per row) or in ROWS (field names down the first column, one record per
 * column) by scoring which edge looks more like our field names.
 *
 * @returns {{orientation:'columns'|'rows', headers:string[], rows:string[][], confidence:number}}
 */
export function readSheet(grid) {
  const rowsGrid = grid.filter((r) => r.some((c) => String(c ?? '').trim()));
  if (!rowsGrid.length) return { orientation: 'columns', headers: [], rows: [], confidence: 0 };
  const firstRow = rowsGrid[0] || [];
  const firstCol = rowsGrid.map((r) => r[0] ?? '');
  const score = (cells) => {
    const filled = cells.filter((c) => String(c ?? '').trim());
    if (!filled.length) return 0;
    return filled.filter((c) => suggestField(c)).length / filled.length;
  };
  const colScore = score(firstRow);
  const rowScore = score(firstCol);
  // Ties go to columns — it is overwhelmingly the common layout.
  const asRows = rowScore > colScore;
  const oriented = asRows ? transpose(rowsGrid) : rowsGrid;
  return {
    orientation: asRows ? 'rows' : 'columns',
    headers: (oriented[0] || []).map((h) => String(h ?? '').trim()),
    rows: oriented.slice(1),
    confidence: Math.max(colScore, rowScore),
  };
}

/** Auto-map every header a sheet has; unmatched columns default to skip. */
export function suggestMapping(headers) {
  const out = {};
  headers.forEach((h) => { out[h] = suggestField(h) || '__skip'; });
  return out;
}

// ── Seed files: two spreadsheets, four sheets, one of them sideways ──────────
export const IMPORT_FILES = [
  {
    id: 'f1',
    name: 'NHRL equipment register 2026.xlsx',
    size: 86016,
    sheets: [
      {
        name: 'Main register',
        grid: [
          ['EQUIPMENT ID NO', 'Name of equipment', 'Manufacturer', 'Model', 'Serial no', 'Current location', 'Status', 'Purchase date', 'Warranty expiry', 'Last serviced', 'Service company'],
          ['NHRL/EQP/101', 'Refrigerated centrifuge',   'Eppendorf',    '5702 R',        '5702R-8817',   'Sample prep, Room 6',  'OK',                  '12/03/2022', '12/03/2025', '04/02/2026', 'Calibration Centre'],
          ['NHRL/EQP/102', 'Freezer -86 New Brunswick', 'Eppendorf',    'U410',          'U410-2231',    'Molecular lab, Rm 12', 'Working',             '02/07/2019', '02/07/2022', '',           ''],
          ['NHRL/EQP/103', 'ELISA washer',              'BioTek',       '50 TS',         '',             'Serology, Room 8',     'Not fully installed', '28/11/2025', '28/11/2028', '',           'Vendor (original supplier)'],
          ['NHRL/EQP/104', 'Vortex mixer',              'Scientific Industries', 'SI-0236', '',          'Sample prep, Room 6',  'Old',                 '',           '',           '',           ''],
          ['NHRL/EQP/022', 'Ultra-low freezer -86',     'Eppendorf New Brunswick', 'U535', 'U535-8842-KE', 'Molecular lab, Rm 12', 'OK',               '15/03/2021', '15/03/2024', '11/08/2025', 'Local service agent'],
        ],
      },
      {
        name: 'Cold chain',
        grid: [
          ['Asset code', 'Equipment', 'Brand', 'Serial', 'Room', 'Working status', 'Date purchased', 'Remarks'],
          ['NHRL/EQP/106', 'Water distiller',      'Lasany',   'LI-8842', 'Media room',         'Out of order',        '19/06/2017', 'Awaiting spare part'],
          ['NHRL/EQP/107', 'Autoclave bench-top',  'Tuttnauer', '',       'Sterilisation room', 'awaiting validation', '30/01/2026', 'New — IQ/OQ pending'],
        ],
      },
      {
        // Sideways: our field names run DOWN the first column, one machine per
        // column. Real registers arrive like this more often than anyone hopes.
        name: 'Annex (sideways)',
        grid: [
          ['Equipment ID',    'NHRL/EQP/201',        'NHRL/EQP/202'],
          ['Name',            'Biosafety cabinet',   'CO2 incubator'],
          ['Manufacturer',    'Thermo Scientific',   'Thermo Scientific'],
          ['Model',           '1300 Series A2',      'Heracell 150i'],
          ['Serial no',       'BSC-4471-KE',         'INC-9920-KE'],
          ['Room',            'TB lab, Room 3',      'Culture room'],
          ['Status',          'Functional',          'Needs repair'],
          ['Purchase date',   '08/04/2021',          '17/09/2018'],
          ['Warranty expiry', '08/04/2024',          ''],
          ['Service company', 'Local service agent', 'Local service agent'],
        ],
      },
    ],
  },
  {
    id: 'f2',
    name: 'Serology annex 2025.csv',
    size: 12288,
    sheets: [
      {
        name: 'Sheet 1',
        grid: [
          ['Inventory no', 'Description', 'Make', 'Model no', 'SN', 'Department', 'Condition', 'Year purchased', 'Maintained by', 'Telephone'],
          ['NHRL/EQP/301', 'Plate reader',      'BioTek',  'ELx800', 'ELX-2231', 'Serology, Room 8', 'Functional',   '2023', 'Calibration Centre', '+254 722 415 990'],
          ['NHRL/EQP/302', 'Microplate washer', 'BioTek',  '405 LS', '',         'Serology, Room 8', 'Not working',  '2016', '',                   ''],
        ],
      },
    ],
  },
];

// Condition mapping (§8): free-text → the lab's 4 values. 'review' rows need a
// human check; 'age' strings are NOT a condition — stored as a note instead.
export const CONDITION_MAP = {
  // Sheets that already use the lab's own vocabulary map straight through.
  'functional': { condition: 'Functional' },
  'faulty': { condition: 'Faulty' },
  'decommissioned': { condition: 'Decommissioned' },
  'unknown': { condition: 'Unknown' },
  'needs repair': { condition: 'Faulty' },
  'not working': { condition: 'Faulty' },
  'ok': { condition: 'Functional' },
  'working': { condition: 'Functional' },
  'new': { condition: 'Functional' },
  // Idle-but-working kit: the equipment is Functional, and the sheet's own
  // words are kept as a note. There is no "Not in use" condition (removed
  // 2026-09-07), so a human confirms rather than the import inventing a state.
  'not in use': { condition: 'Functional', review: true },
  // Not yet commissioned = nobody can vouch for it → Unknown, flagged.
  'not fully installed': { condition: 'Unknown', review: true },
  'awaiting validation': { condition: 'Unknown', review: true },
  'out of order': { condition: 'Faulty', review: true },
  'not working': { condition: 'Faulty', review: true },
  'broken': { condition: 'Faulty', review: true },
  'needs repair': { condition: 'Faulty', review: true },
  'unusable': { condition: 'Faulty', review: true },
  'decommissioned': { condition: 'Decommissioned' },
  'retired': { condition: 'Decommissioned' },
  // A blank or unreadable condition is an honest Unknown, never a guess.
  'unknown': { condition: 'Unknown', review: true },
  '?': { condition: 'Unknown', review: true },
  'old': { age: true },
};

// Type inference from names (§8) — first match wins, so SPECIFIC equipment is
// checked before the fridge/freezer catch-all ("Refrigerated centrifuge" is a
// centrifuge, not a fridge). Names with no confident match return null and the
// preview flags them "Type not recognised" — a human assigns, nothing guessed.
export const TYPE_INFERENCE = [
  { match: /cold\s*room/i, type: 'walk-in-cold-room' },
  { match: /-\s*86|-\s*40|ultra/i, type: 'ultra-cold' },
  { match: /centrifuge/i, type: 'centrifuge' },
  { match: /microscope/i, type: 'microscope' },
  { match: /cobas|abbott|elisa|analy[sz]er|hplc|gc.?ms|washer/i, type: 'analyser' },
  { match: /incubator/i, type: 'incubator' },
  { match: /biosafety|cabinet/i, type: 'biosafety-cabinet' },
  { match: /balance/i, type: 'balance' },
  { match: /pipette/i, type: 'pipette' },
  { match: /ph\s*meter/i, type: 'ph-meter' },
  { match: /plate\s*reader|microplate|elisa/i, type: 'analyser' },
  { match: /thermometer|timer/i, type: 'thermo-timer' },
  { match: /water\s*bath/i, type: 'water-bath' },
  { match: /computer|printer|ups|monitor|workstation/i, type: 'it-facility' },
  { match: /fridge|refrigerat|freezer/i, type: 'fridge-freezer' },
];
export const inferType = (name) =>
  TYPE_INFERENCE.find((t) => t.match.test(name || ''))?.type || null;

export const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

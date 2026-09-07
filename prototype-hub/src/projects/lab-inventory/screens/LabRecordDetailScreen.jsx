// ── Catalog record — tertiary detail for a NON-monitored lab equipment row ─────
// The register's explicit View has to land somewhere for every row, not just
// the cold room. Follows the EquipmentDetail ViewDetail shape: two-column,
// main card of fields + notes, right rail of small single-purpose cards.
// Catalog-only records have no monitoring surface — instead, a monitorable
// type gets the "Set up monitoring" path and everything else states plainly
// that it is register-only (not an error, not empty: a decision on screen).
import { Page } from '@ds/components/Page/Page.jsx';
import {
  Card, CardSectionTitle, CardField,
  CardLayoutType3, CardLayoutType4, CardLayoutType5,
} from '@ds/components/Card/Card.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { TEXT_SUBDUED } from '@ds/tokens/index.js';
import { LabShell } from './LabShell.jsx';
import {
  LAB_EQUIPMENT, facilityLabel, typeLabel, isMonitorableNow, isMonitorableLater,
  CONDITION_TONES, formatDate, PERSONAS, CONTACT_DIRECTORY,
} from './labData.js';

// Right-rail icons — the DS location/contact cards (CardLayoutType3/4) carry a
// 20px muted icon on every label, so every card sharing that rail does too.
const RailIcon = ({ name }) => <PolarisIconImg name={name} size={20} color="#616161" />;

/**
 * @param {string} recordId   A LAB_EQUIPMENT id (catalog-only rows).
 * @param {'lead'|'tech'|'qa'} persona  Read-only personas lose Edit/monitoring.
 */
export function LabRecordDetailScreen({
  recordId = 'nhrl-044', persona = 'lead', onBack, onEdit, onSetUpMonitoring, onCrumb,
}) {
  const record = LAB_EQUIPMENT.find((r) => r.id === recordId) || LAB_EQUIPMENT[1];
  const personaDef = PERSONAS.find((p) => p.id === persona) || PERSONAS[0];
  const decommissioned = record.condition === 'Decommissioned';
  const monitorableNow = isMonitorableNow(record.type) && !record.monitored;

  return (
    <LabShell level="tertiary" trail={[{ id: 'record', label: record.assetTag }]} onCrumb={onCrumb}>
      <Page
        flushTop
        title={record.name}
        subtitle={`${record.assetTag} · ${record.make} ${record.model} · ${facilityLabel(record.facilityId)}`}
        backAction={{ onClick: onBack, ariaLabel: 'Back to Lab Equipment' }}
        metadata={[
          { label: 'Cataloged', tone: 'default' },
          { label: record.condition || 'Not set', tone: CONDITION_TONES[record.condition] === 'default' ? 'default' : CONDITION_TONES[record.condition] },
        ]}
        primaryAction={personaDef.canInstall && !decommissioned ? { content: 'Edit', onClick: () => onEdit?.(record.id) } : undefined}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: '3 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {decommissioned && (
            <Banner tone="warning" inCard>
              <span style={{ display: 'block', fontWeight: 650 }}>This record is decommissioned</span>
              It stays in the register for audit and reporting — it is excluded from active
              counts but never disappears. Reactivate it by changing the condition.
            </Banner>
          )}
          {monitorableNow && !decommissioned && personaDef.canInstall && (
            <Banner tone="info" inCard
              actions={[{ label: 'Set up monitoring', onClick: onSetUpMonitoring }]}>
              <span style={{ display: 'block', fontWeight: 650 }}>This type can be monitored</span>
              Walk-in cold rooms are monitored with a Nexleaf base station and multiple
              sensors on this one record. Thresholds come from the type's configuration.
            </Banner>
          )}
          {isMonitorableLater(record.type) && !decommissioned && (
            <Banner tone="info" inCard hideIcon>
              <span style={{ display: 'block', fontWeight: 650 }}>Fridge/freezer monitoring is coming later</span>
              This record stays catalog-only for now and can be connected without
              re-registering when it lands.
            </Banner>
          )}

          <Card>
            <CardSectionTitle title="Record" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
              <CardField label="Asset tag" value={record.assetTag} />
              <CardField label="Type" value={typeLabel(record.type)} />
              <CardField label="Make" value={record.make} />
              <CardField label="Model" value={record.model} />
              <CardField label="Serial number" value={record.serial || '— (not recorded)'} />
              <CardField label="Acquisition date" value={formatDate(record.acquired)} />
            </div>
          </Card>

          <Card>
            <CardSectionTitle title="Monitoring" />
            <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
              {record.monitored
                ? 'This record is monitored — open it from the Monitored tab for the live view.'
                : monitorableNow
                  ? 'Not monitored yet. This type supports monitoring — set it up from the banner above.'
                  : isMonitorableLater(record.type)
                    ? 'Catalog-only for now. Fridge/freezer monitoring arrives in a later phase.'
                    : 'Catalog-only. This equipment type has no compatible temperature monitoring — that is expected for most of the register (~90%).'}
            </p>
          </Card>
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* DS Location card (CardLayoutType3), per the EquipmentDetail canonical. */}
          <CardLayoutType3
            region="National Public Health Lab"
            facilityName={facilityLabel(record.facilityId)}
            facilityHref="#"
            mapLat={-1.3005}
            mapLon={36.8065}
          />
          <Card>
            <CardSectionTitle title="Placement" />
            <CardField icon={<RailIcon name="PinIcon" />} label="Location / room" value={record.location || '—'} />
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <CardSectionTitle title="Condition" />
              <Badge tone={CONDITION_TONES[record.condition] || 'default'}>{record.condition || 'Not set'}</Badge>
            </div>
            <p style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
              Uses the Passive Equipment vocabulary. Age is kept in notes, never as a condition.
            </p>
          </Card>
          {/* DS QR card — catalog rows have no QR yet (whether lab assets get QR
              codes is an open decision on PD-41), so the card shows its honest
              empty state. Contact card carries the facility's primary contact. */}
          <CardLayoutType5 title="QR Code" onAssign={() => {}} />
          <CardLayoutType4
            addedBy={CONTACT_DIRECTORY[0].name}
            contactNumber={CONTACT_DIRECTORY[0].phone}
          />
          {record.notes && (
            <Card>
              <CardSectionTitle title="Notes" />
              <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>{record.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </LabShell>
  );
}

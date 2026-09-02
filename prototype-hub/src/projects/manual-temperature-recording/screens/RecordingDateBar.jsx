import React from 'react';
// SHARED SCREEN — the one constant Recording Date bar (PD-34).
// Steppers, the date, a Today / Past Entry pill, Pick Date, and search.
// Composed from Poltail only (see .claude/skills/ds-components-only).
//
// Past Entry rule: the pill reads "Past Entry" and a warning Banner states which
// date entries will be saved against. The BAR ITSELF DOES NOT TURN AMBER — only
// the badge changes tone. Raphael's correction, 27 Aug.
import { Badge, Btn, IconBtn, TextInput, PolarisIconImg } from '@ds';

export default function RecordingDateBar({
  date,
  pastEntry = false,
  search = '',
  onSearch,
  onPrev,
  onNext,
  onPickDate,
  onToday,
  disabled = false,
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 12, color: '#616161' }}>Recording Date</span>
            <Badge tone={pastEntry ? 'attention' : 'info'}>
              {pastEntry ? 'Past Entry' : 'Today'}
            </Badge>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#303030' }}>{date}</div>
        </div>

        <IconBtn icon={<PolarisIconImg name="ChevronLeftIcon" size={16} />} onClick={onPrev} disabled={disabled} />
        <IconBtn icon={<PolarisIconImg name="ChevronRightIcon" size={16} />} onClick={onNext} disabled={disabled} />

        <Btn variant="secondary" size="small" icon={<PolarisIconImg name="CalendarIcon" size={16} />}
          onClick={onPickDate} disabled={disabled}>
          Pick Date
        </Btn>

        {pastEntry && (
          <Btn variant="ghost" size="small" onClick={onToday} disabled={disabled}>
            Jump to Today
          </Btn>
        )}
      </div>

      <div style={{ width: 320, maxWidth: '100%' }}>
        <TextInput
          ariaLabel="Search equipment or serial number"
          placeholder="Search equipment or serial number"
          value={search}
          onChange={onSearch}
          disabled={disabled}
          prefix={<PolarisIconImg name="SearchIcon" size={16} />}
        />
      </div>
    </div>
  );
}

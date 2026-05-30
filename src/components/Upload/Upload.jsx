import { useRef, useState } from 'react';
import { Btn } from '../Btn/Btn.jsx';

// ── Tokens used (mirrors PoltailDesign system) ─────────────────────────
// bg-surface       #ffffff
// text-default     #303030
// text-subdued     #616161
// text-placeholder #9e9e9e
// border-default   #e0e0e0
// color-primary    #005bd3
// color-critical   #d92d20 (text) / #e51c00 (filled background)

// ── Icons ──────────────────────────────────────────────────────────────
const IcoUpload = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 10.5V2.5M8 2.5L5 5.5M8 2.5l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 11v1.5a1 1 0 001 1h9a1 1 0 001-1V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoX = ({ size = 14, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoTrash = ({ size = 16, color = '#ffffff' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2.5 4h11M6 4V2.5a1 1 0 011-1h2a1 1 0 011 1V4M4.5 4l.6 8.6a1.4 1.4 0 001.4 1.4h2.9a1.4 1.4 0 001.4-1.4L11.5 4"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 7v4M9.5 7v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoRetry = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 4.5a5.5 5.5 0 10-.6 7.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.5 1.5v3h-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoWarningTri = ({ size = 22, color = '#d92d20' }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M11 3l9 16H2L11 3z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M11 9v4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="11" cy="16.5" r="1" fill={color} />
  </svg>
);

// File-type icon: paper sheet with folded corner + colored label band
function FileTypeIcon({ ext = 'pdf' }) {
  const color = colorForExt(ext);
  const label = ext.toUpperCase().slice(0, 4);
  return (
    <svg width="44" height="52" viewBox="0 0 44 52" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      {/* Body */}
      <path d="M4 0H28L44 12V48a4 4 0 01-4 4H4a4 4 0 01-4-4V4a4 4 0 014-4Z" fill="#f1f1f1" />
      {/* Folded corner highlight */}
      <path d="M28 0v8a4 4 0 004 4h12" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
      {/* Colored label band */}
      <rect x="4" y="26" width="30" height="14" rx="2" fill={color} />
      <text x="19" y="36" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#ffffff" letterSpacing="0.5">
        {label}
      </text>
    </svg>
  );
}

function ErrorBadge() {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: '#fde2e1',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <IcoWarningTri size={22} color="#d92d20" />
    </div>
  );
}

// Circular progress with centered "%" label
function ProgressRing({ value = 0, size = 40 }) {
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }} aria-hidden="true">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e0e0e0" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#005bd3" strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 600, color: '#303030', fontFamily: 'Inter, sans-serif',
      }}>
        {Math.round(value)}%
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatBytes(bytes) {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${Math.round(bytes / 1024 / 1024)}MB`;
}
function formatDate(d) {
  if (!d) return '';
  const dt = d instanceof Date ? d : new Date(d);
  return `${dt.getDate()} ${MONTHS[dt.getMonth()]}, ${dt.getFullYear()}`;
}
function formatTime(d) {
  if (!d) return '';
  const dt = d instanceof Date ? d : new Date(d);
  let h = dt.getHours();
  const m = dt.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')}${ampm}`;
}
function extOf(name = '') {
  const dot = name.lastIndexOf('.');
  if (dot < 0) return '';
  return name.slice(dot + 1);
}
function colorForExt(ext) {
  const e = String(ext || '').toLowerCase();
  if (['pdf'].includes(e)) return '#e51c00';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(e)) return '#16a34a';
  if (['doc', 'docx', 'txt'].includes(e)) return '#2563eb';
  if (['xls', 'xlsx', 'csv'].includes(e)) return '#0e7340';
  if (['zip', 'rar', '7z'].includes(e)) return '#a16207';
  return '#616161';
}

// ── Small unstyled icon button (X cancel during upload) ────────────────
function PlainIconButton({ icon, onClick, ariaLabel, disabled }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => !disabled && setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, padding: 0,
        background: hov && !disabled ? '#f1f1f1' : 'transparent',
        border: 'none', borderRadius: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        boxShadow: foc ? '0 0 0 2px #005bd3' : 'none',
        transition: 'background 0.1s, box-shadow 0.12s',
      }}
    >
      {icon}
    </button>
  );
}

// ── File row (renders the right action based on file.status) ───────────
function FileRow({ file, onCancel, onRemove, onRetry, disabled }) {
  const ext = extOf(file.name);
  const isError = file.status === 'error';
  const isUploading = file.status === 'uploading';

  const meta = !isError && (
    <div style={{
      fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9e9e9e',
      lineHeight: '18px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
    }}>
      {file.uploadedAt && (
        <>
          <span>{formatDate(file.uploadedAt)}</span>
          <span style={{ color: '#e0e0e0' }}>|</span>
          <span>{formatTime(file.uploadedAt)}</span>
        </>
      )}
      {file.size != null && (
        <>
          {file.uploadedAt && <span aria-hidden="true">•</span>}
          <span>{formatBytes(file.size)}</span>
        </>
      )}
    </div>
  );

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '4px 0',
    }}>
      {isError ? <ErrorBadge /> : <FileTypeIcon ext={ext || 'file'} />}

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
          lineHeight: '20px', color: '#303030',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {file.name}
        </div>
        {isError ? (
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 450,
            lineHeight: '18px', color: '#d92d20',
          }}>
            {file.errorMessage || 'Error message'}
          </div>
        ) : meta}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {isUploading && (
          <>
            <ProgressRing value={file.progress ?? 0} />
            <PlainIconButton
              icon={<IcoX size={14} color="#616161" />}
              onClick={() => onCancel && onCancel(file.id)}
              ariaLabel={`Cancel upload of ${file.name}`}
              disabled={disabled}
            />
          </>
        )}
        {file.status === 'done' && (
          <Btn
            variant="destructive"
            onClick={() => onRemove && onRemove(file.id)}
            disabled={disabled}
            icon={<IcoTrash size={16} color={disabled ? '#b5b5b5' : '#ffffff'} />}
          />
        )}
        {isError && (
          <Btn
            variant="ghost"
            onClick={() => onRetry && onRetry(file.id)}
            icon={<IcoRetry size={16} />}
            disabled={disabled}
          >
            Try Again
          </Btn>
        )}
      </div>
    </div>
  );
}

// ── Field label ────────────────────────────────────────────────────────
function Label({ label, required, htmlFor }) {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} style={{
      fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
      lineHeight: '20px', color: '#303030', display: 'inline-block',
    }}>
      {label}
      {required && <span style={{ color: '#d92d20', marginLeft: 2 }}>*</span>}
    </label>
  );
}

// ── Upload ─────────────────────────────────────────────────────────────
//
// Controlled component. The consumer owns the `files` array and updates
// it in response to onAddFiles / onCancel / onRemove / onRetry callbacks.
//
// File shape:
//   {
//     id:           string,                        // stable id
//     name:         string,                        // filename incl. ext
//     size:         number,                        // bytes
//     uploadedAt:   Date | string | null,          // shown in metadata row
//     status:       'uploading' | 'done' | 'error',
//     progress?:    number,                        // 0-100 (uploading)
//     errorMessage?: string                        // shown in red (error)
//   }
//
export function Upload({
  id,
  label = 'Upload document',
  required = false,
  helperText = 'Upload up to 5 files (JPEG, PNG), max 10 MB each.',
  accept = 'image/jpeg,image/png,application/pdf',
  multiple = true,
  maxFiles = 5,
  files = [],
  onAddFiles,
  onCancel,
  onRemove,
  onRetry,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const inputId = id || 'upload-input';
  const reachedMax = files.length >= maxFiles;
  const addDisabled = disabled || reachedMax;

  function openPicker() {
    if (addDisabled) return;
    inputRef.current?.click();
  }

  function handlePicked(e) {
    const picked = Array.from(e.target.files || []);
    if (picked.length && onAddFiles) onAddFiles(picked);
    // reset so the same file can be re-picked
    e.target.value = '';
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 560 }}>
      <Label label={label} required={required} htmlFor={inputId} />

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={addDisabled}
        onChange={handlePicked}
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}
      />

      <div>
        <Btn
          variant="secondary"
          onClick={openPicker}
          disabled={addDisabled}
          icon={<IcoUpload size={16} color={addDisabled ? '#b5b5b5' : '#303030'} />}
        >
          Add file
        </Btn>
      </div>

      {helperText && (
        <div style={{
          fontSize: 13, fontWeight: 450, lineHeight: '18px',
          color: '#616161', fontFamily: 'Inter, sans-serif',
        }}>
          {helperText}
        </div>
      )}

      {files.length > 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 4, marginTop: 12,
        }}>
          {files.map((f) => (
            <FileRow
              key={f.id}
              file={f}
              onCancel={onCancel}
              onRemove={onRemove}
              onRetry={onRetry}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

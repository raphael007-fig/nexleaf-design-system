import { useEffect, useRef, useState } from 'react';
import { Upload } from './Upload.jsx';

export default {
  title: 'Components/Forms/Upload',
  component: Upload,
  parameters: { layout: 'padded' },
};

// Sample static file objects used across stories
const SAMPLE_DATE = new Date(2023, 8, 11, 12, 24); // 11 Sep 2023, 12:24pm

const SAMPLE_UPLOADING = {
  id: 'f1',
  name: 'Name of document.pdf',
  size: 13 * 1024 * 1024,
  uploadedAt: SAMPLE_DATE,
  status: 'uploading',
  progress: 25,
};
const SAMPLE_DONE = {
  id: 'f2',
  name: 'Name of document.pdf',
  size: 13 * 1024 * 1024,
  uploadedAt: SAMPLE_DATE,
  status: 'done',
};
const SAMPLE_ERROR = {
  id: 'f3',
  name: 'Name of document.pdf',
  status: 'error',
  errorMessage: 'Error message',
};

// ── Stories ──────────────────────────────────────────────────────────────

export const Empty = {
  name: 'Empty (no files yet)',
  render: () => (
    <Upload
      label="Upload document"
      required
      helperText="Upload up to 5 files (JPEG, PNG), max 10 MB each."
      files={[]}
      onAddFiles={() => {}}
    />
  ),
};

export const ThreeStates = {
  name: 'Three file states (matches design spec)',
  render: () => (
    <Upload
      label="Upload document"
      required
      helperText="Upload up to 5 files (JPEG, PNG), max 10 MB each."
      files={[SAMPLE_UPLOADING, SAMPLE_DONE, SAMPLE_ERROR]}
      onAddFiles={() => {}}
      onCancel={() => {}}
      onRemove={() => {}}
      onRetry={() => {}}
    />
  ),
};

export const UploadingOnly = {
  name: 'Uploading state — progress ring + cancel',
  render: () => (
    <Upload
      label="Upload document"
      files={[SAMPLE_UPLOADING]}
      onAddFiles={() => {}}
      onCancel={() => {}}
    />
  ),
};

export const DoneOnly = {
  name: 'Uploaded state — delete button',
  render: () => (
    <Upload
      label="Upload document"
      files={[SAMPLE_DONE]}
      onAddFiles={() => {}}
      onRemove={() => {}}
    />
  ),
};

export const ErrorOnly = {
  name: 'Error state — Try Again',
  render: () => (
    <Upload
      label="Upload document"
      files={[SAMPLE_ERROR]}
      onAddFiles={() => {}}
      onRetry={() => {}}
    />
  ),
};

// Live demo — uses a setInterval to advance progress for uploading rows.
// Real consumers will drive progress from XHR / fetch upload events.
export const LiveSimulated = {
  name: 'Live — simulated upload progression',
  render: () => {
    const [files, setFiles] = useState([]);
    const counter = useRef(0);

    useEffect(() => {
      const t = setInterval(() => {
        setFiles((curr) => curr.map((f) => {
          if (f.status !== 'uploading') return f;
          const next = Math.min(100, (f.progress ?? 0) + 7);
          if (next >= 100) {
            // 1-in-4 chance the simulated upload errors out
            const errored = (counter.current++ % 4) === 0;
            return errored
              ? { ...f, status: 'error', errorMessage: 'Network error — please retry.' }
              : { ...f, status: 'done', progress: 100 };
          }
          return { ...f, progress: next };
        }));
      }, 400);
      return () => clearInterval(t);
    }, []);

    function handleAdd(picked) {
      const added = picked.map((p, i) => ({
        id: `${Date.now()}-${i}`,
        name: p.name,
        size: p.size,
        uploadedAt: new Date(),
        status: 'uploading',
        progress: 0,
      }));
      setFiles((curr) => [...curr, ...added]);
    }
    function handleCancel(id) {
      setFiles((curr) => curr.filter((f) => f.id !== id));
    }
    function handleRemove(id) {
      setFiles((curr) => curr.filter((f) => f.id !== id));
    }
    function handleRetry(id) {
      setFiles((curr) => curr.map((f) => f.id === id
        ? { ...f, status: 'uploading', progress: 0, errorMessage: undefined }
        : f));
    }

    return (
      <Upload
        label="Upload document"
        required
        helperText="Upload up to 5 files (JPEG, PNG), max 10 MB each."
        accept="image/jpeg,image/png,application/pdf"
        files={files}
        onAddFiles={handleAdd}
        onCancel={handleCancel}
        onRemove={handleRemove}
        onRetry={handleRetry}
      />
    );
  },
};

export const MultipleFileTypes = {
  name: 'Multiple file types (PDF / image / doc / xls)',
  render: () => (
    <Upload
      label="Attachments"
      helperText="Up to 5 files. Any common document type."
      files={[
        { id: 'a', name: 'report-q3.pdf',       size: 2_100_000, uploadedAt: SAMPLE_DATE, status: 'done' },
        { id: 'b', name: 'cover-photo.png',     size: 540_000,   uploadedAt: SAMPLE_DATE, status: 'done' },
        { id: 'c', name: 'budget.xlsx',         size: 88_000,    uploadedAt: SAMPLE_DATE, status: 'done' },
        { id: 'd', name: 'meeting-notes.docx',  size: 32_000,    uploadedAt: SAMPLE_DATE, status: 'done' },
      ]}
      onAddFiles={() => {}}
      onRemove={() => {}}
    />
  ),
};

export const AtMaxLimit = {
  name: 'At max limit (5/5) — Add file disabled',
  render: () => (
    <Upload
      label="Upload document"
      required
      helperText="Upload up to 5 files (JPEG, PNG), max 10 MB each."
      files={[
        { id: 'a', name: 'document-1.pdf', size: 2_000_000, uploadedAt: SAMPLE_DATE, status: 'done' },
        { id: 'b', name: 'document-2.pdf', size: 5_000_000, uploadedAt: SAMPLE_DATE, status: 'done' },
        { id: 'c', name: 'document-3.pdf', size: 1_400_000, uploadedAt: SAMPLE_DATE, status: 'done' },
        { id: 'd', name: 'document-4.pdf', size: 800_000,   uploadedAt: SAMPLE_DATE, status: 'done' },
        { id: 'e', name: 'document-5.pdf', size: 3_100_000, uploadedAt: SAMPLE_DATE, status: 'done' },
      ]}
      onAddFiles={() => {}}
      onRemove={() => {}}
    />
  ),
};

export const Disabled = {
  name: 'Disabled (whole component)',
  render: () => (
    <Upload
      label="Upload document"
      required
      helperText="Upload up to 5 files (JPEG, PNG), max 10 MB each."
      files={[SAMPLE_UPLOADING, SAMPLE_DONE, SAMPLE_ERROR]}
      onAddFiles={() => {}}
      onCancel={() => {}}
      onRemove={() => {}}
      onRetry={() => {}}
      disabled
    />
  ),
};

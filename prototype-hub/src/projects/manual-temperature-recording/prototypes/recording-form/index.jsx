import React from 'react';
import { Page } from '@ds';

export default function RecordingForm() {
  return (
    <div style={{ background: '#f1f1f1', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 24 }}>
        <Page title="recording-form" subtitle="New prototype" />
        {/* Build here using components from '@ds'.
            Reusing a screen across flows? Import it instead of rebuilding:
              import CceDetail from '../../screens/CceDetail.jsx';
            Create one with:  npm run new-screen -- <project> CceDetail */}
      </div>
    </div>
  );
}

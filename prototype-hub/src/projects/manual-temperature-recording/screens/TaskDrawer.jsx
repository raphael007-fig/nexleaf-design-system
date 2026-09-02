import React from 'react';
// SHARED SCREEN — Today's Temperature Tasks drawer (PD-36).
//
// This is a thin adapter over the design system's own TemperatureTasksPanel.
// An earlier version of this file hand-rolled the drawer out of SlideOver +
// Tabs + Cell + Pagination, which was a ds-components-only violation: the DS
// already ships this exact widget, complete with the pending badge, the
// Morning / Evening / Completed tabs, per-tab empty copy and pagination.
//
// The panel gained `activeTab` / `onTabChange` / `loading` so a state-set
// prototype can render D2a (Completed tab) and D2b (loading) on demand. Those
// props are optional and additive, so existing uses are unaffected. Logged on
// PD-16.
import { TemperatureTasksPanel } from '@ds';

export default function TaskDrawer({
  open,
  onClose,
  tasks = { morning: [], evening: [], completed: [] },
  activeTab = 0,
  onTabChange,
  onRecord,
  loading = false,
  title = "Today's Temperature Tasks",
}) {
  return (
    <TemperatureTasksPanel
      open={open}
      onClose={onClose}
      tasks={tasks}
      title={title}
      activeTab={activeTab}
      onTabChange={onTabChange}
      loading={loading}
      onRecord={onRecord}
    />
  );
}

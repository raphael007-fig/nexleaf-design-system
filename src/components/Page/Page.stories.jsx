import { Page } from './Page.jsx';

export default {
  title: 'Components/Page',
  component: Page,
  parameters: { layout: 'padded', backgrounds: { default: 'light' } },
};

export const Default = {
  args: {
    title: 'Products',
  },
};

export const WithActions = {
  args: {
    title: 'Products',
    primaryAction: { content: 'Add product', onAction: () => {} },
    secondaryActions: [{ content: 'Export', onAction: () => {} }],
  },
};

export const WithBackAction = {
  args: {
    title: 'Product details',
    subtitle: 'Manage your product',
    backAction: { onAction: () => {} },
    primaryAction: { content: 'Save', onAction: () => {} },
    secondaryActions: [{ content: 'Discard', onAction: () => {} }],
  },
};

export const WithMetadata = {
  args: {
    title: 'Winter collection',
    metadata: [
      { label: 'Active', tone: 'success' },
      { label: 'Draft', tone: 'attention' },
    ],
    primaryAction: { content: 'Save', onAction: () => {} },
  },
};

export const WithPagination = {
  args: {
    title: 'Orders',
    pagination: { hasPrevious: true, hasNext: true },
    primaryAction: { content: 'Export', onAction: () => {} },
  },
};

export const WithAllFeatures = {
  name: 'With All Features',
  args: {
    title: 'Temperature Records',
    subtitle: 'ColdChain facility — Nairobi, Kenya',
    backAction: { onAction: () => {} },
    metadata: [
      { label: 'Active', tone: 'success' },
      { label: 'Morning', tone: 'default' },
    ],
    primaryAction: { content: 'Save record', onAction: () => {} },
    secondaryActions: [
      { content: 'Actions', disclosure: true, onAction: () => {} },
      { content: 'Export', onAction: () => {} },
    ],
  },
};

export const Full = {
  args: {
    title: 'Temperature Records',
    subtitle: 'ColdChain facility — Nairobi, Kenya',
    backAction: { onAction: () => {} },
    metadata: [{ label: 'Active', tone: 'success' }],
    primaryAction: { content: 'Save record', onAction: () => {} },
    secondaryActions: [
      { content: 'Actions', disclosure: true, onAction: () => {} },
      { content: 'Export', onAction: () => {} },
    ],
  },
};

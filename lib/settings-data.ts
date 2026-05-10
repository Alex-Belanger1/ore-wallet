import type { ValueTone } from './dummy-data';

export type ToggleSetting = {
  title: string;
  detail: string;
  enabled: boolean;
};

export type ValueSetting = {
  title: string;
  detail: string;
  value: string;
  tone?: ValueTone;
};

export const settingsData = {
  greeting: 'Settings',
  title: 'Profile, controls, and preferences for the ORE wallet concept.',
  subtitle:
    'Everything here is UI-only and powered by demo data. The layout is meant to feel like a clean, premium settings surface rather than a developer checklist.',
  profile: {
    name: 'Avery Cole',
    handle: '@averyreserve',
    email: 'avery@reserve.test',
    region: 'United States',
    tier: 'Founding profile',
    session: 'Face ID + passkey',
    note: 'Demo profile',
  },
  themePreview: {
    title: 'Theme preview',
    mode: 'ORE Dark',
    detail:
      'Near-black surfaces, off-white text, and gold accents are previewed here before any real theming controls are added.',
    tags: ['Dark mode', 'Gold accent', 'Raised surfaces'],
  },
  security: [
    {
      title: 'Face ID for sends',
      detail: 'Require biometric approval before send, borrow, or spend actions.',
      enabled: true,
    },
    {
      title: 'Passkey recovery',
      detail: 'Offer a consumer-friendly fallback before any seed export path.',
      enabled: true,
    },
    {
      title: 'High-value confirmation',
      detail: 'Ask for an extra confirmation step when modeled transfers exceed your limit.',
      enabled: true,
    },
    {
      title: 'Sensitive balance blur',
      detail: 'Mask balances on app switch or when the device is unattended.',
      enabled: false,
    },
  ] satisfies ToggleSetting[],
  notifications: [
    {
      title: 'Portfolio summaries',
      detail: 'Daily rollups for balances, staking, and private transfers.',
      enabled: true,
    },
    {
      title: 'Mining round alerts',
      detail: 'Updates when dummy mining sessions settle or require attention.',
      enabled: false,
    },
    {
      title: 'Security notices',
      detail: 'Immediate alerts for sign-ins, approvals, and profile changes.',
      enabled: true,
    },
    {
      title: 'Learn reminders',
      detail: 'Occasional prompts when new educational modules are available.',
      enabled: false,
    },
  ] satisfies ToggleSetting[],
  preferences: [
    {
      title: 'Currency preference',
      detail: 'Primary display currency used across portfolio, spend, and borrowing screens.',
      value: 'USD',
      tone: 'accent',
    },
    {
      title: 'Secondary asset display',
      detail: 'Show ORE balances beside fiat equivalents throughout the app.',
      value: 'USD + ORE',
    },
    {
      title: 'Number format',
      detail: 'Compact figures for cards and full precision inside detailed views.',
      value: 'Smart formatting',
    },
  ] satisfies ValueSetting[],
  developerMode: {
    title: 'Developer mode',
    detail:
      'Keeps the product in demo-data mode so every feature remains safe to explore without live balances, APIs, or connected services.',
    enabled: true,
    badge: 'Demo data on',
  },
  connectedWallets: [
    {
      title: 'Phantom',
      detail: 'Placeholder connection for a primary Solana wallet.',
      value: 'Connected',
      tone: 'positive',
    },
    {
      title: 'Backpack',
      detail: 'Secondary wallet slot reserved for future multi-wallet support.',
      value: 'Placeholder',
    },
    {
      title: 'Ledger',
      detail: 'Hardware wallet support preview for long-term ORE custody.',
      value: 'Coming later',
      tone: 'accent',
    },
  ] satisfies ValueSetting[],
  support: [
    {
      title: 'Help center',
      detail: 'Short product guides, FAQs, and wallet explainers.',
      value: 'Open guide',
    },
    {
      title: 'Contact support',
      detail: 'A future in-app conversation surface for product and account questions.',
      value: 'Future inbox',
      tone: 'accent',
    },
    {
      title: 'System status',
      detail: 'Placeholder health page for app uptime, notifications, and data freshness.',
      value: 'All systems demo-ready',
      tone: 'positive',
    },
  ] satisfies ValueSetting[],
  legal: [
    {
      title: 'Terms of use',
      detail: 'How a future production app would frame account and product usage.',
      value: 'Draft concept',
    },
    {
      title: 'Privacy notice',
      detail: 'What the app could collect, store, or display across wallet surfaces.',
      value: 'Draft concept',
    },
    {
      title: 'Disclosures',
      detail: 'Risk and product disclosures for mining, staking, privacy, borrowing, and spend.',
      value: 'Demo-only',
      tone: 'accent',
    },
  ] satisfies ValueSetting[],
} as const;

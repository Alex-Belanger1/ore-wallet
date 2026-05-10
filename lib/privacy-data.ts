import type { ValueTone } from './dummy-data';

export type PrivacyMetric = {
  label: string;
  value: string;
  detail: string;
  tone?: ValueTone;
};

export type PrivacyFlowStep = {
  title: string;
  body: string;
};

export type PrivacyFlow = {
  title: string;
  badge: string;
  summary: string;
  helper: string;
  primaryAction: string;
  secondaryAction: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  steps: PrivacyFlowStep[];
};

export type PrivacyTransfer = {
  title: string;
  detail: string;
  value: string;
  tone?: ValueTone;
};

export type PrivacyDisclosure = {
  title: string;
  body: string;
  tag: string;
  tone?: 'default' | 'accent';
};

export const privacyData = {
  greeting: 'Private ORE',
  title: 'A discreet transfer workspace for private balances, deposit routing, and clean records.',
  subtitle:
    'Everything on this screen is demo-only. The goal is to make privacy feel understandable and deliberate, not mysterious or overpromised.',
  balance: {
    privateOre: '24.00 ORE',
    availableToSend: '18.40 ORE',
    pendingInPool: '5.60 ORE',
    privacyScore: 82,
    privacyLevel: 'High privacy readiness',
    helper:
      'The score reflects demo-only habits like settled pool balance, recent routing discipline, and how much transfer metadata is masked inside the product.',
    note: 'Demo privacy score',
  },
  metrics: [
    {
      label: 'Private balance',
      value: '24.00 ORE',
      detail: 'Ready inside the dummy privacy pool.',
      tone: 'accent',
    },
    {
      label: 'Pending deposits',
      value: '2 deposits',
      detail: 'Waiting through the modeled privacy window.',
    },
    {
      label: 'Masked transfer mode',
      value: 'Enabled',
      detail: 'Receipts are shown with minimal detail by default.',
      tone: 'positive',
    },
  ] satisfies PrivacyMetric[],
  depositFlow: {
    title: 'Deposit into privacy pool',
    badge: 'Pool entry',
    summary:
      'Move public ORE into the private pool before initiating a private transfer. The layout focuses on the sequence, waiting window, and what the user should expect next.',
    helper:
      'This flow uses dummy balances only. No shielding SDK, relay, or proof system is connected.',
    primaryAction: 'Deposit to Pool',
    secondaryAction: 'Review Limits',
    stats: [
      { label: 'Selected amount', value: '6.00 ORE' },
      { label: 'Modeled settle time', value: '12 min' },
      { label: 'Estimated pool fee', value: '0.03 ORE' },
    ],
    steps: [
      {
        title: 'Select a public balance',
        body: 'Choose liquid ORE from the main wallet before it enters the private pool.',
      },
      {
        title: 'Wait through the pool window',
        body: 'The app shows a calm pending state while the demo deposit clears into the private balance.',
      },
      {
        title: 'Send when the balance settles',
        body: 'Once the deposit is available, it becomes eligible for private transfers inside this workspace.',
      },
    ],
  } satisfies PrivacyFlow,
  transferFlow: {
    title: 'Private transfer',
    badge: 'Discreet send',
    summary:
      'Private sends stay framed like secure cash movement: confirm destination, confirm amount, then approve a transfer with masked receipts and reduced visible history.',
    helper:
      'This is a product demo. Destination masking, settlement, and route selection are illustrative only.',
    primaryAction: 'Private Transfer',
    secondaryAction: 'Paste Demo Address',
    stats: [
      { label: 'Destination', value: 'ore1q...7h9k' },
      { label: 'Suggested send size', value: '2.40 ORE' },
      { label: 'Receipt mode', value: 'Minimal detail' },
    ],
    steps: [
      {
        title: 'Confirm the destination',
        body: 'The interface reduces the visible address footprint while still preserving a recognizable preview.',
      },
      {
        title: 'Use the private balance',
        body: 'Transfers draw from the settled pool balance instead of public wallet funds.',
      },
      {
        title: 'Store a masked receipt',
        body: 'Recent history remains useful for the owner while avoiding overly revealing ledger-style summaries.',
      },
    ],
  } satisfies PrivacyFlow,
  transfers: [
    {
      title: 'Private send to ore1q...7h9k',
      detail: 'Settled from the privacy pool with masked receipt details.',
      value: '-2.40 ORE',
      tone: 'accent',
    },
    {
      title: 'Deposit cleared into pool',
      detail: 'Public ORE became available for private transfers after the modeled wait window.',
      value: '+6.00 ORE',
      tone: 'positive',
    },
    {
      title: 'Private send to reserve contact',
      detail: 'Recipient label retained locally while transfer details stayed minimized.',
      value: '-1.15 ORE',
    },
  ] satisfies PrivacyTransfer[],
  disclosure: {
    title: 'Risks and limitations',
    body:
      'Privacy UX should be honest about what it can and cannot do. A refined interface reduces operator mistakes, but it does not eliminate policy, counterparty, or metadata limitations.',
    notes: [
      {
        title: 'Private does not mean invisible.',
        body:
          'A privacy product can reduce what is visible in routine history, but counterparties, timing patterns, and off-chain behavior still matter.',
        tag: 'Metadata limits',
        tone: 'accent',
      },
      {
        title: 'Pool windows create timing tradeoffs.',
        body:
          'Entering or exiting a privacy pool may introduce waiting periods that affect how quickly funds can be used elsewhere.',
        tag: 'Liquidity limits',
      },
      {
        title: 'This build makes no live guarantees.',
        body:
          'No shielded transfer SDK, proof system, or production settlement path is attached to this app right now.',
        tag: 'Demo only',
      },
    ] satisfies PrivacyDisclosure[],
    footer:
      'All balances, send states, addresses, wait windows, and privacy scores on this screen are placeholders for product design only.',
  },
} as const;

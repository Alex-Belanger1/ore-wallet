export type ValueTone = 'default' | 'accent' | 'positive' | 'warning';

export type ScreenKey =
  | 'home'
  | 'mine'
  | 'earn'
  | 'borrow'
  | 'privacy'
  | 'learn'
  | 'settings';

export type ScreenData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  hero: {
    label: string;
    value: string;
    change: string;
    detail: string;
    cta: string;
    tags: string[];
  };
  metrics: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  sections: Array<{
    title: string;
    description: string;
    rows: Array<{
      label: string;
      detail: string;
      value: string;
      tone?: ValueTone;
    }>;
  }>;
};

export const walletScreens: Record<ScreenKey, ScreenData> = {
  home: {
    eyebrow: 'ORE portfolio',
    title: 'Home',
    subtitle: 'A calm command view for balances, yield, and next actions.',
    hero: {
      label: 'Total vault position',
      value: '248.84 ORE',
      change: '+4.8% today',
      detail: 'Approx. $9,931.20 across liquid, yield, and shielded balances.',
      cta: 'Review vault snapshot',
      tags: ['Dummy data', 'Mobile first', 'ORE native'],
    },
    metrics: [
      { label: 'Liquid', value: '91.40 ORE', note: 'Ready to deploy' },
      { label: 'Yield stack', value: '18.7% APY', note: 'Mine + stake + lend' },
      { label: 'Privacy pool', value: '24.00 ORE', note: 'Shielded and available' },
    ],
    sections: [
      {
        title: 'Today',
        description: 'High-signal changes the user would care about first.',
        rows: [
          {
            label: 'Weekly inflow',
            detail: 'Auto-buys, refined mining rewards, and staking yield.',
            value: '+6.57 ORE',
            tone: 'positive',
          },
          {
            label: 'Portfolio drift',
            detail: 'Weighting moved slightly toward income strategies.',
            value: 'Balanced',
            tone: 'accent',
          },
          {
            label: 'Available borrow headroom',
            detail: 'Safe buffer before the UI would suggest any risk action.',
            value: '$4,260',
          },
        ],
      },
      {
        title: 'Next actions',
        description: 'Fast product moments for a premium wallet home screen.',
        rows: [
          {
            label: 'Buy ORE',
            detail: 'Mock Apple Pay flow with instant balance reflection.',
            value: '1 tap',
            tone: 'accent',
          },
          {
            label: 'Move to privacy',
            detail: 'Shield liquid ORE before a transfer or spend.',
            value: '24 ORE',
          },
          {
            label: 'Open learn feed',
            detail: 'Editorial notes on supply, mining cadence, and yield.',
            value: '3 briefs',
          },
        ],
      },
    ],
  },
  mine: {
    eyebrow: 'Mining workspace',
    title: 'Mine',
    subtitle: 'A focused view for live rounds, automation, and reward pacing.',
    hero: {
      label: 'Current mining session',
      value: '+0.0412 ORE',
      change: '18% round odds',
      detail: 'Round #2,745,994 is staged with a balanced, battery-safe strategy.',
      cta: 'Adjust mining strategy',
      tags: ['Battery safe', 'Automation', 'Dummy data'],
    },
    metrics: [
      { label: 'Refine boost', value: '6.9%', note: 'Estimated uplift' },
      { label: 'Auto-refine', value: 'Enabled', note: 'Nightly queue' },
      { label: 'Round cadence', value: '14 min', note: 'Average recent pace' },
    ],
    sections: [
      {
        title: 'Strategy engine',
        description: 'Controls framed like a premium iOS finance settings surface.',
        rows: [
          {
            label: 'Balanced mode',
            detail: 'Blends reward odds, thermal load, and wallet availability.',
            value: 'Active',
            tone: 'positive',
          },
          {
            label: 'Fallback route',
            detail: 'Pause miner when device battery trends below target.',
            value: 'Battery safe',
            tone: 'accent',
          },
          {
            label: 'Refine queue',
            detail: 'Mock routing to a post-mine auto-compound workflow.',
            value: 'Queued',
          },
        ],
      },
      {
        title: 'Session notes',
        description: 'Dummy operational context instead of live protocol calls.',
        rows: [
          {
            label: 'Recent reward window',
            detail: 'Last 7 mock rounds trended above the rolling baseline.',
            value: '+11.4%',
            tone: 'positive',
          },
          {
            label: 'Wallet heat budget',
            detail: 'Premium UI would hide complexity and show only clear states.',
            value: 'Stable',
          },
        ],
      },
    ],
  },
  earn: {
    eyebrow: 'Yield desk',
    title: 'Earn',
    subtitle: 'Simple, premium yield views for staking, lending, and rollovers.',
    hero: {
      label: 'Staked ORE',
      value: '132.50 ORE',
      change: '8.3% staking APY',
      detail: 'Liquid staking and lending are presented as calm operating choices.',
      cta: 'Review earn ladder',
      tags: ['stORE', 'Lending', 'Dummy data'],
    },
    metrics: [
      { label: 'Staking share', value: '53%', note: 'Of total ORE' },
      { label: 'Lend venue', value: 'DefiTuna', note: 'Best mock route' },
      { label: 'Auto-roll', value: 'Nightly', note: 'Compounds idle flow' },
    ],
    sections: [
      {
        title: 'Yield ladder',
        description: 'The app treats rates as decision surfaces, not noisy dashboards.',
        rows: [
          {
            label: 'Stake ORE',
            detail: 'Liquid staking route with buyback-oriented upside framing.',
            value: '8.3%',
            tone: 'positive',
          },
          {
            label: 'Lend ORE',
            detail: 'Aggregated lending view with one recommended venue.',
            value: '5.1%',
            tone: 'accent',
          },
          {
            label: 'Auto-roll rewards',
            detail: 'Cycle mining output into the earn stack every evening.',
            value: 'Enabled',
          },
        ],
      },
      {
        title: 'Risk posture',
        description: 'Placeholder content that feels financial, not speculative.',
        rows: [
          {
            label: 'Dry powder',
            detail: 'Liquid ORE held back before the app suggests locking more.',
            value: '38.1 ORE',
          },
          {
            label: 'Target blend',
            detail: 'Preferred split between staking and lending routes.',
            value: '70 / 30',
          },
        ],
      },
    ],
  },
  borrow: {
    eyebrow: 'Borrow flow',
    title: 'Borrow',
    subtitle: 'Clear leverage controls with dummy safety thresholds and rates.',
    hero: {
      label: 'Available headroom',
      value: '$4,260',
      change: '2% current LTV',
      detail: 'Borrow routes stay conservative and readable in this concept build.',
      cta: 'Inspect collateral plan',
      tags: ['Low leverage', 'Dummy data', 'ORE collateral'],
    },
    metrics: [
      { label: 'Best route', value: 'CompoundORE', note: '0% concept lane' },
      { label: 'Refinance check', value: '14 days', note: 'Mock cadence' },
      { label: 'Safety band', value: 'Wide', note: 'No risk prompts' },
    ],
    sections: [
      {
        title: 'Borrow routes',
        description: 'Each option stays understated and easy to compare.',
        rows: [
          {
            label: 'CompoundORE',
            detail: '0% concept route with a clean low-LTV entry position.',
            value: 'Preferred',
            tone: 'positive',
          },
          {
            label: 'Project 0 variable',
            detail: 'Alternative route surfaced as a secondary option only.',
            value: '3.8%',
            tone: 'accent',
          },
          {
            label: 'Scheduled loops',
            detail: 'Re-open positions after yield offsets part of the debt.',
            value: 'Optional',
          },
        ],
      },
      {
        title: 'Collateral notes',
        description: 'Dummy product language that avoids pretending to be live finance.',
        rows: [
          {
            label: 'Protected reserve',
            detail: 'ORE excluded from collateral so the user retains flexibility.',
            value: '42 ORE',
          },
          {
            label: 'Suggested limit',
            detail: 'Soft ceiling before the app would ask for another review.',
            value: '$2,100',
            tone: 'warning',
          },
        ],
      },
    ],
  },
  privacy: {
    eyebrow: 'Private balance',
    title: 'Privacy',
    subtitle: 'Shielded routes, transfers, and spending modes in a restrained UI.',
    hero: {
      label: 'Shielded ORE',
      value: '24.00 ORE',
      change: 'Ready to spend privately',
      detail: 'Mock privacy actions are framed like premium cash management features.',
      cta: 'Review shielded routes',
      tags: ['Shielded', 'Private send', 'Dummy data'],
    },
    metrics: [
      { label: 'Private sends', value: '3 queued', note: 'Demo activity' },
      { label: 'Spend mode', value: 'Manual', note: 'No auto routing yet' },
      { label: 'Public fallback', value: 'Available', note: 'One tap exit' },
    ],
    sections: [
      {
        title: 'Shielded flow',
        description: 'The concept keeps privacy actions legible and low-friction.',
        rows: [
          {
            label: 'Deposit to privacy pool',
            detail: 'Move public ORE into a shielded balance before transferring.',
            value: 'Open',
            tone: 'accent',
          },
          {
            label: 'Private transfer',
            detail: 'Send from the shielded balance with reduced visible history.',
            value: 'Ready',
            tone: 'positive',
          },
          {
            label: 'Withdraw to vault',
            detail: 'Return funds to a public balance without leaving this tab.',
            value: '1 tap',
          },
        ],
      },
      {
        title: 'Privacy defaults',
        description: 'Settings expressed as product states rather than technical jargon.',
        rows: [
          {
            label: 'Preferred transfer mode',
            detail: 'Use shielded routes when a compatible destination is detected.',
            value: 'Ask first',
          },
          {
            label: 'Receipt detail',
            detail: 'Mask values in recent activity previews on shared devices.',
            value: 'Hidden',
            tone: 'positive',
          },
        ],
      },
    ],
  },
  learn: {
    eyebrow: 'Editorial feed',
    title: 'Learn',
    subtitle: 'An ORE knowledge surface with short, premium explainer modules.',
    hero: {
      label: 'New this week',
      value: '3 briefs',
      change: 'Supply, mining, privacy',
      detail: 'Content is dummy editorial copy designed to sit inside the wallet.',
      cta: "Open today's brief",
      tags: ['Editorial', 'Dummy data', 'In-app learning'],
    },
    metrics: [
      { label: 'Reading time', value: '6 min', note: 'Across new briefs' },
      { label: 'Last updated', value: 'Today', note: 'Mock refresh time' },
      { label: 'Saved items', value: '4', note: 'Pinned for later' },
    ],
    sections: [
      {
        title: 'Featured briefs',
        description: 'Short-form learning modules that feel native to the product.',
        rows: [
          {
            label: 'ORE supply posture',
            detail: 'A concise explainer on issuance, circulation, and ownership share.',
            value: '4 min',
          },
          {
            label: 'Yield stack design',
            detail: 'How mining, staking, and lending can layer without crowding the UI.',
            value: '2 min',
          },
          {
            label: 'Private spending modes',
            detail: 'A product-first overview of shielded versus public flow selection.',
            value: '3 min',
          },
        ],
      },
      {
        title: 'Saved notes',
        description: 'Educational states that make the app feel complete before APIs exist.',
        rows: [
          {
            label: 'Glossary',
            detail: 'Plain-language definitions for terms surfaced elsewhere in the app.',
            value: 'Pinned',
            tone: 'accent',
          },
          {
            label: 'Risk reminders',
            detail: 'Short reference cards the user can revisit before borrowing.',
            value: '2 cards',
          },
        ],
      },
    ],
  },
  settings: {
    eyebrow: 'Device and vault',
    title: 'Settings',
    subtitle: 'Security, appearance, and preferences with a premium native tone.',
    hero: {
      label: 'Protection profile',
      value: '7 safeguards',
      change: 'Face ID + passkey ready',
      detail: 'All controls here are placeholders designed to show product polish.',
      cta: 'Review security setup',
      tags: ['Dummy data', 'Face ID', 'Passkeys'],
    },
    metrics: [
      { label: 'Unlock mode', value: 'Biometric', note: 'Primary method' },
      { label: 'Session timeout', value: '3 min', note: 'Idle lock' },
      { label: 'Appearance', value: 'Dark', note: 'ORE theme' },
    ],
    sections: [
      {
        title: 'Security controls',
        description: 'Essential preferences surfaced with calm hierarchy and clear wording.',
        rows: [
          {
            label: 'Face ID for sends',
            detail: 'Require biometrics before approving send or borrow actions.',
            value: 'On',
            tone: 'positive',
          },
          {
            label: 'Passkey recovery',
            detail: 'Offer a consumer-grade recovery path before seed phrase export.',
            value: 'Enabled',
            tone: 'accent',
          },
          {
            label: 'Privacy mode default',
            detail: 'Prefer shielded routes when a private destination is supported.',
            value: 'Ask first',
          },
        ],
      },
      {
        title: 'App preferences',
        description: 'Product defaults that round out the concept without backend work.',
        rows: [
          {
            label: 'ORE fee settlement',
            detail: 'Mock toggle for settling app-level fees in ORE.',
            value: 'On',
            tone: 'positive',
          },
          {
            label: 'Learning reminders',
            detail: 'Suggest new explainers when mining or borrowing changes materially.',
            value: 'Weekly',
          },
        ],
      },
    ],
  },
};

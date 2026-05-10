import type { ValueTone } from './dummy-data';

export type SpendMode = 'debit' | 'credit';

export type SpendTransaction = {
  merchant: string;
  detail: string;
  amount: string;
  tone?: ValueTone;
};

export type SpendExperience = {
  label: string;
  spendableBalance: string;
  spendableLabel: string;
  source: string;
  footnote: string;
  ledgerDescription: string;
  transactions: SpendTransaction[];
};

export const cardSpendData = {
  title: 'Card & Spend',
  subtitle:
    'A future ORE spending product concept with a virtual card, modeled spendable balance, and two ways to frame everyday purchases.',
  eyebrow: 'Coming soon',
  card: {
    name: 'ORE Reserve Card',
    typeLabel: 'Virtual card mockup',
    networkLabel: 'ORE PAY',
    holder: 'AVERY COLE',
    last4: '2148',
    expiry: '09/29',
  },
  modes: {
    debit: {
      label: 'Debit-style concept',
      spendableBalance: '$1,248.64',
      spendableLabel: 'Spendable now',
      source: 'Modeled from liquid ORE reserve plus settled cash buffer.',
      footnote: 'Uses the spend buffer first before touching the broader reserve stack.',
      ledgerDescription: 'Recent card activity funded from the modeled debit-style spend buffer.',
      transactions: [
        {
          merchant: 'Whole Foods',
          detail: 'Groceries - Today, 6:42 PM',
          amount: '-$84.17',
        },
        {
          merchant: 'Uber',
          detail: 'Local transport - Today, 3:18 PM',
          amount: '-$21.40',
        },
        {
          merchant: 'Apple',
          detail: 'App Store renewal - Yesterday',
          amount: '-$9.99',
        },
      ] satisfies SpendTransaction[],
    },
    credit: {
      label: 'Credit-style concept',
      spendableBalance: '$3,860.00',
      spendableLabel: 'Available credit',
      source: 'Modeled line secured against ORE collateral with conservative utilization.',
      footnote: 'Designed as a reserve-backed spending line rather than a revolving mass-market credit product.',
      ledgerDescription: 'Modeled card ledger for a future credit line against ORE.',
      transactions: [
        {
          merchant: 'Delta',
          detail: 'Flight hold - Pending settlement',
          amount: '-$428.60',
          tone: 'accent',
        },
        {
          merchant: 'Soho House',
          detail: 'Member dining - Yesterday',
          amount: '-$72.00',
        },
        {
          merchant: 'Notion',
          detail: 'Workspace subscription - This week',
          amount: '-$12.00',
          tone: 'positive',
        },
      ] satisfies SpendTransaction[],
    },
  } satisfies Record<SpendMode, SpendExperience>,
  creditConcept: {
    title: 'Credit line against ORE',
    detail:
      'A future spend product could draw against a low-LTV ORE reserve so users can preserve long-term exposure while still covering short-term expenses.',
    lineAvailable: '$3,860 modeled line',
    collateralPosture: '21% modeled utilization',
    rateNote: 'Reserve-backed credit concept only',
    disclaimer:
      'No issuer, underwriting system, card processor, or lending SDK is connected. This section is UI-only and uses dummy numbers.',
  },
} as const;

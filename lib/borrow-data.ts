import type { ValueTone } from './dummy-data';

export type BorrowProduct = {
  title: string;
  detail: string;
  rate: string;
  maxLtv: string;
  idealFor: string;
  edge: string;
  tone?: 'default' | 'accent';
};

export type BorrowOpportunity = {
  provider: string;
  product: string;
  rate: string;
  maxLtv: string;
  note: string;
  riskTag: string;
  tone?: ValueTone;
};

export type LendingRate = {
  title: string;
  detail: string;
  value: string;
  tone?: ValueTone;
};

export type BorrowPreset = {
  label: string;
  amount: string;
  ltv: string;
  liquidationPrice: string;
  healthFactor: string;
  carry: string;
  remainingCredit: string;
  safetyBand: string;
  utilizationNote: string;
};

export type BorrowCalculatorData = {
  helper: string;
  collateralValue: string;
  initialPresetIndex: number;
  presets: readonly BorrowPreset[];
};

export type BorrowRiskNote = {
  title: string;
  body: string;
  tag: string;
  tone?: 'default' | 'accent';
};

export const borrowData = {
  greeting: 'Borrow Against ORE',
  title: 'Turn ORE into credit capacity without turning the app into a leverage dashboard.',
  subtitle:
    'This is a dummy credit desk built for clarity: conservative collateral, readable structures, and one place to compare borrowing or lending routes.',
  dashboard: {
    status: 'Conservative collateral posture',
    availableCredit: '$5,260',
    ltv: '21%',
    healthFactor: '4.8',
    collateralPosted: '146.8 ORE',
    collateralValue: '$18,420',
    liquidationBuffer: '$11,940',
    safetyBand: 'Modeled safe band up to 35% LTV',
    helper:
      'The screen prioritizes headroom, liquidation distance, and plain-English structure instead of making leverage look effortless.',
  },
  actions: {
    primary: 'Borrow',
    secondary: 'Lend',
  },
  products: [
    {
      title: 'Standard borrow',
      detail:
        'A variable-rate credit line with liquidation thresholds. Best when the user wants flexible borrowing and is willing to monitor collateral more actively.',
      rate: '4.9% variable',
      maxLtv: 'Up to 45% LTV',
      idealFor: 'Short-duration liquidity with active monitoring',
      edge: 'Most flexible',
      tone: 'default',
    },
    {
      title: '0% reserve line concept',
      detail:
        'A non-liquidation style concept for low-LTV treasury access. The tradeoff is tighter structure, scheduled review points, and a lower borrowing ceiling.',
      rate: '0% explicit rate',
      maxLtv: 'Up to 22% LTV',
      idealFor: 'Treasury access with wider downside buffers',
      edge: 'Calmest structure',
      tone: 'accent',
    },
  ] satisfies BorrowProduct[],
  opportunities: [
    {
      provider: 'Atlas Reserve',
      product: 'Variable ORE-backed credit line',
      rate: '4.9% APR',
      maxLtv: '45% max LTV',
      note: 'Deepest dummy borrowing room with standard liquidation rules and daily repricing.',
      riskTag: 'Featured',
      tone: 'accent',
    },
    {
      provider: 'Northlight Credit',
      product: 'Conservative stablecoin advance',
      rate: '4.2% APR',
      maxLtv: '38% max LTV',
      note: 'Lower dummy capacity, but cleaner collateral policy and simpler fee structure.',
      riskTag: 'Lower friction',
      tone: 'positive',
    },
    {
      provider: 'Canopy Treasury',
      product: '0% reserve line concept',
      rate: '0% + spread',
      maxLtv: '22% max LTV',
      note: 'Non-liquidation style concept with scheduled settlement windows instead of open-ended borrowing.',
      riskTag: 'Structure matters',
      tone: 'warning',
    },
  ] satisfies BorrowOpportunity[],
  lending: {
    headline:
      'When borrowing demand is low, the same reserve screen can surface quieter lending routes for idle ORE.',
    rates: [
      {
        title: 'Treasury pool',
        detail: 'A conservative dummy lending lane designed for users who prioritize easier exits.',
        value: '4.1% APY',
        tone: 'positive',
      },
      {
        title: 'Rolling term desk',
        detail: 'A mid-duration route with slightly better carry and tighter withdrawal windows.',
        value: '5.0% APY',
        tone: 'accent',
      },
      {
        title: 'Institutional lane',
        detail: 'Lower dummy yield with stronger reserve coverage and less rate volatility.',
        value: '3.5% APY',
      },
    ] satisfies LendingRate[],
  },
  calculator: {
    helper:
      'Move through preset loan sizes to see how dummy LTV and health shift. This is a planning surface only, with no live collateral data or execution.',
    collateralValue: '$18,420 in posted ORE collateral',
    initialPresetIndex: 2,
    presets: [
      {
        label: '$1.0k',
        amount: '$1,000',
        ltv: '5%',
        liquidationPrice: '$9.73 / ORE',
        healthFactor: '9.2',
        carry: '$4.10 / month',
        remainingCredit: '$4,260',
        safetyBand: 'Very conservative',
        utilizationNote: 'Large reserve buffer if ORE drifts lower.',
      },
      {
        label: '$2.2k',
        amount: '$2,200',
        ltv: '12%',
        liquidationPrice: '$21.41 / ORE',
        healthFactor: '6.3',
        carry: '$9.10 / month',
        remainingCredit: '$3,060',
        safetyBand: 'Comfortable',
        utilizationNote: 'Still leaves wide dummy liquidation distance.',
      },
      {
        label: '$3.4k',
        amount: '$3,400',
        ltv: '18%',
        liquidationPrice: '$33.09 / ORE',
        healthFactor: '4.7',
        carry: '$14.20 / month',
        remainingCredit: '$1,860',
        safetyBand: 'Balanced',
        utilizationNote: 'A middle ground between credit access and downside buffer.',
      },
      {
        label: '$4.5k',
        amount: '$4,500',
        ltv: '24%',
        liquidationPrice: '$43.79 / ORE',
        healthFactor: '3.6',
        carry: '$18.70 / month',
        remainingCredit: '$760',
        safetyBand: 'Closer watch',
        utilizationNote: 'Starts demanding more frequent collateral review.',
      },
      {
        label: '$5.2k',
        amount: '$5,200',
        ltv: '29%',
        liquidationPrice: '$50.60 / ORE',
        healthFactor: '3.0',
        carry: '$21.60 / month',
        remainingCredit: '$60',
        safetyBand: 'Near limit',
        utilizationNote: 'Little room left before the concept would suggest stopping.',
      },
    ] satisfies BorrowPreset[],
  } satisfies BorrowCalculatorData,
  education: {
    title: 'Risk becomes manageable only when the failure modes stay visible.',
    body:
      'Borrowing against an ORE reserve can be useful, but a polished interface does not remove collateral volatility, structure risk, or the temptation to run too close to the edge.',
    notes: [
      {
        title: 'ORE price moves faster than comfort can.',
        body:
          'Even with a healthy starting LTV, collateral-backed borrowing should be sized so the user still has room when volatility compresses the buffer.',
        tag: 'Collateral risk',
        tone: 'accent',
      },
      {
        title: '0% concepts still have constraints.',
        body:
          'A non-liquidation design may avoid floating interest, but it usually replaces that with lower caps, fixed windows, or settlement rules that still deserve attention.',
        tag: 'Structure risk',
      },
      {
        title: 'Lending can offset cost, but adds its own exposure.',
        body:
          'Parking idle ORE in a lending lane may improve carry, but it also introduces provider risk and can reduce how quickly collateral can be repositioned.',
        tag: 'Counterparty risk',
      },
    ] satisfies BorrowRiskNote[],
    footer:
      'All rates, providers, thresholds, and borrowing outcomes on this screen are dummy placeholders for design exploration only.',
  },
} as const;

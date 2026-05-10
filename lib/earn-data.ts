import type { ComponentProps } from 'react';

import type { Ionicons } from '@expo/vector-icons';
import type { ValueTone } from './dummy-data';

export type EarnAction = {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export type ApyCard = {
  title: string;
  value: string;
  detail: string;
  riskTag: string;
  tone?: ValueTone;
};

export type LendingOpportunity = {
  title: string;
  detail: string;
  value: string;
  riskTag: string;
  tone?: ValueTone;
};

export type YieldComparison = {
  title: string;
  apy: number;
  subtitle: string;
  riskTag: string;
  tone?: ValueTone;
};

export const earnData = {
  greeting: 'Earn ORE',
  title: 'Stake, Lend, and Loop Your Ore',
  overview: {
    stakedOre: '132.50 ORE',
    stakingApy: '8.3% APY',
    claimableRewards: '1.28 ORE',
    stOreBalance: '121.70 stORE',
    stOreRate: '1 stORE = 1.089 ORE',
    helper:
      'ORE can be routed into native staking or a liquid staking token path depending on how the user wants rewards handled.',
  },
  actions: [
    { label: 'Stake', icon: 'add' },
    { label: 'Unstake', icon: 'remove' },
    { label: 'Claim', icon: 'download' },
  ] satisfies EarnAction[],
  apyCards: [
    {
      title: 'Native staking',
      value: '8.3% APY',
      detail: 'Baseline ORE staking yield inside the core reserve strategy.',
      riskTag: 'Lower protocol risk',
      tone: 'positive',
    },
    {
      title: 'Auto-compound',
      value: '10.1% APY',
      detail: 'Dummy uplift assuming rewards are automatically routed through the selected staking path.',
      riskTag: 'Auto-compounds',
      tone: 'accent',
    },
    {
      title: 'Best lending lane',
      value: '5.4% APY',
      detail: 'Current leading dummy route from external ORE-compatible lending venues.',
      riskTag: 'Counterparty risk',
      tone: 'warning',
    },
  ] satisfies ApyCard[],
  autoCompound: {
    cadence: 'Every 24 hours',
    destination: 'stORE + native staking ladder',
    projectedUplift: '+1.8% APY over base staking',
    helper:
      'Auto-compound is a product convenience layer, not a guaranteed performance upgrade. It can improve discipline, but it still adds execution assumptions.',
  },
  lending: [
    {
      title: 'DefiTuna ORE market',
      detail: 'Highest current dummy APY with moderate protocol and utilization risk.',
      value: '5.4% APY',
      riskTag: 'Medium risk',
      tone: 'accent',
    },
    {
      title: 'Project 0 reserve lane',
      detail: 'Lower dummy yield with simpler terms and stronger liquidity posture.',
      value: '4.2% APY',
      riskTag: 'Lower risk',
      tone: 'positive',
    },
    {
      title: 'Omnipair stORE/ORE loop',
      detail:
        'Uses Omnipair\'s stORE/ORE market concept: deposit stORE as collateral, borrow ORE, then loop the position.',
      value: '6.0% est.',
      riskTag: 'Advanced risk',
      tone: 'warning',
    },
  ] satisfies LendingOpportunity[],
  comparison: [
    {
      title: 'Native staking',
      apy: 8.3,
      subtitle: 'Core baseline for long-horizon ORE holders.',
      riskTag: 'Low',
      tone: 'positive',
    },
    {
      title: 'Auto-compound',
      apy: 10.1,
      subtitle: 'Higher dummy outcome if compounding cadence holds.',
      riskTag: 'Medium',
      tone: 'accent',
    },
    {
      title: 'Lend ORE',
      apy: 5.4,
      subtitle: 'External route with rate sensitivity and counterparty risk.',
      riskTag: 'Medium',
    },
    {
      title: 'Omnipair stORE loop',
      apy: 6.0,
      subtitle: 'stORE collateral backs borrowed ORE for a looped position.',
      riskTag: 'Higher',
      tone: 'warning',
    },
  ] satisfies YieldComparison[],
} as const;

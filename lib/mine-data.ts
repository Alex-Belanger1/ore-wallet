import type { ComponentProps } from 'react';

import type { Ionicons } from '@expo/vector-icons';
import type { ValueTone } from './dummy-data';

export type MineAction = {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export type MiningStrategy = {
  title: string;
  detail: string;
  edge: string;
  tone?: ValueTone;
};

export type MiningHistoryItem = {
  title: string;
  detail: string;
  value: string;
  tone?: ValueTone;
};

export const mineData = {
  greeting: 'Mine ORE',
  title: 'Current round is live.',
  subtitle:
    'A focused mining workspace with dummy timing, balances, and strategy guidance.',
  status: {
    label: 'Mining status',
    state: 'Active round',
    round: 'Round #2,745,994',
    timer: '00:37',
    timingNote: '37 seconds remaining in this simulated one-minute round',
    successOdds: '18%',
    estimatedApy: '14.8% APY',
    mode: 'Balanced +EV',
  },
  balances: {
    refined: '41.82 ORE',
    refinedNote: 'Ready to transfer, stake, or use as collateral',
    unrefined: '6.44 ORE',
    unrefinedNote: 'Queued for future refine windows',
  },
  actions: [
    { label: 'Start Mining', icon: 'play' },
    { label: 'Auto-Mine', icon: 'flash' },
    { label: 'Refine', icon: 'diamond' },
  ] satisfies MineAction[],
  strategies: [
    {
      title: 'Manual mining',
      detail: 'User starts rounds by hand and only refines when the setup feels right.',
      edge: 'Most control',
      tone: 'accent',
    },
    {
      title: 'Auto-mining',
      detail:
        'Let the app chain rounds together with simple guardrails for cadence and battery posture.',
      edge: 'Low effort',
      tone: 'positive',
    },
    {
      title: '+EV strategy',
      detail:
        'A dummy model that aims for the cleanest expected value windows based on reward odds and refine pressure.',
      edge: 'Best simulated edge',
      tone: 'warning',
    },
  ] satisfies MiningStrategy[],
  history: [
    {
      title: 'Round reward settled',
      detail: 'Balanced strategy | Today, 7:02 PM',
      value: '+0.0412 ORE',
      tone: 'positive',
    },
    {
      title: 'Refined unrefined ORE',
      detail: 'Queued conversion window | Today, 3:18 PM',
      value: '+1.82 ORE',
      tone: 'accent',
    },
    {
      title: 'Auto-mine batch completed',
      detail: '6 consecutive rounds | Today, 12:42 PM',
      value: '+0.1186 ORE',
      tone: 'positive',
    },
    {
      title: 'Round expired',
      detail: 'Missed a higher-difficulty window | Yesterday',
      value: 'No reward',
    },
  ] satisfies MiningHistoryItem[],
  education: {
    title: 'Mining is not passive cash flow.',
    body:
      'ORE mining should be understood as a probabilistic process with operational tradeoffs. Success windows, refine timing, device availability, and strategy selection all affect outcomes.',
    bullets: [
      {
        label: 'Refined vs unrefined',
        detail:
          'Unrefined balances may look larger in bursts, but only refined ORE behaves like liquid portfolio inventory.',
      },
      {
        label: 'APY is only an estimate',
        detail:
          'The number shown here is dummy and should still be thought of as strategy-dependent, not guaranteed.',
      },
      {
        label: 'Auto-mode changes feel, not certainty',
        detail:
          'Automation may improve discipline, but it does not remove round-to-round variance or execution risk.',
      },
    ],
  },
} as const;

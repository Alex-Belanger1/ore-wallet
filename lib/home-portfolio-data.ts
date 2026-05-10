import type { ComponentProps } from 'react';

import type { Ionicons } from '@expo/vector-icons';
import type { ValueTone } from './dummy-data';

export type QuickAction = {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export type Holding = {
  asset: string;
  balance: string;
  value: string;
  tone?: ValueTone;
};

export type ActivityItem = {
  title: string;
  detail: string;
  value: string;
  tone?: ValueTone;
};

export const homePortfolioData = {
  greeting: 'Good evening',
  userName: 'Avery',
  portfolioValue: '$12,486.42',
  oreBalance: '248.84 ORE',
  todayChange: '+$412.18',
  todayChangePercent: '+3.42%',
  receive: {
    handle: '@avery.ore',
    solAddress: '7A4NqM9vfrD9H8pBvLtWmY3RbkHgA6wW7vP2vk',
  },
  quickActions: [
    { label: 'Buy', icon: 'add' },
    { label: 'Send', icon: 'arrow-up' },
    { label: 'Receive', icon: 'arrow-down' },
    { label: 'Swap', icon: 'swap-horizontal' },
  ] satisfies QuickAction[],
  holdings: [
    {
      asset: 'ORE',
      balance: '248.84 ORE',
      value: '$9,931.20',
      tone: 'accent',
    },
    {
      asset: 'SOL',
      balance: '18.22 SOL',
      value: '$1,696.68',
    },
    {
      asset: 'JTO',
      balance: '92.5 JTO',
      value: '$858.54',
    },
  ] satisfies Holding[],
  supplyInsight: {
    circulatingSupply: '446,089 ORE',
    totalSupply: '3,000,000 ORE',
    estimatedOwnership: '0.0558% of circulating',
  },
  recentActivity: [
    {
      title: 'Bought ORE',
      detail: 'Apple Pay top-up | Today, 6:14 PM',
      value: '+6.57 ORE',
      tone: 'positive',
    },
    {
      title: 'Mining reward settled',
      detail: 'Balanced mining strategy | Today, 1:08 PM',
      value: '+0.0412 ORE',
      tone: 'positive',
    },
    {
      title: 'Moved to privacy pool',
      detail: 'Shielded balance top-up | Yesterday',
      value: '-12.00 ORE',
    },
    {
      title: 'Staked ORE',
      detail: 'Earn ladder allocation | Yesterday',
      value: '-18.50 ORE',
      tone: 'accent',
    },
  ] satisfies ActivityItem[],
} as const;

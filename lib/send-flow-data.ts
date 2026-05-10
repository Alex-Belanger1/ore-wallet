export type SendKind = 'standard' | 'private';

export type SendFlowCopy = {
  title: string;
  shortLabel: string;
  actionSheetDescription: string;
  introDescription: string;
  fee: string;
  arrival: string;
  route: string;
  visibility: string;
  successNote: string;
  totalSteps: number;
};

export const oreReferencePriceUsd = 39.9;

export const sendAmountPresets = ['5', '12.5', '25'] as const;

export const sendRecipientSuggestions = [
  {
    value: '@maya.reserve',
    title: '@maya.reserve',
    detail: 'Saved username | Treasury partner account',
  },
  {
    value: '7A4NfJm8Qv7qVj1r5i9n3h2sLp2v4MxT8dWkP2vk',
    title: '7A4N...P2vk',
    detail: 'Recent wallet | Hardware vault transfer',
  },
  {
    value: '@ore.longterm',
    title: '@ore.longterm',
    detail: 'Saved username | Long-hold allocation sleeve',
  },
] as const;

export const sendFlowCopy: Record<SendKind, SendFlowCopy> = {
  standard: {
    title: 'Standard Send',
    shortLabel: 'Standard demo',
    actionSheetDescription: 'Visible wallet transfer for everyday payments and routine movement.',
    introDescription:
      'Direct wallet transfer for normal movement between addresses or saved usernames.',
    fee: '0.00012 ORE network fee',
    arrival: 'Usually under 5 seconds',
    route: 'Direct settlement on the visible wallet rail',
    visibility: 'Recipient and transfer metadata behave like a standard wallet send',
    successNote: 'Funds appear as a normal transfer in this UI-only preview.',
    totalSteps: 4,
  },
  private: {
    title: 'Private Send',
    shortLabel: 'Private demo',
    actionSheetDescription:
      'Demo-only shielded route with an extra privacy step before final review.',
    introDescription:
      'A privacy-first send path that adds a disclosure step before this demo transfer is reviewed.',
    fee: '0.00480 ORE privacy relay fee',
    arrival: 'Usually under 45 seconds',
    route: 'Deposit, shield, and deliver through a simulated privacy pool',
    visibility: 'Recipient sees a delivered balance, not a direct transparent transfer path',
    successNote: 'This preview simulates private delivery without connecting any real service.',
    totalSteps: 5,
  },
};

export function formatAmountUsd(amount: string) {
  const parsed = Number.parseFloat(amount);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return '--';
  }

  return `$${(parsed * oreReferencePriceUsd).toFixed(2)}`;
}


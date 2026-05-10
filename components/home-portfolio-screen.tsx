import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreSpacing, oreTypography } from '../constants/theme';
import { cardSpendData } from '../lib/card-spend-data';
import { homePortfolioData } from '../lib/home-portfolio-data';
import { useSendFlow } from '../lib/send-flow-store';
import { ActionSheet } from './action-sheet';
import { OreMark } from './ore-mark';
import { Pill } from './pill';
import { PrimaryButton } from './primary-button';
import { QuickActionButton } from './quick-action-button';
import { ReceiveSheet } from './receive-sheet';
import { Screen } from './screen';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

export function HomePortfolioScreen() {
  const data = homePortfolioData;
  const router = useRouter();
  const { startFlow } = useSendFlow();
  const [sendSheetVisible, setSendSheetVisible] = useState(false);
  const [receiveSheetVisible, setReceiveSheetVisible] = useState(false);

  const handleQuickActionPress = (label: string) => {
    if (label === 'Send') {
      setSendSheetVisible(true);
    }

    if (label === 'Receive') {
      setReceiveSheetVisible(true);
    }
  };

  const beginSendFlow = (kind: 'standard' | 'private') => {
    setSendSheetVisible(false);
    startFlow(kind);
    router.push(kind === 'standard' ? '/(send)/standard-recipient' : '/(send)/private-recipient');
  };

  return (
    <Screen>
      <SectionHeader
        eyebrow={data.greeting}
        title={`${data.userName}.`}
        description="Your ORE-first reserve account is calm, liquid, and ready to act."
        trailing={<OreMark />}
        variant="hero"
      />

      <StatCard variant="hero">
        <View style={styles.heroHeader}>
          <Text style={styles.heroEyebrow}>Total portfolio value</Text>
        </View>
        <Text style={styles.heroValue}>{data.portfolioValue}</Text>
        <View style={styles.heroMetrics}>
          <View style={styles.heroMetricBlock}>
            <Text style={styles.heroMetricLabel}>ORE balance</Text>
            <Text style={styles.heroMetricValue}>{data.oreBalance}</Text>
          </View>
          <View style={styles.heroMetricBlock}>
            <Text style={styles.heroMetricLabel}>Today's change</Text>
            <Text style={[styles.heroMetricValue, styles.heroChange]}>
              {data.todayChange} {data.todayChangePercent}
            </Text>
          </View>
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <View style={styles.payHeader}>
          <View style={styles.payCopy}>
            <Text style={styles.payEyebrow}>Ore Pay</Text>
            <Text style={styles.payTitle}>Card & Spend</Text>
            <Text style={styles.payDetail}>
              {cardSpendData.modes.debit.spendableLabel}: {cardSpendData.modes.debit.spendableBalance}
            </Text>
            <Text style={styles.payDetail}>
              Credit line: {cardSpendData.modes.credit.spendableBalance}
            </Text>
          </View>
          <Pill label="Coming soon" tone="accent" />
        </View>
        <PrimaryButton label="Open Ore Pay" onPress={() => router.push('/card-spend')} />
      </StatCard>

      <View style={styles.actionGrid}>
        {data.quickActions.map((action) => (
          <QuickActionButton
            key={action.label}
            label={action.label}
            icon={action.icon}
            onPress={() => handleQuickActionPress(action.label)}
          />
        ))}
      </View>

      <StatCard>
        <SectionHeader title="Holdings" />
        <View>
          {data.holdings.map((holding, index) => (
            <View
              key={holding.asset}
              style={[
                styles.holdingRow,
                index < data.holdings.length - 1 ? styles.holdingDivider : null,
              ]}>
              <Text style={[styles.holdingBalance, holding.tone ? styles.holdingAccent : null]}>
                {holding.balance}
              </Text>
              <Text style={styles.holdingValue}>{holding.value}</Text>
            </View>
          ))}
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader title="ORE supply insight" />
        <View>
          <TokenRow
            label="Circulating supply"
            detail="Estimated liquid ORE currently moving through the network."
            value={data.supplyInsight.circulatingSupply}
          />
          <TokenRow
            label="Total supply"
            detail="Long-run maximum issuance used for higher-level ownership framing."
            value={data.supplyInsight.totalSupply}
          />
          <TokenRow
            label="Estimated ownership"
            detail="Your current ORE balance as a rough share of circulating supply."
            value={data.supplyInsight.estimatedOwnership}
            tone="accent"
            isLast
          />
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          title="Recent activity"
          description="Latest dummy transactions across the wallet, mining, and privacy flows."
        />
        <View>
          {data.recentActivity.map((activity, index) => (
            <TokenRow
              key={`${activity.title}-${index}`}
              label={activity.title}
              detail={activity.detail}
              value={activity.value}
              tone={activity.tone}
              isLast={index === data.recentActivity.length - 1}
            />
          ))}
        </View>
      </StatCard>

      <ActionSheet
        visible={sendSheetVisible}
        title="Choose a send path"
        description="Standard send is the direct wallet route. Private send adds one extra explanation step before the final review."
        onClose={() => setSendSheetVisible(false)}
        actions={[
          {
            label: 'Standard Send',
            description: 'Visible wallet transfer for everyday movement between addresses or usernames.',
            icon: 'paper-plane-outline',
            onPress: () => beginSendFlow('standard'),
          },
          {
            label: 'Private Send',
            description: 'Demo-only shielded route with an added privacy explanation before review.',
            icon: 'shield-checkmark-outline',
            onPress: () => beginSendFlow('private'),
          },
        ]}
      />
      <ReceiveSheet
        visible={receiveSheetVisible}
        address={data.receive.solAddress}
        handle={data.receive.handle}
        onClose={() => setReceiveSheetVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: oreSpacing.sm,
  },
  heroEyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  heroValue: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  heroMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.lg,
  },
  heroMetricBlock: {
    flexGrow: 1,
    flexBasis: 180,
    gap: oreSpacing.xs - 1,
  },
  heroMetricLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  heroMetricValue: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  heroChange: {
    color: oreColors.positive,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  holdingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
    paddingVertical: oreSpacing.md,
  },
  holdingDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  holdingBalance: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '800',
  },
  holdingAccent: {
    color: oreColors.accentStrong,
  },
  holdingValue: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '800',
    textAlign: 'right',
  },
  payHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.md,
    flexWrap: 'wrap',
  },
  payCopy: {
    flex: 1,
    minWidth: 220,
    gap: oreSpacing.xs - 1,
  },
  payEyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  payTitle: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  payDetail: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
});

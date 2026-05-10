import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreSpacing, oreTypography } from '../constants/theme';
import { earnData } from '../lib/earn-data';
import { ActionSheet } from './action-sheet';
import { CompareYields } from './compare-yields';
import { Pill } from './pill';
import { QuickActionButton } from './quick-action-button';
import { Screen } from './screen';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

export function EarnScreenView() {
  const data = earnData;
  const [stakeSheetVisible, setStakeSheetVisible] = useState(false);

  return (
    <Screen>
      <SectionHeader
        eyebrow={data.greeting}
        title={data.title}
        variant="hero"
      />

      <StatCard variant="hero">
        <View style={styles.heroHeader}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>ORE staking overview</Text>
            <Text style={styles.heroValue}>{data.overview.stakedOre}</Text>
            <Text style={styles.heroHelper}>{data.overview.helper}</Text>
          </View>
          <View style={styles.heroMeta}>
            <Pill label={data.overview.stakingApy} tone="accent" />
            <Text style={styles.heroMetaLabel}>Claimable {data.overview.claimableRewards}</Text>
          </View>
        </View>

      </StatCard>

      <View style={styles.actionGrid}>
        {data.actions.map((action) => (
          <QuickActionButton
            key={action.label}
            label={action.label}
            icon={action.icon}
            onPress={() => {
              if (action.label === 'Stake') {
                setStakeSheetVisible(true);
              }
            }}
          />
        ))}
      </View>

      <View style={styles.apyGrid}>
        {data.apyCards.map((card) => (
          <StatCard
            key={card.title}
            variant={card.tone === 'accent' ? 'hero' : 'subtle'}
            eyebrow={card.title}
            value={card.value}
            detail={card.detail}
            style={styles.apyCard}>
            <Pill
              label={card.riskTag}
              tone={card.tone === 'accent' ? 'accent' : 'default'}
            />
          </StatCard>
        ))}
      </View>

      <StatCard variant="subtle">
        <SectionHeader
          title="Auto-compound"
          description={data.autoCompound.helper}
        />
        <View>
          <TokenRow
            label="Cadence"
            detail="When the wallet would sweep and restake claimable rewards."
            value={data.autoCompound.cadence}
          />
          <TokenRow
            label="Destination"
            detail="Where dummy rewards are routed after a compound cycle."
            value={data.autoCompound.destination}
          />
          <TokenRow
            label="Projected uplift"
            detail="Expected improvement over baseline staking under clean execution."
            value={data.autoCompound.projectedUplift}
            tone="positive"
            isLast
          />
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          title="Lending opportunities"
          description="Secondary yield routes for users who want more than pure staking exposure."
        />
        <View>
          {data.lending.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.lendingRow,
                index < data.lending.length - 1 ? styles.lendingDivider : null,
              ]}>
              <View style={styles.lendingCopy}>
                <Text style={styles.lendingTitle}>{item.title}</Text>
                <Text style={styles.lendingDetail}>{item.detail}</Text>
                <View style={styles.lendingTags}>
                  <Pill
                    label={item.riskTag}
                    tone={item.tone === 'accent' ? 'accent' : 'default'}
                  />
                </View>
              </View>
              <Text style={[styles.lendingValue, item.tone ? styles[`tone_${item.tone}`] : null]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </StatCard>

      <StatCard variant="hero">
        <SectionHeader
          title="Loop stORE"
          description="A future route for users who want to use Omnipair's stORE/ORE market to place stORE as collateral and borrow ORE back into the position."
          trailing={<Pill label="Omnipair concept" tone="accent" />}
        />
        <View>
          <TokenRow
            label="Market"
            detail="Placeholder venue for the stORE collateral and ORE borrow loop."
            value="Omnipair stORE/ORE"
          />
          <TokenRow
            label="Collateral"
            detail="The user posts stORE instead of unstaking the wallet position."
            value="stORE"
            tone="accent"
          />
          <TokenRow
            label="Borrowed asset"
            detail="Borrowed ORE can be routed back through the loop in this demo concept."
            value="ORE"
            isLast
          />
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Compare yields"
          description="A clean dummy comparison between staking, compounding, and external routes."
        />
        <CompareYields items={data.comparison} />
      </StatCard>

      <ActionSheet
        visible={stakeSheetVisible}
        title="Choose staking method"
        description="Pick how this demo should frame the staking route. No wallet or staking SDK is connected."
        onClose={() => setStakeSheetVisible(false)}
        actions={[
          {
            label: 'Native Stake',
            description: 'You will need to manually claim rewards.',
            icon: 'leaf-outline',
            onPress: () => setStakeSheetVisible(false),
          },
          {
            label: 'LST',
            description: 'Ore will be autocompounded through a liquid staking token.',
            icon: 'water-outline',
            onPress: () => setStakeSheetVisible(false),
          },
        ]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.lg,
    flexWrap: 'wrap',
  },
  heroCopy: {
    flex: 1,
    minWidth: 180,
    gap: oreSpacing.xs - 1,
  },
  heroEyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  heroValue: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  heroHelper: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  heroMeta: {
    minWidth: 130,
    alignItems: 'flex-end',
    gap: oreSpacing.xs,
  },
  heroMetaLabel: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
    textAlign: 'right',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  apyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  apyCard: {
    minWidth: 150,
    flexBasis: '47%',
    flexGrow: 1,
  },
  lendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
    paddingVertical: oreSpacing.sm + 2,
  },
  lendingDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  lendingCopy: {
    flex: 1,
    gap: oreSpacing.xs - 1,
  },
  lendingTitle: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
  },
  lendingDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  lendingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
    marginTop: oreSpacing.xxs,
  },
  lendingValue: {
    ...oreTypography.title,
    alignSelf: 'center',
    color: oreColors.text,
    textAlign: 'right',
  },
  tone_positive: {
    color: oreColors.positive,
  },
  tone_accent: {
    color: oreColors.accentStrong,
  },
  tone_warning: {
    color: oreColors.warning,
  },
});

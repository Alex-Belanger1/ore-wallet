import { StyleSheet, Text, View } from 'react-native';

import {
  oreColors,
  oreRadii,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import { GlassSurface } from './glass-surface';
import { Pill } from './pill';
import { PrimaryButton } from './primary-button';
import { StatCard } from './stat-card';

const miningTiles = [
  ['#1', '128', '0.1561'],
  ['#2', '118', '0.1627'],
  ['#3', '133', '0.1309'],
  ['#4', '124', '0.1328'],
  ['#5', '119', '0.1476'],
  ['#6', '124', '0.1551'],
  ['#7', '127', '0.1541'],
  ['#8', '125', '0.131'],
  ['#9', '124', '0.1478'],
  ['#10', '116', '0.1128'],
  ['#11', '115', '0.1229'],
  ['#12', '121', '0.1504'],
  ['#13', '121', '0.1189'],
  ['#14', '123', '0.1561'],
  ['#15', '120', '0.1299'],
  ['#16', '117', '0.152'],
  ['#17', '124', '0.1546'],
  ['#18', '124', '0.1198'],
  ['#19', '120', '0.1244'],
  ['#20', '119', '0.1248'],
  ['#21', '133', '0.1517'],
  ['#22', '122', '0.1471'],
  ['#23', '125', '0.1618'],
  ['#24', '120', '0.1143'],
  ['#25', '122', '0.1555'],
] as const;

const statusCards: {
  value: string;
  label: string;
  featured?: boolean;
  tone?: 'sol';
}[] = [
  { value: 'O 90.8', label: 'Mothorlode', featured: true },
  { value: '00:41', label: 'Time remaining' },
  { value: '3.516', label: 'Total deployed', tone: 'sol' },
  { value: '0', label: 'You deployed', tone: 'sol' },
] as const;

export function OreMiningConsole() {
  return (
    <StatCard variant="hero" style={styles.console}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Mining status</Text>
          <Text style={styles.title}>ORE mining console</Text>
        </View>
        <Pill label="Round live" tone="accent" />
      </View>

      <View style={styles.consoleLayout}>
        <GlassSurface variant="subtle" showSheen={false} style={styles.blockGrid}>
          {miningTiles.map(([rank, users, amount], index) => (
            <View
              key={rank}
              style={[
                styles.blockTile,
                index === 0 ? styles.blockTileActive : null,
                index === 10 ? styles.blockTileMuted : null,
              ]}>
              <View style={styles.blockTopRow}>
                <Text style={styles.blockRank}>{rank}</Text>
                <Text style={styles.blockUsers}>{users} users</Text>
              </View>
              <Text style={styles.blockAmount}>{amount}</Text>
            </View>
          ))}
        </GlassSurface>

        <View style={styles.controlPanel}>
          <View style={styles.statusGrid}>
            {statusCards.map((card) => (
              <GlassSurface
                key={card.label}
                variant={card.featured ? 'hero' : 'subtle'}
                showSheen={false}
                style={[styles.statusBox, card.featured ? styles.statusBoxFeatured : null]}>
                <Text style={[styles.statusValue, card.tone === 'sol' ? styles.solValue : null]}>
                  {card.value}
                </Text>
                <Text style={styles.statusLabel}>{card.label}</Text>
              </GlassSurface>
            ))}
          </View>

          <GlassSurface variant="subtle" showSheen={false} style={styles.deployPanel}>
            <View style={styles.segmentedControl}>
              <View style={styles.segmentActive}>
                <Text style={styles.segmentActiveText}>Manual</Text>
              </View>
              <View style={styles.segment}>
                <Text style={styles.segmentText}>Auto</Text>
              </View>
            </View>

            <View style={styles.walletRow}>
              <Text style={styles.walletBalance}>0.008514926 SOL</Text>
              <View style={styles.incrementRow}>
                {['+1', '+0.1', '+0.01'].map((item) => (
                  <GlassSurface key={item} variant="subtle" showSheen={false} style={styles.incrementChip}>
                    <Text style={styles.incrementText}>{item}</Text>
                  </GlassSurface>
                ))}
              </View>
            </View>

            <View style={styles.solRow}>
              <View style={styles.solGlyph} />
              <Text style={styles.solLabel}>SOL</Text>
              <Text style={styles.solAmount}>1.0</Text>
            </View>

            <View style={styles.deployMetricRow}>
              <Text style={styles.deployMetricLabel}>Blocks</Text>
              <Text style={styles.deployMetricValue}>All   x0</Text>
            </View>
            <View style={styles.deployMetricRow}>
              <Text style={styles.deployMetricLabel}>Total</Text>
              <Text style={styles.deployMetricValue}>0 SOL</Text>
            </View>

            <PrimaryButton label="Deploy" disabled style={styles.deployButton} />
            <Text style={styles.topUp}>Top up</Text>

            <View style={styles.rewardHeader}>
              <Text style={styles.rewardTitle}>Rewards</Text>
            </View>
            <View style={styles.rewardRow}>
              <Text style={styles.rewardLabel}>Unrefined ORE</Text>
              <Text style={styles.rewardValue}>O 0.16409402488</Text>
            </View>
            <View style={styles.rewardRow}>
              <Text style={styles.rewardLabel}>Refined ORE</Text>
              <Text style={styles.rewardValue}>O 0.06820324813</Text>
            </View>
            <GlassSurface variant="hero" showSheen={false} style={styles.claimButton}>
              <Text style={styles.claimLabel}>Claim</Text>
            </GlassSurface>
          </GlassSurface>
        </View>
      </View>
    </StatCard>
  );
}

const styles = StyleSheet.create({
  console: {
    gap: oreSpacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.md,
    flexWrap: 'wrap',
  },
  headerCopy: {
    flex: 1,
    minWidth: 180,
    gap: oreSpacing.xs - 2,
  },
  eyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  title: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  consoleLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.md,
  },
  blockGrid: {
    flexGrow: 1,
    flexBasis: 270,
    borderRadius: oreRadii.lg,
    padding: oreSpacing.xs,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  blockTile: {
    flexGrow: 1,
    flexBasis: '18%',
    minWidth: 48,
    aspectRatio: 0.98,
    borderWidth: 1,
    borderColor: 'rgba(91, 111, 140, 0.72)',
    borderRadius: oreRadii.sm - 4,
    backgroundColor: 'rgba(7, 8, 12, 0.78)',
    padding: 6,
    justifyContent: 'space-between',
  },
  blockTileActive: {
    borderColor: oreColors.accentStrong,
    backgroundColor: 'rgba(36, 30, 18, 0.88)',
  },
  blockTileMuted: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  blockTopRow: {
    gap: 2,
  },
  blockRank: {
    fontSize: 11,
    lineHeight: 13,
    color: oreColors.textMuted,
    fontWeight: '700',
  },
  blockUsers: {
    fontSize: 9,
    lineHeight: 11,
    color: oreColors.textMuted,
  },
  blockAmount: {
    fontSize: 11,
    lineHeight: 13,
    color: oreColors.text,
    fontWeight: '800',
    textAlign: 'right',
  },
  controlPanel: {
    flexGrow: 1,
    flexBasis: 250,
    gap: oreSpacing.xs,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
  },
  statusBox: {
    flexGrow: 1,
    flexBasis: '47%',
    minHeight: 64,
    borderRadius: oreRadii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: oreSpacing.xs,
    gap: oreSpacing.xxs,
  },
  statusBoxFeatured: {
    borderColor: oreColors.accentStrong,
  },
  statusValue: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  solValue: {
    color: oreColors.accentStrong,
  },
  statusLabel: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
    textAlign: 'center',
  },
  deployPanel: {
    borderRadius: oreRadii.lg,
    padding: oreSpacing.sm,
    gap: oreSpacing.sm,
  },
  segmentedControl: {
    minHeight: 34,
    flexDirection: 'row',
    borderRadius: oreRadii.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    padding: 3,
  },
  segmentActive: {
    flex: 1,
    borderRadius: oreRadii.sm - 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActiveText: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  segmentText: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
  },
  walletBalance: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  incrementRow: {
    flexDirection: 'row',
    gap: oreSpacing.xxs,
  },
  incrementChip: {
    borderRadius: oreRadii.sm - 2,
    paddingHorizontal: oreSpacing.xs,
    paddingVertical: oreSpacing.xxs,
  },
  incrementText: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  solRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: oreSpacing.xs,
  },
  solGlyph: {
    width: 20,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#65E6B2',
    borderTopColor: '#8B5CF6',
    borderTopWidth: 4,
    borderBottomColor: '#3B82F6',
    borderBottomWidth: 4,
  },
  solLabel: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  solAmount: {
    marginLeft: 'auto',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '800',
    color: 'rgba(142, 166, 205, 0.48)',
  },
  deployMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: oreSpacing.md,
  },
  deployMetricLabel: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  deployMetricValue: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '800',
  },
  deployButton: {
    minHeight: 48,
  },
  topUp: {
    ...oreTypography.button,
    color: oreColors.textMuted,
    textAlign: 'center',
  },
  rewardHeader: {
    marginTop: oreSpacing.xs,
  },
  rewardTitle: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
  },
  rewardLabel: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  rewardValue: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '800',
    textAlign: 'right',
  },
  claimButton: {
    minHeight: 46,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: oreColors.accentStrong,
  },
  claimLabel: {
    ...oreTypography.button,
    color: oreColors.accentStrong,
  },
});

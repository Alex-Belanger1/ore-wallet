import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreSpacing, oreTypography } from '../constants/theme';
import { Pill } from './pill';
import { StatCard } from './stat-card';

type StrategyCardProps = {
  title: string;
  detail: string;
  edge: string;
  tone?: 'default' | 'accent';
};

export function StrategyCard({
  title,
  detail,
  edge,
  tone = 'default',
}: StrategyCardProps) {
  return (
    <StatCard variant={tone === 'accent' ? 'hero' : 'subtle'} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pill label={edge} tone={tone === 'accent' ? 'accent' : 'default'} />
      </View>
      <Text style={styles.detail}>{detail}</Text>
    </StatCard>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 180,
    flexBasis: '47%',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
  },
  title: {
    ...oreTypography.title,
    color: oreColors.text,
    flex: 1,
  },
  detail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
});

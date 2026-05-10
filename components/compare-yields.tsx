import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { Pill } from './pill';

type CompareYieldItem = {
  title: string;
  apy: number;
  subtitle: string;
  riskTag: string;
  tone?: 'default' | 'accent' | 'positive' | 'warning';
};

type CompareYieldsProps = {
  items: CompareYieldItem[];
};

const toneColors = {
  default: oreColors.text,
  accent: oreColors.accentStrong,
  positive: oreColors.positive,
  warning: oreColors.warning,
} as const;

export function CompareYields({ items }: CompareYieldsProps) {
  const maxApy = Math.max(...items.map((item) => item.apy));

  return (
    <View style={styles.list}>
      {items.map((item, index) => {
        const tone = item.tone ?? 'default';
        const width = `${Math.max(18, (item.apy / maxApy) * 100)}%` as const;

        return (
          <View key={item.title} style={[styles.row, index < items.length - 1 ? styles.divider : null]}>
            <View style={styles.rowHeader}>
              <View style={styles.copy}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.meta}>
                <Text style={[styles.apy, { color: toneColors[tone] }]}>{item.apy.toFixed(1)}%</Text>
                <Pill
                  label={item.riskTag}
                  tone={tone === 'accent' ? 'accent' : 'default'}
                />
              </View>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width, backgroundColor: toneColors[tone] }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 0,
  },
  row: {
    paddingVertical: oreSpacing.sm + 2,
    gap: oreSpacing.xs,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.sm,
  },
  copy: {
    flex: 1,
    gap: oreSpacing.xxs,
  },
  title: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
  },
  subtitle: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  meta: {
    alignItems: 'flex-end',
    gap: oreSpacing.xs,
  },
  apy: {
    ...oreTypography.title,
  },
  track: {
    height: 8,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.stroke,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: oreRadii.pill,
  },
});

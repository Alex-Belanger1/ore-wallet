import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreSpacing, oreTypography } from '../constants/theme';

type TokenTone = 'default' | 'accent' | 'positive' | 'warning';

type TokenRowProps = {
  label: string;
  detail: string;
  value: string;
  tone?: TokenTone;
  isLast?: boolean;
};

export function TokenRow({
  label,
  detail,
  value,
  tone = 'default',
  isLast = false,
}: TokenRowProps) {
  return (
    <View style={[styles.row, !isLast ? styles.rowDivider : null]}>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <Text style={[styles.value, toneStyles[tone]]}>{value}</Text>
    </View>
  );
}

const toneStyles = StyleSheet.create({
  default: {
    color: oreColors.text,
  },
  accent: {
    color: oreColors.accentStrong,
  },
  positive: {
    color: oreColors.positive,
  },
  warning: {
    color: oreColors.warning,
  },
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
    paddingVertical: oreSpacing.sm + 2,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  copy: {
    flex: 1,
    gap: oreSpacing.xs - 1,
  },
  label: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
  },
  detail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  value: {
    ...oreTypography.body,
    fontWeight: '700',
    alignSelf: 'center',
    textAlign: 'right',
  },
});

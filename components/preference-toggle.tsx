import { StyleSheet, Switch, Text, View } from 'react-native';

import { oreColors, oreSpacing, oreTypography } from '../constants/theme';

type PreferenceToggleProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
};

export function PreferenceToggle({
  title,
  description,
  value,
  onValueChange,
  isLast = false,
}: PreferenceToggleProps) {
  return (
    <View style={[styles.row, !isLast ? styles.rowDivider : null]}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? oreColors.accentStrong : '#ECE5D8'}
        trackColor={{
          false: 'rgba(255,255,255,0.14)',
          true: 'rgba(214,177,107,0.38)',
        }}
        ios_backgroundColor="rgba(255,255,255,0.12)"
      />
    </View>
  );
}

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
  title: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
  },
  description: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});

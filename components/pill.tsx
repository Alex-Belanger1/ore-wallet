import { StyleSheet, Text } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { GlassSurface } from './glass-surface';

type PillProps = {
  label: string;
  tone?: 'default' | 'accent';
};

export function Pill({ label, tone = 'default' }: PillProps) {
  return (
    <GlassSurface
      variant={tone === 'accent' ? 'hero' : 'subtle'}
      style={[styles.pill, tone === 'accent' ? styles.pillAccent : null]}
      showSheen={false}>
      <Text style={[styles.label, tone === 'accent' ? styles.labelAccent : null]}>{label}</Text>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: oreRadii.pill,
    paddingHorizontal: oreSpacing.sm + 1,
    paddingVertical: oreSpacing.xs - 1,
  },
  pillAccent: {
    borderColor: oreColors.strokeStrong,
    backgroundColor: oreColors.accentSoft,
  },
  label: {
    ...oreTypography.caption,
    color: oreColors.text,
    letterSpacing: 0,
  },
  labelAccent: {
    color: oreColors.accentStrong,
  },
});

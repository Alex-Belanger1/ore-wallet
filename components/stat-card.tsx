import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import {
  oreCardStyles,
  oreColors,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import { GlassSurface } from './glass-surface';

type StatCardProps = PropsWithChildren<{
  eyebrow?: string;
  value?: string;
  detail?: string;
  variant?: 'default' | 'hero' | 'subtle';
  style?: StyleProp<ViewStyle>;
}>;

export function StatCard({
  eyebrow,
  value,
  detail,
  variant = 'default',
  style,
  children,
}: StatCardProps) {
  return (
    <GlassSurface
      variant={variant === 'default' ? 'default' : variant}
      style={[styles.base, variantStyles[variant], style]}>
      <View
        pointerEvents="none"
        style={[styles.topChrome, variant === 'hero' ? styles.topChromeHero : null]}
      />
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      {value ? (
        <Text style={[styles.value, variant === 'hero' ? styles.valueHero : null]}>{value}</Text>
      ) : null}
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      {children ? <View style={styles.content}>{children}</View> : null}
    </GlassSurface>
  );
}

const variantStyles = StyleSheet.create({
  default: {
    ...oreCardStyles.elevated,
  },
  hero: {
    ...oreCardStyles.hero,
  },
  subtle: {
    ...oreCardStyles.subtle,
  },
});

const styles = StyleSheet.create({
  base: {
    position: 'relative',
    overflow: 'hidden',
    gap: oreSpacing.sm,
  },
  topChrome: {
    position: 'absolute',
    top: 0,
    left: oreSpacing.lg + 2,
    right: oreSpacing.lg + 2,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  topChromeHero: {
    backgroundColor: oreColors.strokeStrong,
  },
  eyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  value: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  valueHero: {
    ...oreTypography.metric,
  },
  detail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  content: {
    gap: oreSpacing.sm,
  },
});

import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { GlassSurface } from './glass-surface';

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <GlassSurface variant="subtle" style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {action ? <View style={styles.action}>{action}</View> : null}
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: oreRadii.lg,
    paddingHorizontal: oreSpacing.lg,
    paddingVertical: oreSpacing.xl,
    gap: oreSpacing.sm,
  },
  title: {
    ...oreTypography.title,
    color: oreColors.text,
    textAlign: 'center',
  },
  description: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    textAlign: 'center',
  },
  action: {
    width: '100%',
    marginTop: oreSpacing.xs,
  },
});

import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreSpacing, oreTypography } from '../constants/theme';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  trailing?: ReactNode;
  variant?: 'default' | 'hero';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  trailing,
  variant = 'default',
}: SectionHeaderProps) {
  return (
    <View style={styles.root}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={[styles.title, variant === 'hero' ? styles.titleHero : null]}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.md,
    flexWrap: 'wrap',
  },
  copy: {
    flex: 1,
    minWidth: 220,
    gap: oreSpacing.xs - 1,
  },
  trailing: {
    alignSelf: 'flex-start',
    marginTop: oreSpacing.xxs,
  },
  eyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  title: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  titleHero: {
    ...oreTypography.display,
  },
  description: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    maxWidth: 560,
  },
});

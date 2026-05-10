import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { GlassSurface } from './glass-surface';

type PrivacyLevelIndicatorProps = {
  score: number;
  level: string;
};

export function PrivacyLevelIndicator({ score, level }: PrivacyLevelIndicatorProps) {
  const progress = Math.max(0, Math.min(score, 100)) / 100;
  const arcDegrees = `${-90 + progress * 270}deg`;

  return (
    <View style={styles.shell}>
      <View style={styles.ring}>
        <View style={[styles.arc, { transform: [{ rotate: arcDegrees }] }]} />
        <GlassSurface variant="subtle" style={styles.innerRing} showSheen={false}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.scoreLabel}>Privacy score</Text>
        </GlassSurface>
      </View>
      <Text style={styles.level}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: oreSpacing.sm,
  },
  ring: {
    width: 184,
    height: 184,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
    backgroundColor: 'rgba(255,255,255,0.02)',
    position: 'relative',
  },
  arc: {
    position: 'absolute',
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
    borderRadius: oreRadii.pill,
    borderTopWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 9,
    borderLeftWidth: 9,
    borderTopColor: oreColors.accentStrong,
    borderRightColor: oreColors.accent,
    borderBottomColor: 'rgba(214, 177, 107, 0.34)',
    borderLeftColor: 'rgba(214, 177, 107, 0.08)',
  },
  innerRing: {
    width: 126,
    height: 126,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: oreSpacing.xxs,
    borderColor: oreColors.stroke,
  },
  score: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  scoreLabel: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  level: {
    ...oreTypography.caption,
    color: oreColors.accentStrong,
    textAlign: 'center',
  },
});

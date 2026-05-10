import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import {
  oreCardStyles,
  oreColors,
  oreRadii,
  oreSpacing,
} from '../constants/theme';
import { GlassSurface } from './glass-surface';

type IllustrationVariant =
  | 'welcome'
  | 'create'
  | 'signin'
  | 'username'
  | 'notifications'
  | 'security'
  | 'finish';

type OnboardingIllustrationProps = {
  variant: IllustrationVariant;
};

type ShapeConfig = ViewStyle;

const variantShapes: Record<IllustrationVariant, ShapeConfig[]> = {
  welcome: [
    { width: 112, height: 112, left: 18, top: 28, borderRadius: 999, backgroundColor: 'rgba(214, 177, 107, 0.14)' },
    { width: 150, height: 84, right: 18, top: 40, borderRadius: 28, backgroundColor: oreColors.backgroundElevated, borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 124, height: 18, right: 30, top: 58, borderRadius: oreRadii.pill, backgroundColor: oreColors.accent },
    { width: 96, height: 10, right: 56, top: 88, borderRadius: oreRadii.pill, backgroundColor: oreColors.stroke },
    { width: 138, height: 34, left: 48, bottom: 28, borderRadius: 20, backgroundColor: oreColors.surfaceMuted, borderWidth: 1, borderColor: oreColors.stroke },
  ],
  create: [
    { width: 120, height: 152, left: 26, top: 22, borderRadius: 32, backgroundColor: oreColors.backgroundElevated, borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 84, height: 84, left: 44, top: 44, borderRadius: 999, backgroundColor: 'rgba(214, 177, 107, 0.18)' },
    { width: 112, height: 10, right: 34, top: 54, borderRadius: oreRadii.pill, backgroundColor: oreColors.accent },
    { width: 146, height: 56, right: 24, top: 76, borderRadius: 24, backgroundColor: oreColors.surfaceMuted, borderWidth: 1, borderColor: oreColors.stroke },
    { width: 132, height: 18, right: 30, bottom: 34, borderRadius: oreRadii.pill, backgroundColor: oreColors.stroke },
  ],
  signin: [
    { width: 150, height: 94, left: 18, top: 44, borderRadius: 30, backgroundColor: oreColors.surfaceMuted, borderWidth: 1, borderColor: oreColors.stroke },
    { width: 108, height: 108, right: 30, top: 26, borderRadius: 999, backgroundColor: 'rgba(214, 177, 107, 0.12)', borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 146, height: 12, left: 26, top: 62, borderRadius: oreRadii.pill, backgroundColor: oreColors.accent },
    { width: 92, height: 10, left: 26, top: 88, borderRadius: oreRadii.pill, backgroundColor: oreColors.stroke },
    { width: 120, height: 40, right: 24, bottom: 30, borderRadius: 20, backgroundColor: oreColors.backgroundElevated, borderWidth: 1, borderColor: oreColors.strokeStrong },
  ],
  username: [
    { width: 118, height: 118, left: 26, top: 28, borderRadius: 32, backgroundColor: oreColors.backgroundElevated, borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 56, height: 56, left: 56, top: 58, borderRadius: 999, backgroundColor: oreColors.accent },
    { width: 132, height: 16, right: 24, top: 54, borderRadius: oreRadii.pill, backgroundColor: oreColors.accentSoft, borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 112, height: 42, right: 34, top: 84, borderRadius: 22, backgroundColor: oreColors.surfaceMuted, borderWidth: 1, borderColor: oreColors.stroke },
    { width: 144, height: 18, left: 54, bottom: 32, borderRadius: oreRadii.pill, backgroundColor: oreColors.stroke },
  ],
  notifications: [
    { width: 104, height: 104, left: 26, top: 36, borderRadius: 999, backgroundColor: 'rgba(214, 177, 107, 0.14)' },
    { width: 156, height: 88, right: 24, top: 32, borderRadius: 28, backgroundColor: oreColors.backgroundElevated, borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 122, height: 14, right: 40, top: 54, borderRadius: oreRadii.pill, backgroundColor: oreColors.accent },
    { width: 98, height: 12, right: 54, top: 80, borderRadius: oreRadii.pill, backgroundColor: oreColors.stroke },
    { width: 140, height: 36, left: 60, bottom: 26, borderRadius: oreRadii.pill, backgroundColor: oreColors.surfaceMuted, borderWidth: 1, borderColor: oreColors.stroke },
  ],
  security: [
    { width: 120, height: 146, left: 24, top: 26, borderRadius: 34, backgroundColor: oreColors.backgroundElevated, borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 82, height: 82, left: 43, top: 54, borderRadius: 24, backgroundColor: 'rgba(214, 177, 107, 0.16)' },
    { width: 146, height: 18, right: 22, top: 50, borderRadius: oreRadii.pill, backgroundColor: oreColors.accent },
    { width: 132, height: 18, right: 30, top: 82, borderRadius: oreRadii.pill, backgroundColor: oreColors.stroke },
    { width: 118, height: 44, right: 34, bottom: 26, borderRadius: 22, backgroundColor: oreColors.surfaceMuted, borderWidth: 1, borderColor: oreColors.stroke },
  ],
  finish: [
    { width: 122, height: 122, left: 24, top: 30, borderRadius: 999, backgroundColor: 'rgba(214, 177, 107, 0.18)' },
    { width: 140, height: 92, right: 22, top: 32, borderRadius: 30, backgroundColor: oreColors.backgroundElevated, borderWidth: 1, borderColor: oreColors.strokeStrong },
    { width: 42, height: 10, left: 72, top: 92, borderRadius: oreRadii.pill, backgroundColor: oreColors.background },
    { width: 72, height: 10, left: 92, top: 84, borderRadius: oreRadii.pill, backgroundColor: oreColors.background, transform: [{ rotate: '-48deg' }] },
    { width: 144, height: 18, left: 60, bottom: 30, borderRadius: oreRadii.pill, backgroundColor: oreColors.accent },
  ],
};

export function OnboardingIllustration({
  variant,
}: OnboardingIllustrationProps) {
  return (
    <GlassSurface variant="hero" style={styles.frame}>
      <View style={styles.grid} />
      {variantShapes[variant].map((shape, index) => (
        <View key={`${variant}-${index}`} style={[styles.shape, shape]} />
      ))}
      <View style={styles.coreRing} />
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  frame: {
    ...oreCardStyles.hero,
    minHeight: 214,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.35,
    borderRadius: oreRadii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.02)',
  },
  shape: {
    position: 'absolute',
  },
  coreRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    right: oreSpacing.xl,
    bottom: oreSpacing.xl,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(246, 241, 231, 0.16)',
  },
});

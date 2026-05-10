import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { oreColors, oreGlass, oreRadii } from '../constants/theme';

type GlassSurfaceVariant = keyof typeof oreGlass;

type GlassSurfaceProps = PropsWithChildren<ViewProps & {
  variant?: GlassSurfaceVariant;
  style?: StyleProp<ViewStyle>;
  showSheen?: boolean;
}>;

export function GlassSurface({
  children,
  variant = 'default',
  style,
  showSheen = true,
  ...viewProps
}: GlassSurfaceProps) {
  const glass = oreGlass[variant];

  return (
    <View {...viewProps} style={[styles.surface, style]}>
      <BlurView intensity={glass.intensity} tint="dark" style={styles.fill} />
      <LinearGradient
        pointerEvents="none"
        colors={glass.gradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={styles.fill}
      />
      {showSheen ? <View pointerEvents="none" style={styles.sheen} /> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: oreColors.surface,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  sheen: {
    position: 'absolute',
    left: -24,
    right: -24,
    top: 0,
    height: 46,
    borderBottomLeftRadius: oreRadii.xl,
    borderBottomRightRadius: oreRadii.xl,
    backgroundColor: oreColors.glassHighlight,
    opacity: 0.12,
    transform: [{ rotate: '-3deg' }],
  },
});

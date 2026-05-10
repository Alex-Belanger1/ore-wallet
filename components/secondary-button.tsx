import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import {
  oreColors,
  oreRadii,
  oreShadows,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import { selectionHaptic } from '../lib/haptics';
import { GlassSurface } from './glass-surface';

type SecondaryButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function SecondaryButton({
  label,
  onPress = () => undefined,
  disabled = false,
  style,
}: SecondaryButtonProps) {
  const handlePress = (event: GestureResponderEvent) => {
    selectionHaptic();
    onPress(event);
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      hitSlop={2}
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.buttonDisabled : null,
        pressed && !disabled ? styles.buttonPressed : null,
        style,
      ]}>
      <GlassSurface variant="subtle" style={styles.buttonGlass} showSheen={false} />
      <Text style={[styles.label, disabled ? styles.labelDisabled : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    ...oreShadows.soft,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 52,
    borderRadius: oreRadii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: oreSpacing.lg,
    paddingVertical: oreSpacing.sm,
  },
  buttonGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: oreRadii.md,
  },
  buttonPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.985 }, { translateY: 1 }],
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  label: {
    ...oreTypography.button,
    color: oreColors.text,
    letterSpacing: 0,
  },
  labelDisabled: {
    color: oreColors.textMuted,
  },
});

import { LinearGradient } from 'expo-linear-gradient';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  oreColors,
  oreRadii,
  oreShadows,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import { lightImpactHaptic } from '../lib/haptics';

type PrimaryButtonProps = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  onPress = () => undefined,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const handlePress = (event: GestureResponderEvent) => {
    lightImpactHaptic();
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
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(255, 255, 255, 0.48)', 'rgba(240, 211, 142, 0.92)', 'rgba(148, 105, 35, 0.92)']}
        start={{ x: 0.12, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.gradient}
      />
      <View pointerEvents="none" style={styles.glassEdge} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    ...oreShadows.glow,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 52,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: oreSpacing.lg,
    paddingVertical: oreSpacing.sm,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  glassEdge: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.44)',
  },
  buttonPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.985 }, { translateY: 1 }],
  },
  buttonDisabled: {
    opacity: 0.48,
  },
  label: {
    ...oreTypography.button,
    color: '#161108',
    letterSpacing: 0,
  },
});

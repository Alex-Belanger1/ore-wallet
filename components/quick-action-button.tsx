import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  oreColors,
  oreRadii,
  oreShadows,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import { selectionHaptic } from '../lib/haptics';
import { GlassSurface } from './glass-surface';

type QuickActionButtonProps = {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

export function QuickActionButton({
  label,
  icon,
  onPress = () => undefined,
  style,
}: QuickActionButtonProps) {
  const handlePress = (event: GestureResponderEvent) => {
    selectionHaptic();
    onPress(event);
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={2}
      style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null, style]}>
      <GlassSurface variant="default" style={styles.buttonGlass} showSheen />
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={18} color={oreColors.accentStrong} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    ...oreShadows.soft,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 96,
    flexGrow: 1,
    flexBasis: 76,
    borderRadius: oreRadii.md,
  },
  buttonGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: oreRadii.md,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: oreSpacing.xs,
    paddingHorizontal: oreSpacing.sm,
    paddingVertical: oreSpacing.md,
  },
  buttonPressed: {
    opacity: 0.98,
    transform: [{ scale: 0.98 }, { translateY: 1 }],
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: oreColors.accentSoft,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  label: {
    ...oreTypography.caption,
    color: oreColors.text,
    textAlign: 'center',
  },
});

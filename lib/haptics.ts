import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export function selectionHaptic() {
  if (Platform.OS !== 'ios') {
    return;
  }

  Haptics.selectionAsync().catch(() => undefined);
}

export function lightImpactHaptic() {
  if (Platform.OS !== 'ios') {
    return;
  }

  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}

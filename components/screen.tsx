import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, type PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { oreColors, oreSpacing } from '../constants/theme';
import { useScreenFrame } from '../hooks/use-screen-frame';

type ScreenProps = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  footerInset?: number;
}>;

export function Screen({
  children,
  contentStyle,
  footerInset = 136,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const { contentMaxWidth } = useScreenFrame();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.screen}>
        <View pointerEvents="none" style={[styles.glow, styles.glowTop]} />
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(214, 177, 107, 0.12)', 'rgba(255, 255, 255, 0.035)', 'rgba(7, 8, 9, 0)']}
          start={{ x: 0.95, y: 0 }}
          end={{ x: 0.1, y: 0.85 }}
          style={styles.veilTop}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(255, 255, 255, 0.065)', 'rgba(7, 8, 9, 0)']}
          start={{ x: 0.02, y: 0.1 }}
          end={{ x: 0.8, y: 0.95 }}
          style={styles.veilBottom}
        />
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: Math.max(footerInset, insets.bottom + 112),
            },
          ]}>
          <Animated.View
            style={[
              styles.content,
              contentMaxWidth ? { maxWidth: contentMaxWidth } : null,
              {
                opacity,
                transform: [{ translateY }],
              },
              contentStyle,
            ]}>
            {children}
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: oreColors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: oreColors.background,
  },
  scrollContent: {
    paddingTop: oreSpacing.sm,
  },
  content: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: oreSpacing.screen,
    gap: oreSpacing.lg,
  },
  glow: {
    position: 'absolute',
    height: 1,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  glowTop: {
    top: 0,
  },
  veilTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
  },
  veilBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 280,
  },
});

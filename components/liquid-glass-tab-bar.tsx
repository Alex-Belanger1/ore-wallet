import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appTabs } from '../constants/tabs';
import {
  oreColors,
  oreRadii,
  oreShadows,
  oreSpacing,
} from '../constants/theme';
import { selectionHaptic } from '../lib/haptics';
import { GlassSurface } from './glass-surface';

const HORIZONTAL_PADDING = 8;

type TabConfig = (typeof appTabs)[number];

function getTabConfig(routeName: string): TabConfig {
  return appTabs.find((tab) => tab.route === routeName) ?? appTabs[0];
}

export function LiquidGlassTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [barWidth, setBarWidth] = useState(0);
  const indexProgress = useRef(new Animated.Value(state.index)).current;
  const tabCount = state.routes.length;
  const usableWidth = Math.max(0, barWidth - HORIZONTAL_PADDING * 2);
  const itemWidth = tabCount > 0 ? usableWidth / tabCount : 0;
  const sliderWidth = itemWidth > 0 ? Math.max(26, Math.min(54, itemWidth * 0.58)) : 0;
  const activeGlassWidth = itemWidth > 0 ? Math.max(48, itemWidth - 8) : 0;

  useEffect(() => {
    Animated.spring(indexProgress, {
      toValue: state.index,
      damping: 18,
      stiffness: 180,
      mass: 0.72,
      useNativeDriver: true,
    }).start();
  }, [indexProgress, state.index]);

  const sliderTranslateX = useMemo(() => {
    if (!itemWidth || !tabCount) {
      return 0;
    }

    return indexProgress.interpolate({
      inputRange: state.routes.map((_, index) => index),
      outputRange: state.routes.map(
        (_, index) => HORIZONTAL_PADDING + index * itemWidth + (itemWidth - sliderWidth) / 2,
      ),
      extrapolate: 'clamp',
    });
  }, [indexProgress, itemWidth, sliderWidth, state.routes, tabCount]);

  const activeGlassTranslateX = useMemo(() => {
    if (!itemWidth || !tabCount) {
      return 0;
    }

    return indexProgress.interpolate({
      inputRange: state.routes.map((_, index) => index),
      outputRange: state.routes.map(
        (_, index) => HORIZONTAL_PADDING + index * itemWidth + (itemWidth - activeGlassWidth) / 2,
      ),
      extrapolate: 'clamp',
    });
  }, [activeGlassWidth, indexProgress, itemWidth, state.routes, tabCount]);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          paddingBottom:
            Platform.OS === 'web'
              ? oreSpacing.tabBarInset
              : Math.max(insets.bottom, oreSpacing.xs),
          paddingHorizontal: width >= 720 ? oreSpacing.xl : oreSpacing.tabBarInset,
        },
      ]}>
      <GlassSurface
        variant="chrome"
        style={styles.bar}
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}>
        <View pointerEvents="none" style={styles.topEdge} />

        {barWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activeGlass,
              {
                width: activeGlassWidth,
                transform: [{ translateX: activeGlassTranslateX }],
              },
            ]}
          />
        ) : null}

        {barWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.slider,
              {
                width: sliderWidth,
                transform: [{ translateX: sliderTranslateX }],
              },
            ]}
          />
        ) : null}

        <View style={styles.items}>
          {state.routes.map((route, index) => {
            const options = descriptors[route.key]?.options;
            const isFocused = state.index === index;
            const tab = getTabConfig(route.name);
            const label =
              typeof options?.tabBarLabel === 'string'
                ? options.tabBarLabel
                : options?.title ?? tab.title;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                selectionHaptic();
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <Pressable
                key={route.key}
                accessibilityLabel={options?.tabBarAccessibilityLabel}
                accessibilityRole="tab"
                accessibilityState={isFocused ? { selected: true } : {}}
                onLongPress={onLongPress}
                onPress={onPress}
                style={({ pressed }) => [
                  styles.item,
                  pressed ? styles.itemPressed : null,
                ]}>
                <View style={[styles.iconCapsule, isFocused ? styles.iconCapsuleFocused : null]}>
                  <Ionicons
                    name={isFocused ? tab.activeIcon : tab.icon}
                    size={18}
                    color={isFocused ? oreColors.accentStrong : oreColors.textMuted}
                  />
                </View>
                <Text style={[styles.label, isFocused ? styles.labelFocused : null]} numberOfLines={1}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  bar: {
    ...oreShadows.soft,
    width: '100%',
    maxWidth: 600,
    minHeight: oreSpacing.tabBarHeight,
    borderRadius: oreRadii.xl,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: oreSpacing.xs,
    paddingBottom: oreSpacing.sm + 2,
  },
  topEdge: {
    position: 'absolute',
    left: oreSpacing.lg,
    right: oreSpacing.lg,
    top: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  activeGlass: {
    position: 'absolute',
    left: 0,
    top: 7,
    bottom: 9,
    borderRadius: oreRadii.xl,
    borderWidth: 1,
    borderColor: 'rgba(240, 211, 142, 0.26)',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    shadowColor: oreColors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 2,
    paddingBottom: 8,
  },
  itemPressed: {
    opacity: 0.72,
    transform: [{ translateY: 1 }],
  },
  iconCapsule: {
    width: 38,
    height: 30,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconCapsuleFocused: {
    backgroundColor: 'rgba(214, 177, 107, 0.13)',
    borderColor: oreColors.strokeStrong,
  },
  label: {
    maxWidth: '100%',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 0,
    color: oreColors.textMuted,
  },
  labelFocused: {
    color: oreColors.accentStrong,
  },
  slider: {
    position: 'absolute',
    left: 0,
    bottom: 6,
    height: 4,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.accentStrong,
    shadowColor: oreColors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
});

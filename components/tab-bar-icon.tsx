import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, type ComponentProps } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { oreColors, oreRadii } from '../constants/theme';

type TabBarIconProps = {
  activeIcon: ComponentProps<typeof Ionicons>['name'];
  inactiveIcon: ComponentProps<typeof Ionicons>['name'];
  color: string;
  focused: boolean;
};

export function TabBarIcon({
  activeIcon,
  inactiveIcon,
  color,
  focused,
}: TabBarIconProps) {
  const scale = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0,
      bounciness: 8,
      speed: 18,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View
      style={[
        styles.container,
        focused ? styles.containerFocused : null,
        {
          transform: [
            {
              scale: scale.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.08],
              }),
            },
          ],
        },
      ]}>
      <Ionicons
        size={18}
        color={color}
        name={focused ? activeIcon : inactiveIcon}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 34,
    height: 28,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFocused: {
    backgroundColor: oreColors.accentSoft,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
});

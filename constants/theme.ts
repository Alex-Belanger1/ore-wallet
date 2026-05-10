import { DarkTheme, type Theme } from '@react-navigation/native';
import { Platform, type TextStyle, type ViewStyle } from 'react-native';

export const oreColors = {
  background: '#070809',
  backgroundRaised: 'rgba(17, 19, 23, 0.78)',
  backgroundElevated: 'rgba(25, 28, 33, 0.72)',
  surfaceRaised: 'rgba(255, 255, 255, 0.105)',
  surface: 'rgba(255, 255, 255, 0.075)',
  surfaceMuted: 'rgba(255, 255, 255, 0.055)',
  surfacePressed: 'rgba(255, 255, 255, 0.14)',
  glassHighlight: 'rgba(255, 255, 255, 0.2)',
  glassLowlight: 'rgba(255, 255, 255, 0.035)',
  stroke: 'rgba(255, 255, 255, 0.14)',
  strokeStrong: 'rgba(214, 177, 107, 0.36)',
  text: '#F6F1E7',
  textMuted: '#A49E91',
  accent: '#D6B16B',
  accentSoft: 'rgba(214, 177, 107, 0.14)',
  accentStrong: '#F0D38E',
  positive: '#68D39C',
  warning: '#F1C260',
} as const;

export const oreSpacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
  xxxl: 48,
  screen: 22,
  maxWidth: 600,
  tabBarInset: 12,
  tabBarHeight: 86,
} as const;

export const oreRadii = {
  sm: 14,
  md: 20,
  lg: 28,
  xl: 36,
  pill: 999,
} as const;

export const oreShadows = {
  soft:
    Platform.select<ViewStyle>({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.25,
        shadowRadius: 28,
      },
      android: {
        elevation: 10,
        shadowColor: '#000000',
      },
      default: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 18 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
      },
    }) ?? {},
  glow:
    Platform.select<ViewStyle>({
      ios: {
        shadowColor: oreColors.accent,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
        shadowColor: oreColors.accent,
      },
      default: {
        shadowColor: oreColors.accent,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.12,
        shadowRadius: 18,
      },
    }) ?? {},
} as const;

export const oreTypography = {
  overline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  display: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: 0,
  } satisfies TextStyle,
  metric: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: 0,
  } satisfies TextStyle,
  title: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '700',
  } satisfies TextStyle,
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  } satisfies TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  } satisfies TextStyle,
  button: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '800',
  } satisfies TextStyle,
} as const;

const baseCard: ViewStyle = {
  borderRadius: oreRadii.lg,
  borderWidth: 1,
  borderColor: oreColors.stroke,
  backgroundColor: oreColors.surfaceRaised,
  padding: oreSpacing.lg + 2,
  gap: oreSpacing.sm + 2,
};

export const oreCardStyles = {
  base: baseCard,
  elevated: {
    ...baseCard,
    ...oreShadows.soft,
  } satisfies ViewStyle,
  hero: {
    ...baseCard,
    ...oreShadows.glow,
    backgroundColor: oreColors.backgroundElevated,
    borderColor: oreColors.strokeStrong,
  } satisfies ViewStyle,
  subtle: {
    ...baseCard,
    backgroundColor: oreColors.surfaceMuted,
  } satisfies ViewStyle,
} as const;

export const oreGlass = {
  default: {
    intensity: 34,
    gradient: [
      'rgba(255, 255, 255, 0.18)',
      'rgba(255, 255, 255, 0.075)',
      'rgba(255, 255, 255, 0.035)',
    ],
  },
  hero: {
    intensity: 48,
    gradient: [
      'rgba(240, 211, 142, 0.24)',
      'rgba(255, 255, 255, 0.105)',
      'rgba(255, 255, 255, 0.035)',
    ],
  },
  subtle: {
    intensity: 24,
    gradient: [
      'rgba(255, 255, 255, 0.115)',
      'rgba(255, 255, 255, 0.052)',
      'rgba(255, 255, 255, 0.025)',
    ],
  },
  chrome: {
    intensity: 58,
    gradient: [
      'rgba(255, 255, 255, 0.16)',
      'rgba(255, 255, 255, 0.07)',
      'rgba(7, 8, 9, 0.34)',
    ],
  },
} as const;

export const oreNavigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: oreColors.accent,
    background: oreColors.background,
    card: oreColors.backgroundRaised,
    text: oreColors.text,
    border: oreColors.stroke,
    notification: oreColors.accent,
  },
};

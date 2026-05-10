import { Platform, useWindowDimensions } from 'react-native';

import { oreSpacing } from '../constants/theme';

export function useScreenFrame() {
  const { width } = useWindowDimensions();
  const isWideWeb = Platform.OS === 'web' && width >= 768;
  const contentMaxWidth = isWideWeb ? Math.min(oreSpacing.maxWidth, width - 40) : undefined;

  return {
    contentMaxWidth,
    isWideWeb,
  };
}

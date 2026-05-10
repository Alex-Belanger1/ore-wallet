import { StyleSheet, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing } from '../constants/theme';

type ProgressDotsProps = {
  current: number;
  total: number;
};

export function ProgressDots({ current, total }: ProgressDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => {
        const active = index < current;
        const currentDot = index === current - 1;

        return (
          <View
            key={`${total}-${index}`}
            style={[
              styles.dot,
              active ? styles.dotActive : null,
              currentDot ? styles.dotCurrent : null,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: oreSpacing.xs,
  },
  dot: {
    width: 22,
    height: 6,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.stroke,
  },
  dotActive: {
    backgroundColor: 'rgba(214, 177, 107, 0.4)',
  },
  dotCurrent: {
    width: 30,
    backgroundColor: oreColors.accent,
  },
});

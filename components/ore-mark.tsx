import { StyleSheet, View } from 'react-native';

import { oreColors, oreShadows } from '../constants/theme';

type OreMarkProps = {
  size?: number;
};

export function OreMark({ size = 42 }: OreMarkProps) {
  const ringSize = size * 0.54;
  const holeSize = ringSize * 0.56;
  const slashLength = size * 0.76;
  const slashHeight = Math.max(5, size * 0.13);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}>
      <View
        style={[
          styles.slash,
          {
            width: slashLength,
            height: slashHeight,
            borderRadius: slashHeight / 2,
            transform: [{ rotate: '-45deg' }],
          },
        ]}
      />
      <View
        style={[
          styles.ring,
          {
            width: ringSize,
            height: ringSize,
            borderRadius: ringSize / 2,
          },
        ]}
      />
      <View
        style={[
          styles.hole,
          {
            width: holeSize,
            height: holeSize,
            borderRadius: holeSize / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...oreShadows.soft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    backgroundColor: '#000000',
  },
  ring: {
    backgroundColor: oreColors.text,
  },
  slash: {
    position: 'absolute',
    backgroundColor: oreColors.text,
  },
  hole: {
    position: 'absolute',
    backgroundColor: '#000000',
  },
});

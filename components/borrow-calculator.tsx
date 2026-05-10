import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import type { BorrowCalculatorData } from '../lib/borrow-data';
import { Pill } from './pill';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

type BorrowCalculatorProps = {
  calculator: BorrowCalculatorData;
};

export function BorrowCalculator({ calculator }: BorrowCalculatorProps) {
  const [selectedIndex, setSelectedIndex] = useState(calculator.initialPresetIndex);
  const preset = calculator.presets[selectedIndex];
  const progress =
    calculator.presets.length > 1 ? selectedIndex / (calculator.presets.length - 1) : 0;

  return (
    <StatCard variant="subtle">
      <SectionHeader
        title="Borrow calculator"
        description={calculator.helper}
        trailing={<Pill label="Dummy slider" tone="accent" />}
      />

      <View style={styles.amountRow}>
        <View style={styles.amountCopy}>
          <Text style={styles.amountLabel}>Borrow amount</Text>
          <Text style={styles.amountValue}>{preset.amount}</Text>
          <Text style={styles.amountDetail}>{calculator.collateralValue}</Text>
        </View>
        <View style={styles.amountMeta}>
          <Pill
            label={preset.safetyBand}
            tone={selectedIndex <= Math.floor(calculator.presets.length / 2) ? 'accent' : 'default'}
          />
          <Text style={styles.amountMetaText}>{preset.utilizationNote}</Text>
        </View>
      </View>

      <View style={styles.sliderShell}>
        <View style={styles.sliderRail}>
          <View style={styles.sliderTrack} />
          <View style={[styles.sliderFill, { width: `${progress * 100}%` }]} />

          {calculator.presets.map((option, index) => {
            const left =
              calculator.presets.length > 1
                ? (`${(index / (calculator.presets.length - 1)) * 100}%` as const)
                : ('0%' as const);

            return (
              <Pressable
                key={option.label}
                onPress={() => setSelectedIndex(index)}
                style={[styles.stopButton, { left }]}>
                <View
                  style={[
                    styles.stopDot,
                    index <= selectedIndex ? styles.stopDotFilled : null,
                    index === selectedIndex ? styles.stopDotActive : null,
                  ]}
                />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.stopLabels}>
          {calculator.presets.map((option, index) => (
            <Text
              key={option.label}
              style={[styles.stopLabel, index === selectedIndex ? styles.stopLabelActive : null]}>
              {option.label}
            </Text>
          ))}
        </View>
      </View>

      <View>
        <TokenRow
          label="Projected LTV"
          detail="How much of the dummy collateral value this loan would consume."
          value={preset.ltv}
          tone="accent"
        />
        <TokenRow
          label="Health factor"
          detail="A higher number means the modeled position is farther from stress."
          value={preset.healthFactor}
          tone="positive"
        />
        <TokenRow
          label="Liquidation price"
          detail="Modeled ORE price where this preset reaches 70% LTV."
          value={preset.liquidationPrice}
          tone="warning"
        />
        <TokenRow
          label="Estimated carry"
          detail="Monthly borrowing cost using the featured dummy variable route."
          value={preset.carry}
        />
        <TokenRow
          label="Remaining credit"
          detail="Unused dummy borrowing room after selecting this preset."
          value={preset.remainingCredit}
          tone={selectedIndex === calculator.presets.length - 1 ? 'warning' : 'default'}
          isLast
        />
      </View>
    </StatCard>
  );
}

const styles = StyleSheet.create({
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.lg,
    flexWrap: 'wrap',
  },
  amountCopy: {
    flex: 1,
    minWidth: 180,
    gap: oreSpacing.xs - 1,
  },
  amountLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  amountValue: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  amountDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  amountMeta: {
    flex: 1,
    minWidth: 180,
    alignItems: 'flex-start',
    gap: oreSpacing.xs,
  },
  amountMetaText: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  sliderShell: {
    paddingTop: oreSpacing.sm,
    gap: oreSpacing.xs,
  },
  sliderRail: {
    position: 'relative',
    height: 28,
    marginHorizontal: oreSpacing.sm,
    justifyContent: 'center',
  },
  sliderTrack: {
    ...StyleSheet.absoluteFillObject,
    top: 12,
    bottom: undefined,
    height: 4,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.stroke,
  },
  sliderFill: {
    position: 'absolute',
    top: 12,
    left: 0,
    height: 4,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.accent,
  },
  stopLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.xs,
  },
  stopButton: {
    position: 'absolute',
    top: 0,
    width: 44,
    height: 28,
    marginLeft: -22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.backgroundRaised,
    borderWidth: 2,
    borderColor: oreColors.strokeStrong,
  },
  stopDotFilled: {
    backgroundColor: oreColors.accentSoft,
  },
  stopDotActive: {
    width: 16,
    height: 16,
    backgroundColor: oreColors.accent,
    borderColor: oreColors.accent,
  },
  stopLabel: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
    textAlign: 'center',
  },
  stopLabelActive: {
    color: oreColors.text,
  },
});

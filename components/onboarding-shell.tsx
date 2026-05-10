import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { oreSpacing } from '../constants/theme';
import { Pill } from './pill';
import { ProgressDots } from './progress-dots';
import { Screen } from './screen';
import { SectionHeader } from './section-header';

type OnboardingShellProps = PropsWithChildren<{
  step: number;
  totalSteps: number;
  eyebrow: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
}>;

export function OnboardingShell({
  step,
  totalSteps,
  eyebrow,
  title,
  description,
  illustration,
  children,
}: OnboardingShellProps) {
  return (
    <Screen footerInset={148}>
      <View style={styles.topBar}>
        <ProgressDots current={step} total={totalSteps} />
        <Pill label="Dummy flow" tone="accent" />
      </View>
      {illustration}
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        variant="hero"
      />
      {children}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: oreSpacing.sm,
    marginTop: oreSpacing.xs,
  },
});

import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { OnboardingShell } from '../../components/onboarding-shell';
import { PrimaryButton } from '../../components/primary-button';
import { SecondaryButton } from '../../components/secondary-button';
import { StatCard } from '../../components/stat-card';
import { TokenRow } from '../../components/token-row';
import { oreSpacing } from '../../constants/theme';
import { useOnboarding } from '../../lib/onboarding-store';

export default function WelcomeScreen() {
  const onboarding = useOnboarding();

  return (
    <OnboardingShell
      step={1}
      totalSteps={6}
      eyebrow="ORE store of value"
      title="Create an ORE Native wallet for privacy, yield, & DeFi">
      <StatCard variant="subtle">
        <TokenRow
          label="Store value in ORE"
          detail="A premium home for long-horizon conviction, not noise."
          value="Core"
        />
        <TokenRow
          label="Add privacy when needed"
          detail="Keep the option of shielded transfers without changing wallets."
          value="Private"
        />
        <TokenRow
          label="Grow into yield later"
          detail="Mining, Staking, Lending, and Looping available after setup"
          value="Ready"
          isLast
        />
      </StatCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Create your ORE vault"
          onPress={() => {
            onboarding.setMode('signup');
            router.push('/(onboarding)/create-account');
          }}
        />
        <SecondaryButton
          label="I already have an account"
          onPress={() => {
            onboarding.setMode('signin');
            router.push('/(onboarding)/sign-in');
          }}
        />
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: oreSpacing.sm,
  },
});

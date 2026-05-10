import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { OnboardingIllustration } from '../../components/onboarding-illustration';
import { OnboardingShell } from '../../components/onboarding-shell';
import { PrimaryButton } from '../../components/primary-button';
import { SecondaryButton } from '../../components/secondary-button';
import { StatCard } from '../../components/stat-card';
import { TokenRow } from '../../components/token-row';
import { oreSpacing } from '../../constants/theme';
import { useOnboarding } from '../../lib/onboarding-store';

export default function FinishOnboardingScreen() {
  const onboarding = useOnboarding();
  const isSignIn = onboarding.mode === 'signin';
  const step = isSignIn ? 4 : 6;
  const totalSteps = isSignIn ? 4 : 6;

  return (
    <OnboardingShell
      step={step}
      totalSteps={totalSteps}
      eyebrow={isSignIn ? 'You are back in' : 'Your vault is ready'}
      title={
        isSignIn
          ? 'Your ORE setup is refreshed for this device.'
          : 'You are ready to enter your ORE-focused store-of-value wallet.'
      }
      description="Everything below is dummy profile data assembled during the onboarding flow."
      illustration={<OnboardingIllustration variant="finish" />}>
      <StatCard>
        <TokenRow
          label="Profile"
          detail="The identity shown in the wallet shell."
          value={isSignIn ? onboarding.email : onboarding.fullName}
        />
        <TokenRow
          label="Username"
          detail="Your visible handle for public or private ORE transfers."
          value={`@${onboarding.username}`}
        />
        <TokenRow
          label="Security defaults"
          detail="The device posture selected in the previous step."
          value={onboarding.security.faceId ? 'Biometric' : 'Passcode'}
          isLast
        />
      </StatCard>

      <StatCard variant="subtle">
        <TokenRow
          label="Notifications"
          detail="High-signal alerts chosen for this mock device."
          value={
            [
              onboarding.notifications.marketMoves,
              onboarding.notifications.miningWindows,
              onboarding.notifications.securityAlerts,
            ]
              .filter(Boolean)
              .length.toString()
          }
        />
        <TokenRow
          label="Wallet mode"
          detail="This build stays firmly dummy-only while the UI grows more complete."
          value="Concept"
          isLast
        />
      </StatCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Enter the wallet"
          onPress={() => router.replace('/(tabs)')}
        />
        <SecondaryButton
          label="Start over"
          onPress={() => {
            onboarding.reset();
            router.replace('/(onboarding)/welcome');
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

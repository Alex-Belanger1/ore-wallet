import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { OnboardingIllustration } from '../../components/onboarding-illustration';
import { OnboardingShell } from '../../components/onboarding-shell';
import { PreferenceToggle } from '../../components/preference-toggle';
import { PrimaryButton } from '../../components/primary-button';
import { SecondaryButton } from '../../components/secondary-button';
import { StatCard } from '../../components/stat-card';
import { TokenRow } from '../../components/token-row';
import { oreSpacing } from '../../constants/theme';
import { useOnboarding } from '../../lib/onboarding-store';

export default function EnableNotificationsScreen() {
  const onboarding = useOnboarding();

  return (
    <OnboardingShell
      step={4}
      totalSteps={6}
      eyebrow="Enable notifications"
      title="Keep the right ORE moments close without turning the wallet into noise."
      description="Notification settings are dummy only, but the defaults mirror a realistic high-trust crypto finance app."
      illustration={<OnboardingIllustration variant="notifications" />}>
      <StatCard>
        <PreferenceToggle
          title="Market moves"
          description="Get a quiet alert when ORE meaningfully moves against your target range."
          value={onboarding.notifications.marketMoves}
          onValueChange={() => onboarding.toggleNotification('marketMoves')}
        />
        <PreferenceToggle
          title="Mining windows"
          description="Receive a nudge when a strong dummy mining window opens."
          value={onboarding.notifications.miningWindows}
          onValueChange={() => onboarding.toggleNotification('miningWindows')}
        />
        <PreferenceToggle
          title="Security alerts"
          description="Always notify for new device access, passkey updates, or transfer approvals."
          value={onboarding.notifications.securityAlerts}
          onValueChange={() => onboarding.toggleNotification('securityAlerts')}
          isLast
        />
      </StatCard>

      <StatCard variant="subtle">
        <TokenRow
          label="Delivery tone"
          detail="The app prefers short, high-signal alerts instead of noisy campaign pushes."
          value="Calm"
        />
        <TokenRow
          label="Preview style"
          detail="Message previews stay discreet for a store-of-value wallet posture."
          value="Private"
          isLast
        />
      </StatCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Continue"
          onPress={() => router.push('/(onboarding)/security-setup')}
        />
        <SecondaryButton
          label="Skip for now"
          onPress={() => router.push('/(onboarding)/security-setup')}
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

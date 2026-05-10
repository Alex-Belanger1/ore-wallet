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

export default function SecuritySetupScreen() {
  const onboarding = useOnboarding();
  const step = onboarding.mode === 'signin' ? 3 : 5;
  const totalSteps = onboarding.mode === 'signin' ? 4 : 6;

  return (
    <OnboardingShell
      step={step}
      totalSteps={totalSteps}
      eyebrow="Security setup"
      title="Choose the protections that should follow this device."
      description="These controls are placeholders only, but they reflect the kind of security posture an ORE store-of-value wallet should emphasize."
      illustration={<OnboardingIllustration variant="security" />}>
      <StatCard>
        <PreferenceToggle
          title="Face ID for approvals"
          description="Confirm sends, borrow actions, and settings changes with biometrics."
          value={onboarding.security.faceId}
          onValueChange={() => onboarding.toggleSecurity('faceId')}
        />
        <PreferenceToggle
          title="Passkey backup"
          description="Keep a cleaner recovery path ready for future device restores."
          value={onboarding.security.passkeyBackup}
          onValueChange={() => onboarding.toggleSecurity('passkeyBackup')}
        />
        <PreferenceToggle
          title="Daily transfer review"
          description="Bundle lower-priority transfer confirmations into a daily digest."
          value={onboarding.security.transferReview}
          onValueChange={() => onboarding.toggleSecurity('transferReview')}
          isLast
        />
      </StatCard>

      <StatCard variant="subtle">
        <TokenRow
          label="Primary unlock"
          detail="Biometric-first on trusted devices, with passkey recovery standing by."
          value={onboarding.security.faceId ? 'Face ID' : 'Passcode'}
        />
        <TokenRow
          label="Recovery posture"
          detail="Modern onboarding avoids dropping users directly into seed phrase anxiety."
          value={onboarding.security.passkeyBackup ? 'Passkey' : 'Manual'}
          isLast
        />
      </StatCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Finish setup"
          onPress={() => router.push('/(onboarding)/finish')}
        />
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: oreSpacing.sm,
  },
});

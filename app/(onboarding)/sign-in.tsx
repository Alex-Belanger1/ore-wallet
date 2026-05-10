import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { FormField } from '../../components/form-field';
import { OnboardingIllustration } from '../../components/onboarding-illustration';
import { OnboardingShell } from '../../components/onboarding-shell';
import { PrimaryButton } from '../../components/primary-button';
import { SecondaryButton } from '../../components/secondary-button';
import { StatCard } from '../../components/stat-card';
import { TokenRow } from '../../components/token-row';
import { oreSpacing } from '../../constants/theme';
import { useOnboarding } from '../../lib/onboarding-store';

export default function SignInScreen() {
  const onboarding = useOnboarding();

  return (
    <OnboardingShell
      step={2}
      totalSteps={4}
      eyebrow="Sign in"
      title="Welcome back to your ORE vault."
      description="Use dummy credentials to simulate a returning user on a new device."
      illustration={<OnboardingIllustration variant="signin" />}>
      <StatCard>
        <FormField
          label="Email"
          value={onboarding.email}
          onChangeText={(value) => onboarding.updateField('email', value)}
          placeholder="you@orevault.app"
          keyboardType="email-address"
        />
        <FormField
          label="Password"
          value={onboarding.password}
          onChangeText={(value) => onboarding.updateField('password', value)}
          placeholder="Enter your password"
          secureTextEntry
        />
      </StatCard>

      <StatCard variant="subtle">
        <TokenRow
          label="Vault state"
          detail="The returning-user flow still keeps copy calm and security-forward."
          value="Ready"
        />
        <TokenRow
          label="Device trust"
          detail="Next step confirms notifications and biometric defaults for this device."
          value="Review"
          isLast
        />
      </StatCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Continue to security"
          onPress={() => {
            onboarding.setMode('signin');
            router.push('/(onboarding)/security-setup');
          }}
        />
        <SecondaryButton
          label="Back to welcome"
          onPress={() => router.replace('/(onboarding)/welcome')}
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

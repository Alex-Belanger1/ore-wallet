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

export default function CreateAccountScreen() {
  const onboarding = useOnboarding();

  return (
    <OnboardingShell
      step={2}
      totalSteps={6}
      eyebrow="Create account"
      title="Set up a clean ORE wallet profile with a modern recovery path."
      description="This is a dummy sign-up form. Nothing here creates a real account or touches a live API."
      illustration={<OnboardingIllustration variant="create" />}>
      <StatCard>
        <FormField
          label="Full name"
          value={onboarding.fullName}
          onChangeText={(value) => onboarding.updateField('fullName', value)}
          placeholder="Avery Lane"
          autoCapitalize="words"
        />
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
          placeholder="Create a strong password"
          secureTextEntry
          helper="Use a dummy passphrase here. This build does not store credentials."
        />
      </StatCard>

      <StatCard variant="subtle">
        <TokenRow
          label="Recovery style"
          detail="Passkey-forward UX with a cleaner path than raw seed phrase setup."
          value="Modern"
        />
        <TokenRow
          label="Fee posture"
          detail="ORE-settled product interactions are framed inside the wallet."
          value="ORE"
        />
        <TokenRow
          label="Network status"
          detail="No chain calls, no real onboarding, no external verification."
          value="Dummy"
          isLast
        />
      </StatCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Continue"
          onPress={() => router.push('/(onboarding)/choose-username')}
        />
        <SecondaryButton
          label="Use sign in instead"
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

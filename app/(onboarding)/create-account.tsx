import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FormField } from '../../components/form-field';
import { GlassSurface } from '../../components/glass-surface';
import { OnboardingShell } from '../../components/onboarding-shell';
import { PrimaryButton } from '../../components/primary-button';
import { SecondaryButton } from '../../components/secondary-button';
import { StatCard } from '../../components/stat-card';
import { TokenRow } from '../../components/token-row';
import { oreColors, oreRadii, oreSpacing, oreTypography } from '../../constants/theme';
import { useOnboarding } from '../../lib/onboarding-store';

const feeAssets = ['ORE', 'SOL', 'USDC'] as const;
type FeeAsset = (typeof feeAssets)[number];

export default function CreateAccountScreen() {
  const onboarding = useOnboarding();
  const [feeAsset, setFeeAsset] = useState<FeeAsset>('ORE');
  const [isFeeAssetOpen, setIsFeeAssetOpen] = useState(false);

  return (
    <OnboardingShell
      step={2}
      totalSteps={6}
      eyebrow="Create account"
      title="Set up a clean ORE wallet profile with a modern recovery path.">
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
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceCopy}>
            <Text style={styles.preferenceLabel}>Fee posture</Text>
            <Text style={styles.preferenceDetail}>
              Choose the default asset used to frame wallet fees.
            </Text>
          </View>
          <View style={styles.dropdownWrap}>
            <Pressable
              accessibilityLabel="Select fee asset"
              accessibilityRole="button"
              onPress={() => setIsFeeAssetOpen((current) => !current)}
              style={({ pressed }) => [styles.dropdownButton, pressed && styles.pressed]}>
              <GlassSurface style={styles.dropdownGlass} variant="subtle" showSheen={false} />
              <Text style={styles.dropdownValue}>{feeAsset}</Text>
              <Ionicons
                color={oreColors.text}
                name={isFeeAssetOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
              />
            </Pressable>
            {isFeeAssetOpen ? (
              <GlassSurface style={styles.dropdownMenu} variant="subtle" showSheen={false}>
                {feeAssets.map((asset) => (
                  <Pressable
                    accessibilityRole="button"
                    key={asset}
                    onPress={() => {
                      setFeeAsset(asset);
                      setIsFeeAssetOpen(false);
                    }}
                    style={({ pressed }) => [styles.dropdownOption, pressed && styles.optionPressed]}>
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        feeAsset === asset && styles.dropdownOptionTextActive,
                      ]}>
                      {asset}
                    </Text>
                    {feeAsset === asset ? (
                      <Ionicons color={oreColors.accent} name="checkmark" size={15} />
                    ) : null}
                  </Pressable>
                ))}
              </GlassSurface>
            ) : null}
          </View>
        </View>
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
  preferenceRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: oreSpacing.md,
    justifyContent: 'space-between',
    paddingTop: oreSpacing.md,
    zIndex: 2,
  },
  preferenceCopy: {
    flex: 1,
    gap: 6,
    paddingRight: oreSpacing.sm,
  },
  preferenceLabel: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  preferenceDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  dropdownWrap: {
    minWidth: 112,
    zIndex: 3,
  },
  dropdownButton: {
    alignItems: 'center',
    borderColor: oreColors.stroke,
    borderRadius: oreRadii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    minHeight: 42,
    overflow: 'hidden',
    paddingHorizontal: 14,
  },
  dropdownGlass: {
    ...StyleSheet.absoluteFillObject,
  },
  dropdownValue: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  dropdownMenu: {
    borderRadius: oreRadii.lg,
    gap: 2,
    marginTop: 8,
    overflow: 'hidden',
    padding: 6,
  },
  dropdownOption: {
    alignItems: 'center',
    borderRadius: oreRadii.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 34,
    paddingHorizontal: 10,
  },
  dropdownOptionText: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  dropdownOptionTextActive: {
    color: oreColors.accent,
  },
  optionPressed: {
    backgroundColor: oreColors.surfacePressed,
  },
  pressed: {
    opacity: 0.82,
  },
  actions: {
    gap: oreSpacing.sm,
  },
});

import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FormField } from '../../components/form-field';
import { GlassSurface } from '../../components/glass-surface';
import { OnboardingIllustration } from '../../components/onboarding-illustration';
import { OnboardingShell } from '../../components/onboarding-shell';
import { PrimaryButton } from '../../components/primary-button';
import { SecondaryButton } from '../../components/secondary-button';
import { StatCard } from '../../components/stat-card';
import { oreColors, oreRadii, oreSpacing, oreTypography } from '../../constants/theme';
import { useOnboarding } from '../../lib/onboarding-store';

const suggestions = ['ore.avery', 'vault.avery', 'sovlane', 'orelane'];

export default function ChooseUsernameScreen() {
  const onboarding = useOnboarding();

  return (
    <OnboardingShell
      step={3}
      totalSteps={6}
      eyebrow="Choose a username"
      title="Pick the handle people will see when you send or receive ORE."
      description="This is purely dummy identity data for the mock wallet profile."
      illustration={<OnboardingIllustration variant="username" />}>
      <StatCard>
        <FormField
          label="Username"
          value={onboarding.username}
          onChangeText={(value) => onboarding.updateField('username', value)}
          placeholder="ore.avery"
          helper="Handles stay lowercase and can be changed later in the concept app."
        />
        <View style={styles.suggestionRow}>
          {suggestions.map((suggestion) => (
            <Pressable
              key={suggestion}
              onPress={() => onboarding.updateField('username', suggestion)}
              style={({ pressed }) => [
                styles.suggestion,
                onboarding.username === suggestion ? styles.suggestionActive : null,
                pressed ? styles.suggestionPressed : null,
              ]}>
              <GlassSurface
                variant={onboarding.username === suggestion ? 'hero' : 'subtle'}
                style={styles.suggestionGlass}
                showSheen={false}
              />
              <Text
                style={[
                  styles.suggestionLabel,
                  onboarding.username === suggestion ? styles.suggestionLabelActive : null,
                ]}>
                @{suggestion}
              </Text>
            </Pressable>
          ))}
        </View>
      </StatCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Continue"
          onPress={() => router.push('/(onboarding)/enable-notifications')}
        />
        <SecondaryButton label="Back" onPress={() => router.back()} />
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
  },
  suggestion: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: oreRadii.pill,
    paddingHorizontal: oreSpacing.sm,
    paddingVertical: oreSpacing.xs,
  },
  suggestionGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: oreRadii.pill,
  },
  suggestionActive: {
    borderColor: oreColors.strokeStrong,
  },
  suggestionPressed: {
    opacity: 0.92,
  },
  suggestionLabel: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  suggestionLabelActive: {
    color: oreColors.accentStrong,
  },
  actions: {
    gap: oreSpacing.sm,
  },
});

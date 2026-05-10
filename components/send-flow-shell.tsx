import type { PropsWithChildren } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing } from '../constants/theme';
import type { SendKind } from '../lib/send-flow-data';
import { sendFlowCopy } from '../lib/send-flow-data';
import { Pill } from './pill';
import { ProgressDots } from './progress-dots';
import { Screen } from './screen';
import { SectionHeader } from './section-header';
import { GlassSurface } from './glass-surface';

type SendFlowShellProps = PropsWithChildren<{
  kind: SendKind;
  step: number;
  title: string;
  description: string;
}>;

export function SendFlowShell({
  kind,
  step,
  title,
  description,
  children,
}: SendFlowShellProps) {
  const router = useRouter();
  const copy = sendFlowCopy[kind];

  return (
    <Screen footerInset={176}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed ? styles.backButtonPressed : null]}>
          <GlassSurface variant="subtle" style={styles.backButtonGlass} showSheen={false} />
          <Ionicons name="chevron-back" size={18} color={oreColors.text} />
        </Pressable>
        <ProgressDots current={step} total={copy.totalSteps} />
        <Pill label={copy.shortLabel} tone="accent" />
      </View>

      <View style={styles.hero}>
        <SectionHeader
          eyebrow={copy.title}
          title={title}
          description={description}
          variant="hero"
        />
        <View style={styles.metaRow}>
          <Pill label={`Step ${step} of ${copy.totalSteps}`} />
          <Pill label="UI-only demo" />
        </View>
      </View>

      {children}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  backButton: {
    position: 'relative',
    overflow: 'hidden',
    width: 42,
    height: 42,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: oreRadii.pill,
  },
  backButtonPressed: {
    opacity: 0.92,
  },
  hero: {
    gap: oreSpacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
});

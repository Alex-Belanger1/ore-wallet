import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  oreColors,
  oreRadii,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import {
  formatAmountUsd,
  sendAmountPresets,
  sendFlowCopy,
  sendRecipientSuggestions,
  type SendKind,
} from '../lib/send-flow-data';
import { useSendFlow } from '../lib/send-flow-store';
import { FormField } from './form-field';
import { PrimaryButton } from './primary-button';
import { SectionHeader } from './section-header';
import { SecondaryButton } from './secondary-button';
import { SendFlowShell } from './send-flow-shell';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

const recipientRouteByKind: Record<SendKind, '/(send)/standard-recipient' | '/(send)/private-recipient'> = {
  standard: '/(send)/standard-recipient',
  private: '/(send)/private-recipient',
};

const amountRouteByKind: Record<SendKind, '/(send)/standard-amount' | '/(send)/private-amount'> = {
  standard: '/(send)/standard-amount',
  private: '/(send)/private-amount',
};

const reviewRouteByKind: Record<SendKind, '/(send)/standard-review' | '/(send)/private-review'> = {
  standard: '/(send)/standard-review',
  private: '/(send)/private-review',
};

const successRouteByKind: Record<SendKind, '/(send)/standard-success' | '/(send)/private-success'> = {
  standard: '/(send)/standard-success',
  private: '/(send)/private-success',
};

export function SendRecipientScreen({ kind }: { kind: SendKind }) {
  const router = useRouter();
  const { recipient, setRecipient } = useSendFlow();
  const ready = recipient.trim().length > 0;

  return (
    <SendFlowShell
      kind={kind}
      step={1}
      title="Choose a recipient"
      description="Enter any wallet address or @username. This preview accepts both so you can test the flow quickly.">
      <StatCard>
        <SectionHeader
          title="Wallet address or @username"
          description="Saved identities and long addresses both work in this dummy flow."
        />
        <FormField
          label="Recipient"
          value={recipient}
          onChangeText={setRecipient}
          placeholder="@maya.reserve or 7A4N...P2vk"
          helper="Demo only. Type any @username or address-like string."
          autoFocus
        />
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Recent recipients"
          description="Tap one to prefill a plausible recipient and keep moving."
        />
        <View style={styles.list}>
          {sendRecipientSuggestions.map((suggestion, index) => (
            <Pressable
              key={suggestion.value}
              onPress={() => setRecipient(suggestion.value)}
              style={({ pressed }) => [
                styles.listRow,
                index !== sendRecipientSuggestions.length - 1 ? styles.listDivider : null,
                pressed ? styles.listPressed : null,
              ]}>
              <View style={styles.listCopy}>
                <Text style={styles.listTitle}>{suggestion.title}</Text>
                <Text style={styles.listDetail}>{suggestion.detail}</Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color={oreColors.textMuted} />
            </Pressable>
          ))}
        </View>
      </StatCard>

      <View style={styles.footerRow}>
        <SecondaryButton label="Cancel" onPress={() => router.back()} style={styles.footerButton} />
        <PrimaryButton
          label="Continue"
          disabled={!ready}
          onPress={() => router.push(amountRouteByKind[kind])}
          style={styles.footerButton}
        />
      </View>
    </SendFlowShell>
  );
}

export function SendAmountScreen({ kind }: { kind: SendKind }) {
  const router = useRouter();
  const { recipient, amount, setAmount } = useSendFlow();
  const amountUsd = formatAmountUsd(amount);
  const numericAmount = Number.parseFloat(amount);
  const ready = Number.isFinite(numericAmount) && numericAmount > 0;
  const copy = sendFlowCopy[kind];

  return (
    <SendFlowShell
      kind={kind}
      step={2}
      title="Set the amount"
      description="Choose how much ORE should move through this preview transfer. The USD value shown is a dummy reference only.">
      <StatCard>
        <SectionHeader
          title="Amount in ORE"
          description="Use a clean round amount or tap one of the presets below."
        />
        <FormField
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          placeholder="12.50"
          helper={`Dummy conversion preview: ${amountUsd}`}
          keyboardType="decimal-pad"
          autoFocus
        />
        <View style={styles.presetRow}>
          {sendAmountPresets.map((preset) => (
            <Pressable
              key={preset}
              onPress={() => setAmount(preset)}
              style={({ pressed }) => [styles.preset, pressed ? styles.presetPressed : null]}>
              <Text style={styles.presetLabel}>{preset} ORE</Text>
            </Pressable>
          ))}
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Transfer context"
          description="These details stay visible so the flow feels grounded before review."
        />
        <View>
          <TokenRow
            label="Recipient"
            detail="Current destination from the prior step"
            value={recipient || '@recipient.pending'}
          />
          <TokenRow label="Reference price" detail="Dummy USD conversion marker" value="$39.90 / ORE" />
          <TokenRow label="Estimated fee" detail="UI-only preview fee" value={copy.fee} isLast />
        </View>
      </StatCard>

      <View style={styles.footerRow}>
        <SecondaryButton label="Back" onPress={() => router.back()} style={styles.footerButton} />
        <PrimaryButton
          label={kind === 'private' ? 'Privacy Step' : 'Review'}
          disabled={!ready}
          onPress={() =>
            router.push(kind === 'private' ? '/(send)/private-privacy' : reviewRouteByKind[kind])
          }
          style={styles.footerButton}
        />
      </View>
    </SendFlowShell>
  );
}

export function PrivateSendPrivacyScreen() {
  const router = useRouter();

  return (
    <SendFlowShell
      kind="private"
      step={3}
      title="Understand the private route"
      description="This is still a demo, but the extra step explains how a private send would feel inside the product before review.">
      <StatCard variant="hero">
        <SectionHeader
          eyebrow="Privacy explanation"
          title="Private send changes the route, not the intent."
          description="In a real product, the transfer would avoid looking like a direct wallet-to-wallet movement. Here, it is only explanatory UI."
        />
      </StatCard>

      <StatCard>
        <View>
          <TokenRow
            label="Step 1"
            detail="ORE enters a simulated privacy pool before delivery."
            value="Deposit"
          />
          <TokenRow
            label="Step 2"
            detail="The route is shielded so observers would not see a simple direct path."
            value="Shield"
          />
          <TokenRow
            label="Step 3"
            detail="The recipient sees delivered funds after the private route settles."
            value="Deliver"
            isLast
          />
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="What this does not do yet"
          description="No privacy SDK, no relayer, and no proving system are connected in this app."
        />
        <Text style={styles.explainerText}>
          Treat this screen as product UX only. It exists to validate copy, pacing, and user understanding before any real integration work begins.
        </Text>
      </StatCard>

      <View style={styles.footerRow}>
        <SecondaryButton label="Back" onPress={() => router.back()} style={styles.footerButton} />
        <PrimaryButton
          label="Continue to Review"
          onPress={() => router.push('/(send)/private-review')}
          style={styles.footerButton}
        />
      </View>
    </SendFlowShell>
  );
}

export function SendReviewScreen({ kind }: { kind: SendKind }) {
  const router = useRouter();
  const { recipient, amount } = useSendFlow();
  const copy = sendFlowCopy[kind];
  const amountUsd = formatAmountUsd(amount);
  const recipientLabel = recipient || '@recipient.pending';
  const amountLabel = amount ? `${amount} ORE` : '0.00 ORE';

  return (
    <SendFlowShell
      kind={kind}
      step={kind === 'private' ? 4 : 3}
      title="Review the transfer"
      description="Final confirmation is still dummy-only, but the information architecture matches a real send flow.">
      <StatCard variant="hero">
        <SectionHeader
          eyebrow="Sending"
          title={amountLabel}
          description={`${amountUsd} reference value`}
        />
      </StatCard>

      <StatCard>
        <SectionHeader title="Transfer summary" description="Review recipient, route, and delivery posture before continuing." />
        <View>
          <TokenRow label="Recipient" detail="Wallet address or @username" value={recipientLabel} />
          <TokenRow label="Route" detail="How this send moves through the product" value={copy.route} />
          <TokenRow label="Estimated fee" detail="Dummy preview only" value={copy.fee} />
          <TokenRow label="Arrival" detail="Expected timing for this demo flow" value={copy.arrival} />
          <TokenRow label="Visibility" detail="How the transfer would present" value={copy.visibility} isLast />
        </View>
      </StatCard>

      <View style={styles.footerRow}>
        <SecondaryButton label="Back" onPress={() => router.back()} style={styles.footerButton} />
        <PrimaryButton
          label={kind === 'private' ? 'Private Send' : 'Send ORE'}
          onPress={() => router.push(successRouteByKind[kind])}
          style={styles.footerButton}
        />
      </View>
    </SendFlowShell>
  );
}

export function SendSuccessScreen({ kind }: { kind: SendKind }) {
  const router = useRouter();
  const { recipient, amount, reset, startFlow } = useSendFlow();
  const copy = sendFlowCopy[kind];
  const amountLabel = amount ? `${amount} ORE` : '0.00 ORE';

  return (
    <SendFlowShell
      kind={kind}
      step={copy.totalSteps}
      title="Transfer preview complete"
      description="This confirmation screen closes the dummy flow the same way a production wallet would.">
      <StatCard variant="hero">
        <View style={styles.successBadge}>
          <Ionicons name="checkmark" size={20} color="#161108" />
        </View>
        <SectionHeader
          eyebrow="Success"
          title={amountLabel}
          description={`Sent to ${recipient || '@recipient.pending'}`}
        />
        <Text style={styles.explainerText}>{copy.successNote}</Text>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="What happened in this demo"
          description="You just completed the full UI path from Home to confirmation without touching any real wallet infrastructure."
        />
      </StatCard>

      <View style={styles.footerRow}>
        <SecondaryButton
          label="Send Another"
          onPress={() => {
            startFlow(kind);
            router.replace(recipientRouteByKind[kind]);
          }}
          style={styles.footerButton}
        />
        <PrimaryButton
          label="Back to Home"
          onPress={() => {
            reset();
            router.replace('/(tabs)');
          }}
          style={styles.footerButton}
        />
      </View>
    </SendFlowShell>
  );
}

const styles = StyleSheet.create({
  list: {
    borderRadius: oreRadii.lg,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: oreColors.surface,
    overflow: 'hidden',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: oreSpacing.sm,
    paddingHorizontal: oreSpacing.md,
    paddingVertical: oreSpacing.md,
  },
  listDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  listPressed: {
    backgroundColor: oreColors.surfacePressed,
  },
  listCopy: {
    flex: 1,
    gap: oreSpacing.xxs,
  },
  listTitle: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '700',
  },
  listDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  preset: {
    borderRadius: oreRadii.pill,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: oreColors.surfaceMuted,
    paddingHorizontal: oreSpacing.md,
    paddingVertical: oreSpacing.sm,
  },
  presetPressed: {
    backgroundColor: oreColors.surfacePressed,
  },
  presetLabel: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  footerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  footerButton: {
    flexGrow: 1,
    flexBasis: 180,
  },
  explainerText: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  successBadge: {
    width: 44,
    height: 44,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: oreColors.accent,
  },
});

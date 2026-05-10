import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { privacyData } from '../lib/privacy-data';
import { Pill } from './pill';
import { PrimaryButton } from './primary-button';
import { PrivacyLevelIndicator } from './privacy-level-indicator';
import { Screen } from './screen';
import { SecondaryButton } from './secondary-button';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

function FlowCard({
  title,
  badge,
  summary,
  helper,
  primaryAction,
  secondaryAction,
  stats,
  steps,
}: (typeof privacyData)['depositFlow']) {
  return (
    <StatCard variant="subtle" style={styles.flowCard}>
      <View style={styles.flowHeader}>
        <Text style={styles.flowTitle}>{title}</Text>
        <Pill label={badge} tone="accent" />
      </View>
      <Text style={styles.flowSummary}>{summary}</Text>

      <View style={styles.flowStats}>
        {stats.map((item) => (
          <View key={item.label} style={styles.flowStat}>
            <Text style={styles.flowStatLabel}>{item.label}</Text>
            <Text style={styles.flowStatValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.stepList}>
        {steps.map((step, index) => (
          <View key={step.title} style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberLabel}>{index + 1}</Text>
            </View>
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepBody}>{step.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.flowHelper}>{helper}</Text>

      <View style={styles.flowActions}>
        <PrimaryButton label={primaryAction} style={styles.flowActionButton} />
        <SecondaryButton label={secondaryAction} style={styles.flowActionButton} />
      </View>
    </StatCard>
  );
}

export function PrivacyScreenView() {
  const data = privacyData;

  return (
    <Screen>
      <SectionHeader
        eyebrow={data.greeting}
        title={data.title}
        description={data.subtitle}
        trailing={<Pill label="Demo privacy mode" tone="accent" />}
        variant="hero"
      />

      <StatCard variant="hero">
        <View style={styles.balanceHeader}>
          <View style={styles.balanceCopy}>
            <Text style={styles.balanceEyebrow}>Private balance card</Text>
            <Text style={styles.balanceValue}>{data.balance.privateOre}</Text>
            <Text style={styles.balanceHelper}>{data.balance.helper}</Text>
            <View style={styles.balanceTags}>
              <Pill label={data.balance.note} tone="accent" />
            </View>
          </View>

          <PrivacyLevelIndicator
            score={data.balance.privacyScore}
            level={data.balance.privacyLevel}
          />
        </View>

        <View style={styles.metricGrid}>
          {data.metrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text
                style={[
                  styles.metricValue,
                  metric.tone === 'accent'
                    ? styles.metricValueAccent
                    : metric.tone === 'positive'
                      ? styles.metricValuePositive
                      : null,
                ]}>
                {metric.value}
              </Text>
              <Text style={styles.metricDetail}>{metric.detail}</Text>
            </View>
          ))}
        </View>

        <View>
          <TokenRow
            label="Available to send"
            detail="Settled private ORE currently modeled as ready for discreet transfers."
            value={data.balance.availableToSend}
            tone="accent"
          />
          <TokenRow
            label="Pending in pool"
            detail="Balance still within the demo pool window before it becomes transferable."
            value={data.balance.pendingInPool}
            isLast
          />
        </View>
      </StatCard>

      <FlowCard {...data.depositFlow} />

      <FlowCard {...data.transferFlow} />

      <StatCard>
        <SectionHeader
          title="Recent private transfers"
          description="A masked activity ledger that stays useful without becoming loud."
          trailing={<Pill label="Dummy history" />}
        />
        <View>
          {data.transfers.map((transfer, index) => (
            <TokenRow
              key={transfer.title}
              label={transfer.title}
              detail={transfer.detail}
              value={transfer.value}
              tone={transfer.tone ?? 'default'}
              isLast={index === data.transfers.length - 1}
            />
          ))}
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          eyebrow="Disclosure"
          title={data.disclosure.title}
          description={data.disclosure.body}
        />
        <View>
          {data.disclosure.notes.map((note, index) => (
            <View
              key={note.title}
              style={[styles.disclosureItem, index < data.disclosure.notes.length - 1 ? styles.disclosureDivider : null]}>
              <View style={styles.disclosureHeader}>
                <Text style={styles.disclosureTitle}>{note.title}</Text>
                <Pill label={note.tag} tone={note.tone === 'accent' ? 'accent' : 'default'} />
              </View>
              <Text style={styles.disclosureBody}>{note.body}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.disclosureFooter}>{data.disclosure.footer}</Text>
      </StatCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.lg,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  balanceCopy: {
    flex: 1,
    minWidth: 200,
    gap: oreSpacing.xs,
  },
  balanceEyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  balanceValue: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  balanceHelper: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  balanceTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
    marginTop: oreSpacing.xs,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  metricCard: {
    flexGrow: 1,
    flexBasis: 150,
    minWidth: 140,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: oreSpacing.md,
    gap: oreSpacing.xs - 1,
  },
  metricLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  metricValue: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  metricValueAccent: {
    color: oreColors.accentStrong,
  },
  metricValuePositive: {
    color: oreColors.positive,
  },
  metricDetail: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  flowCard: {
    gap: oreSpacing.md,
  },
  flowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
  },
  flowTitle: {
    ...oreTypography.title,
    color: oreColors.text,
    flex: 1,
  },
  flowSummary: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  flowStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  flowStat: {
    flexGrow: 1,
    flexBasis: 120,
    minWidth: 110,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: oreSpacing.sm,
    gap: oreSpacing.xs - 1,
  },
  flowStatLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  flowStatValue: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  stepList: {
    gap: oreSpacing.sm,
  },
  stepCard: {
    flexDirection: 'row',
    gap: oreSpacing.sm,
    alignItems: 'flex-start',
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.025)',
    padding: oreSpacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: oreColors.accentSoft,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
    marginTop: 1,
  },
  stepNumberLabel: {
    ...oreTypography.caption,
    color: oreColors.accentStrong,
  },
  stepCopy: {
    flex: 1,
    gap: oreSpacing.xxs,
  },
  stepTitle: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
  },
  stepBody: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  flowHelper: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  flowActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  flowActionButton: {
    flexGrow: 1,
    flexBasis: 160,
  },
  disclosureItem: {
    gap: oreSpacing.xs,
    paddingVertical: oreSpacing.sm + 2,
  },
  disclosureDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  disclosureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
    flexWrap: 'wrap',
  },
  disclosureTitle: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
    flex: 1,
  },
  disclosureBody: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  disclosureFooter: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
});

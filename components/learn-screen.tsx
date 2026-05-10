import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { learnData, type LearnExplainer } from '../lib/learn-data';
import { Pill } from './pill';
import { Screen } from './screen';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';

function ExplainerCard({
  title,
  tag,
  readTime,
  summary,
  bullets,
  tone = 'default',
}: LearnExplainer) {
  return (
    <StatCard
      variant={tone === 'accent' ? 'hero' : 'subtle'}
      style={styles.explainerCard}>
      <View style={styles.explainerHeader}>
        <Text style={styles.explainerTitle}>{title}</Text>
        <Pill label={`${tag} | ${readTime}`} tone={tone === 'accent' ? 'accent' : 'default'} />
      </View>
      <Text style={styles.explainerSummary}>{summary}</Text>
      <View style={styles.bulletList}>
        {bullets.map((bullet) => (
          <View key={bullet} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
      </View>
    </StatCard>
  );
}

export function LearnScreenView() {
  const data = learnData;

  return (
    <Screen>
      <SectionHeader
        eyebrow={data.greeting}
        title={data.title}
        description={data.subtitle}
        trailing={<Pill label="Educational copy" tone="accent" />}
        variant="hero"
      />

      <StatCard variant="hero">
        <SectionHeader
          title={data.overview.title}
          description={data.overview.body}
          trailing={<Pill label="Start here" tone="accent" />}
        />
        <View style={styles.overviewMetrics}>
          {data.overview.metrics.map((item) => (
            <View key={item.label} style={styles.metricCard}>
              <Text style={styles.metricLabel}>{item.label}</Text>
              <Text style={styles.metricValue}>{item.value}</Text>
              <Text style={styles.metricDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.overviewNote}>{data.overview.note}</Text>
      </StatCard>

      <View style={styles.explainerGrid}>
        {data.explainers.map((item) => (
          <ExplainerCard key={item.title} {...item} />
        ))}
      </View>

      <StatCard>
        <SectionHeader
          title="Risks and disclaimers"
          description="These points help keep the learning surface grounded."
          trailing={<Pill label="No hype" />}
        />
        <View>
          {data.disclosures.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.disclosureItem,
                index < data.disclosures.length - 1 ? styles.disclosureDivider : null,
              ]}>
              <View style={styles.disclosureHeader}>
                <Text style={styles.disclosureTitle}>{item.title}</Text>
                <Pill label={item.tag} tone={item.tone === 'accent' ? 'accent' : 'default'} />
              </View>
              <Text style={styles.disclosureBody}>{item.body}</Text>
            </View>
          ))}
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Glossary"
          description="Quick definitions for terms used elsewhere in the app."
        />
        <View style={styles.glossaryGrid}>
          {data.glossary.map((item) => (
            <View key={item.term} style={styles.glossaryCard}>
              <Text style={styles.glossaryTerm}>{item.term}</Text>
              <Text style={styles.glossaryDefinition}>{item.definition}</Text>
            </View>
          ))}
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          title="FAQs"
          description="Short answers to the questions new users usually ask first."
        />
        <View>
          {data.faqs.map((item, index) => (
            <View
              key={item.question}
              style={[styles.faqItem, index < data.faqs.length - 1 ? styles.faqDivider : null]}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>
      </StatCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  overviewMetrics: {
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
  metricDetail: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  overviewNote: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  explainerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  explainerCard: {
    flexGrow: 1,
    flexBasis: '47%',
    minWidth: 220,
  },
  explainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
    flexWrap: 'wrap',
  },
  explainerTitle: {
    ...oreTypography.title,
    color: oreColors.text,
    flex: 1,
  },
  explainerSummary: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  bulletList: {
    gap: oreSpacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.accent,
    marginTop: 6,
  },
  bulletText: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    flex: 1,
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
  glossaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  glossaryCard: {
    flexGrow: 1,
    flexBasis: '47%',
    minWidth: 180,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: oreSpacing.md,
    gap: oreSpacing.xs - 1,
  },
  glossaryTerm: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  glossaryDefinition: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  faqItem: {
    gap: oreSpacing.xs,
    paddingVertical: oreSpacing.sm + 2,
  },
  faqDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  faqQuestion: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
  },
  faqAnswer: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
});

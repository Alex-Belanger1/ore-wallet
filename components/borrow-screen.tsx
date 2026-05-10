import type { ValueTone } from '../lib/dummy-data';
import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { borrowData } from '../lib/borrow-data';
import { BorrowCalculator } from './borrow-calculator';
import { Pill } from './pill';
import { PrimaryButton } from './primary-button';
import { Screen } from './screen';
import { SecondaryButton } from './secondary-button';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

type DashboardMetricProps = {
  label: string;
  value: string;
  detail: string;
  tone?: ValueTone;
};

const valueToneStyles = StyleSheet.create({
  default: {
    color: oreColors.text,
  },
  accent: {
    color: oreColors.accentStrong,
  },
  positive: {
    color: oreColors.positive,
  },
  warning: {
    color: oreColors.warning,
  },
});

function DashboardMetric({
  label,
  value,
  detail,
  tone = 'default',
}: DashboardMetricProps) {
  return (
    <View style={styles.dashboardMetric}>
      <Text style={styles.dashboardMetricLabel}>{label}</Text>
      <Text style={[styles.dashboardMetricValue, valueToneStyles[tone]]}>{value}</Text>
      <Text style={styles.dashboardMetricDetail}>{detail}</Text>
    </View>
  );
}

export function BorrowScreenView() {
  const data = borrowData;

  return (
    <Screen>
      <SectionHeader
        eyebrow={data.greeting}
        title={data.title}
        description={data.subtitle}
        trailing={<Pill label="Dummy credit desk" tone="accent" />}
        variant="hero"
      />

      <StatCard variant="hero">
        <View style={styles.dashboardHeader}>
          <View style={styles.dashboardCopy}>
            <Text style={styles.dashboardEyebrow}>Borrow dashboard</Text>
            <Text style={styles.dashboardValue}>{data.dashboard.availableCredit}</Text>
            <Text style={styles.dashboardHelper}>{data.dashboard.helper}</Text>
            <View style={styles.dashboardTags}>
              <Pill label={data.dashboard.status} tone="accent" />
            </View>
          </View>

          <View style={styles.gaugeShell}>
            <View style={styles.gaugeRing}>
              <View style={styles.gaugeArc} />
              <View style={styles.gaugeInner}>
                <Text style={styles.gaugeValue}>{data.dashboard.ltv}</Text>
                <Text style={styles.gaugeLabel}>Current LTV</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.metricGrid}>
          <DashboardMetric
            label="Health factor"
            value={data.dashboard.healthFactor}
            detail="Well above the dummy alert band."
            tone="positive"
          />
          <DashboardMetric
            label="Posted collateral"
            value={data.dashboard.collateralPosted}
            detail={data.dashboard.collateralValue}
            tone="accent"
          />
          <DashboardMetric
            label="Modeled buffer"
            value={data.dashboard.liquidationBuffer}
            detail={data.dashboard.safetyBand}
          />
        </View>
      </StatCard>

      <View style={styles.actionRow}>
        <PrimaryButton label={data.actions.primary} style={styles.actionButton} />
        <SecondaryButton label={data.actions.secondary} style={styles.actionButton} />
      </View>

      <View style={styles.productGrid}>
        {data.products.map((product) => (
          <StatCard
            key={product.title}
            variant={product.tone === 'accent' ? 'hero' : 'subtle'}
            style={styles.productCard}>
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Pill
                label={product.edge}
                tone={product.tone === 'accent' ? 'accent' : 'default'}
              />
            </View>
            <Text style={styles.productDetail}>{product.detail}</Text>
            <View style={styles.productFacts}>
              <View style={styles.productFact}>
                <Text style={styles.productFactLabel}>Pricing</Text>
                <Text style={styles.productFactValue}>{product.rate}</Text>
              </View>
              <View style={styles.productFact}>
                <Text style={styles.productFactLabel}>Borrowing room</Text>
                <Text style={styles.productFactValue}>{product.maxLtv}</Text>
              </View>
            </View>
            <Text style={styles.productIdealFor}>Ideal for: {product.idealFor}</Text>
          </StatCard>
        ))}
      </View>

      <BorrowCalculator calculator={data.calculator} />

      <StatCard>
        <SectionHeader
          title="Aggregated opportunities"
          description="Placeholder providers ranked across rate, structure, and collateral posture."
          trailing={<Pill label="Placeholder providers" />}
        />
        <View>
          {data.opportunities.map((item, index) => (
            <View
              key={item.provider}
              style={[
                styles.opportunityRow,
                index < data.opportunities.length - 1 ? styles.opportunityDivider : null,
              ]}>
              <View style={styles.opportunityCopy}>
                <View style={styles.opportunityHeader}>
                  <Text style={styles.opportunityTitle}>{item.provider}</Text>
                  <Pill label={item.riskTag} tone={item.tone === 'accent' ? 'accent' : 'default'} />
                </View>
                <Text style={styles.opportunityProduct}>{item.product}</Text>
                <Text style={styles.opportunityNote}>{item.note}</Text>
              </View>
              <View style={styles.opportunityMeta}>
                <Text style={[styles.opportunityValue, valueToneStyles[item.tone ?? 'default']]}>
                  {item.rate}
                </Text>
                <Text style={styles.opportunityMetaLabel}>{item.maxLtv}</Text>
              </View>
            </View>
          ))}
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Lend idle ORE"
          description={data.lending.headline}
          trailing={<Pill label="Dummy rates" tone="accent" />}
        />
        <View>
          {data.lending.rates.map((item, index) => (
            <TokenRow
              key={item.title}
              label={item.title}
              detail={item.detail}
              value={item.value}
              tone={item.tone ?? 'default'}
              isLast={index === data.lending.rates.length - 1}
            />
          ))}
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          eyebrow="Risk explanations"
          title={data.education.title}
          description={data.education.body}
        />
        <View>
          {data.education.notes.map((note, index) => (
            <View
              key={note.title}
              style={[styles.riskItem, index < data.education.notes.length - 1 ? styles.riskDivider : null]}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskTitle}>{note.title}</Text>
                <Pill label={note.tag} tone={note.tone === 'accent' ? 'accent' : 'default'} />
              </View>
              <Text style={styles.riskBody}>{note.body}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.riskFooter}>{data.education.footer}</Text>
      </StatCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: oreSpacing.lg,
    flexWrap: 'wrap',
  },
  dashboardCopy: {
    flex: 1,
    minWidth: 200,
    gap: oreSpacing.xs,
  },
  dashboardEyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  dashboardValue: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  dashboardHelper: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  dashboardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
    marginTop: oreSpacing.xs,
  },
  gaugeShell: {
    flexGrow: 1,
    minWidth: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeRing: {
    width: 176,
    height: 176,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 12,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.03)',
    position: 'relative',
  },
  gaugeArc: {
    position: 'absolute',
    top: -12,
    right: -12,
    bottom: -12,
    left: -12,
    borderRadius: oreRadii.pill,
    borderWidth: 12,
    borderTopColor: oreColors.accentStrong,
    borderRightColor: oreColors.accent,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '20deg' }],
  },
  gaugeInner: {
    width: 124,
    height: 124,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: oreSpacing.xxs,
    backgroundColor: oreColors.backgroundRaised,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  gaugeValue: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  gaugeLabel: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  dashboardMetric: {
    flexGrow: 1,
    flexBasis: 150,
    minWidth: 140,
    borderRadius: oreRadii.md,
    padding: oreSpacing.md,
    gap: oreSpacing.xs - 1,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  dashboardMetricLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  dashboardMetricValue: {
    ...oreTypography.title,
  },
  dashboardMetricDetail: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  actionButton: {
    flexGrow: 1,
    flexBasis: 160,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  productCard: {
    flexGrow: 1,
    flexBasis: '47%',
    minWidth: 220,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
  },
  productTitle: {
    ...oreTypography.title,
    color: oreColors.text,
    flex: 1,
  },
  productDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  productFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  productFact: {
    flexGrow: 1,
    flexBasis: 120,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: oreSpacing.sm,
    gap: oreSpacing.xs - 1,
  },
  productFactLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  productFactValue: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  productIdealFor: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  opportunityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
    paddingVertical: oreSpacing.sm + 2,
  },
  opportunityDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  opportunityCopy: {
    flex: 1,
    gap: oreSpacing.xs - 1,
  },
  opportunityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
    flexWrap: 'wrap',
  },
  opportunityTitle: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
    flex: 1,
  },
  opportunityProduct: {
    ...oreTypography.caption,
    color: oreColors.accentStrong,
  },
  opportunityNote: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  opportunityMeta: {
    minWidth: 96,
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: oreSpacing.xxs,
  },
  opportunityValue: {
    ...oreTypography.title,
    textAlign: 'right',
  },
  opportunityMetaLabel: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
    textAlign: 'right',
  },
  riskItem: {
    gap: oreSpacing.xs,
    paddingVertical: oreSpacing.sm + 2,
  },
  riskDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
    flexWrap: 'wrap',
  },
  riskTitle: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
    flex: 1,
  },
  riskBody: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  riskFooter: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
});

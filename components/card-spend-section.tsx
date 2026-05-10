import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  oreColors,
  oreRadii,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import {
  cardSpendData,
  type SpendExperience,
  type SpendMode,
} from '../lib/card-spend-data';
import { OreMark } from './ore-mark';
import { Pill } from './pill';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

const modeOptions: SpendMode[] = ['debit', 'credit'];

export function CardSpendSection() {
  const [mode, setMode] = useState<SpendMode>('debit');
  const experience: SpendExperience = cardSpendData.modes[mode];

  return (
    <View style={styles.section}>
      <SectionHeader
        eyebrow={cardSpendData.eyebrow}
        title={cardSpendData.title}
        description={cardSpendData.subtitle}
        trailing={<Pill label="Concept only" tone="accent" />}
      />

      <StatCard variant="hero">
        <View style={styles.heroLayout}>
          <View style={styles.cardMockup}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardType}>{cardSpendData.card.typeLabel}</Text>
              <OreMark size={34} />
            </View>

            <View style={styles.cardCenter}>
              <View style={styles.cardChip} />
              <Text style={styles.cardNumber}>3921 77XX XXXX {cardSpendData.card.last4}</Text>
            </View>

            <View style={styles.cardBottomRow}>
              <View style={styles.cardMetaBlock}>
                <Text style={styles.cardMetaLabel}>Cardholder</Text>
                <Text style={styles.cardMetaValue}>{cardSpendData.card.holder}</Text>
              </View>
              <View style={styles.cardMetaBlock}>
                <Text style={styles.cardMetaLabel}>Expiry</Text>
                <Text style={styles.cardMetaValue}>{cardSpendData.card.expiry}</Text>
              </View>
              <Text style={styles.cardBrand}>{cardSpendData.card.networkLabel}</Text>
            </View>
          </View>

          <View style={styles.heroCopy}>
            <View style={styles.heroHeader}>
              <Text style={styles.heroTitle}>{cardSpendData.card.name}</Text>
              <Pill label={experience.label} tone="accent" />
            </View>

            <Text style={styles.balanceLabel}>{experience.spendableLabel}</Text>
            <Text style={styles.balanceValue}>{experience.spendableBalance}</Text>
            <Text style={styles.balanceDetail}>{experience.source}</Text>

            <View style={styles.modeToggle}>
              {modeOptions.map((option) => {
                const selected = option === mode;
                const label = option === 'debit' ? 'Debit concept' : 'Credit concept';

                return (
                  <Pressable
                    key={option}
                    onPress={() => setMode(option)}
                    style={[
                      styles.modeButton,
                      selected ? styles.modeButtonActive : null,
                    ]}>
                    <Text
                      style={[
                        styles.modeButtonLabel,
                        selected ? styles.modeButtonLabelActive : null,
                      ]}>
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.modeFootnote}>{experience.footnote}</Text>
          </View>
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title={cardSpendData.creditConcept.title}
          description={cardSpendData.creditConcept.detail}
          trailing={<Pill label="Future line" tone="accent" />}
        />

        <View style={styles.conceptFacts}>
          <View style={styles.conceptFact}>
            <Text style={styles.conceptFactLabel}>Line available</Text>
            <Text style={styles.conceptFactValue}>{cardSpendData.creditConcept.lineAvailable}</Text>
          </View>
          <View style={styles.conceptFact}>
            <Text style={styles.conceptFactLabel}>Collateral posture</Text>
            <Text style={styles.conceptFactValue}>
              {cardSpendData.creditConcept.collateralPosture}
            </Text>
          </View>
          <View style={styles.conceptFact}>
            <Text style={styles.conceptFactLabel}>Status</Text>
            <Text style={styles.conceptFactValue}>{cardSpendData.creditConcept.rateNote}</Text>
          </View>
        </View>

        <Text style={styles.conceptDisclaimer}>{cardSpendData.creditConcept.disclaimer}</Text>
      </StatCard>

      <StatCard>
        <SectionHeader
          title="Card activity"
          description={experience.ledgerDescription}
          trailing={<Pill label="Dummy merchants" />}
        />
        <View>
          {experience.transactions.map((transaction, index) => (
            <TokenRow
              key={`${mode}-${transaction.merchant}-${index}`}
              label={transaction.merchant}
              detail={transaction.detail}
              value={transaction.amount}
              isLast={index === experience.transactions.length - 1}
            />
          ))}
        </View>
      </StatCard>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: oreSpacing.md,
  },
  heroLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.lg,
    alignItems: 'stretch',
  },
  cardMockup: {
    flexGrow: 1,
    flexBasis: 260,
    minHeight: 220,
    borderRadius: oreRadii.xl,
    overflow: 'hidden',
    padding: oreSpacing.lg,
    justifyContent: 'space-between',
    backgroundColor: '#121419',
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: oreSpacing.sm,
  },
  cardType: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  cardCenter: {
    gap: oreSpacing.sm,
  },
  cardChip: {
    width: 44,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(246, 241, 231, 0.16)',
    borderWidth: 1,
    borderColor: oreColors.stroke,
  },
  cardNumber: {
    ...oreTypography.title,
    color: oreColors.text,
    letterSpacing: 1.2,
  },
  cardBottomRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: oreSpacing.md,
  },
  cardMetaBlock: {
    gap: oreSpacing.xxs,
  },
  cardMetaLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  cardMetaValue: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  cardBrand: {
    ...oreTypography.button,
    color: oreColors.accentStrong,
    marginLeft: 'auto',
  },
  heroCopy: {
    flex: 1,
    minWidth: 220,
    gap: oreSpacing.sm,
    justifyContent: 'center',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
    flexWrap: 'wrap',
  },
  heroTitle: {
    ...oreTypography.title,
    color: oreColors.text,
    flex: 1,
  },
  balanceLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  balanceValue: {
    ...oreTypography.metric,
    color: oreColors.text,
  },
  balanceDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  modeToggle: {
    flexDirection: 'row',
    gap: oreSpacing.xs,
    padding: oreSpacing.xxs,
    borderRadius: oreRadii.pill,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignSelf: 'stretch',
    width: '100%',
  },
  modeButton: {
    flex: 1,
    minWidth: 112,
    minHeight: 38,
    borderRadius: oreRadii.pill,
    paddingHorizontal: oreSpacing.sm,
    paddingVertical: oreSpacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: oreColors.accentSoft,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  modeButtonLabel: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
    textAlign: 'center',
  },
  modeButtonLabelActive: {
    color: oreColors.accentStrong,
  },
  modeFootnote: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  conceptFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  conceptFact: {
    flexGrow: 1,
    flexBasis: 140,
    minWidth: 120,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: oreSpacing.md,
    gap: oreSpacing.xs - 1,
  },
  conceptFactLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  conceptFactValue: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  conceptDisclaimer: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
});

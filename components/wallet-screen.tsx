import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreSpacing, oreTypography } from '../constants/theme';
import { walletScreens, type ScreenKey } from '../lib/dummy-data';
import { EmptyState } from './empty-state';
import { OreMark } from './ore-mark';
import { Pill } from './pill';
import { PrimaryButton } from './primary-button';
import { Screen } from './screen';
import { SecondaryButton } from './secondary-button';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

type WalletScreenProps = {
  screenKey: ScreenKey;
};

export function WalletScreen({ screenKey }: WalletScreenProps) {
  const screen = walletScreens[screenKey];

  return (
    <Screen>
      <SectionHeader
        eyebrow={screen.eyebrow}
        title={screen.title}
        description={screen.subtitle}
        trailing={<OreMark />}
        variant="hero"
      />

      <StatCard
        variant="hero"
        eyebrow={screen.hero.label}
        value={screen.hero.value}
        detail={screen.hero.detail}>
        <Text style={styles.heroChange}>{screen.hero.change}</Text>
        <View style={styles.pillRow}>
          {screen.hero.tags.map((tag, index) => (
            <Pill key={tag} label={tag} tone={index === 0 ? 'accent' : 'default'} />
          ))}
        </View>
        <View style={styles.buttonRow}>
          <PrimaryButton label={screen.hero.cta} style={styles.buttonFlex} />
          <SecondaryButton label="View placeholder flow" style={styles.buttonFlex} />
        </View>
      </StatCard>

      <View style={styles.metricGrid}>
        {screen.metrics.map((metric) => (
          <StatCard
            key={metric.label}
            variant="subtle"
            eyebrow={metric.label}
            value={metric.value}
            detail={metric.note}
            style={styles.metricCard}
          />
        ))}
      </View>

      {screen.sections.map((section) => (
        <StatCard key={section.title}>
          <SectionHeader title={section.title} description={section.description} />
          <View>
            {section.rows.map((row, index) => (
              <TokenRow
                key={row.label}
                label={row.label}
                detail={row.detail}
                value={row.value}
                tone={row.tone}
                isLast={index === section.rows.length - 1}
              />
            ))}
          </View>
        </StatCard>
      ))}

      <EmptyState
        title="No live APIs connected yet"
        description="This preview uses curated dummy ORE data so the design system, responsive layout, and navigation flow can be reviewed safely on mobile and web."
        action={<SecondaryButton label="Keep exploring the mock app" />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroChange: {
    ...oreTypography.body,
    color: oreColors.positive,
    fontWeight: '700',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  buttonFlex: {
    flexGrow: 1,
    flexBasis: 180,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  metricCard: {
    minWidth: 150,
    flexBasis: '47%',
    flexGrow: 1,
  },
});

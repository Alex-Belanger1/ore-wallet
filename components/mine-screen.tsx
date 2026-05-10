import { StyleSheet, View } from 'react-native';

import { oreSpacing } from '../constants/theme';
import { mineData } from '../lib/mine-data';
import { OreMiningConsole } from './ore-mining-console';
import { Pill } from './pill';
import { QuickActionButton } from './quick-action-button';
import { Screen } from './screen';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { StrategyCard } from './strategy-card';
import { TokenRow } from './token-row';

export function MineScreenView() {
  const data = mineData;

  return (
    <Screen>
      <SectionHeader
        eyebrow={data.greeting}
        title={data.title}
        description={data.subtitle}
        trailing={<Pill label={data.status.mode} tone="accent" />}
        variant="hero"
      />

      <OreMiningConsole />

      <View style={styles.actionGrid}>
        {data.actions.map((action) => (
          <QuickActionButton key={action.label} label={action.label} icon={action.icon} />
        ))}
      </View>

      <View style={styles.balanceGrid}>
        <StatCard
          variant="subtle"
          eyebrow="Refined balance"
          value={data.balances.refined}
          detail={data.balances.refinedNote}
          style={styles.balanceCard}
        />
        <StatCard
          variant="subtle"
          eyebrow="Unrefined balance"
          value={data.balances.unrefined}
          detail={data.balances.unrefinedNote}
          style={styles.balanceCard}
        />
      </View>

      <StatCard>
        <SectionHeader
          title="Strategy modes"
          description="Three distinct ways to think about ORE mining, from direct control to expected-value automation."
        />
        <View style={styles.strategyGrid}>
          {data.strategies.map((strategy, index) => (
            <StrategyCard
              key={strategy.title}
              title={strategy.title}
              detail={strategy.detail}
              edge={strategy.edge}
              tone={index === 2 ? 'accent' : 'default'}
            />
          ))}
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Mining history"
          description="Recent dummy mining outcomes, refinement events, and automation batches."
        />
        <View>
          {data.history.map((item, index) => (
            <TokenRow
              key={`${item.title}-${index}`}
              label={item.title}
              detail={item.detail}
              value={item.value}
              tone={item.tone}
              isLast={index === data.history.length - 1}
            />
          ))}
        </View>
      </StatCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  balanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  balanceCard: {
    minWidth: 150,
    flexBasis: '47%',
    flexGrow: 1,
  },
  strategyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
});

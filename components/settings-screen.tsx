import { StyleSheet, Text, View } from 'react-native';

import { oreColors, oreRadii, oreSpacing, oreTypography } from '../constants/theme';
import { settingsData } from '../lib/settings-data';
import { OreMark } from './ore-mark';
import { Pill } from './pill';
import { Screen } from './screen';
import { SectionHeader } from './section-header';
import { StatCard } from './stat-card';
import { TokenRow } from './token-row';

function TogglePill({ enabled }: { enabled: boolean }) {
  return (
    <View style={[styles.toggleTrack, enabled ? styles.toggleTrackEnabled : null]}>
      <View style={[styles.toggleThumb, enabled ? styles.toggleThumbEnabled : null]} />
    </View>
  );
}

function ToggleRow({
  title,
  detail,
  enabled,
  isLast = false,
}: {
  title: string;
  detail: string;
  enabled: boolean;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.row, !isLast ? styles.rowDivider : null]}>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDetail}>{detail}</Text>
      </View>
      <View style={styles.rowControl}>
        <Text style={[styles.rowValue, enabled ? styles.valuePositive : styles.valueMuted]}>
          {enabled ? 'On' : 'Off'}
        </Text>
        <TogglePill enabled={enabled} />
      </View>
    </View>
  );
}

export function SettingsScreenView() {
  const data = settingsData;

  return (
    <Screen>
      <SectionHeader
        eyebrow={data.greeting}
        title={data.title}
        description={data.subtitle}
        trailing={<Pill label="UI only" tone="accent" />}
        variant="hero"
      />

      <StatCard variant="hero">
        <View style={styles.profileLayout}>
          <View style={styles.profileCopy}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarLabel}>AC</Text>
              </View>
              <View style={styles.profileIdentity}>
                <Text style={styles.profileName}>{data.profile.name}</Text>
                <Text style={styles.profileHandle}>{data.profile.handle}</Text>
                <Text style={styles.profileEmail}>{data.profile.email}</Text>
              </View>
            </View>

            <View style={styles.profileTags}>
              <Pill label={data.profile.note} tone="accent" />
              <Pill label={data.profile.tier} />
            </View>

            <View style={styles.profileFacts}>
              <View style={styles.profileFact}>
                <Text style={styles.profileFactLabel}>Region</Text>
                <Text style={styles.profileFactValue}>{data.profile.region}</Text>
              </View>
              <View style={styles.profileFact}>
                <Text style={styles.profileFactLabel}>Session</Text>
                <Text style={styles.profileFactValue}>{data.profile.session}</Text>
              </View>
            </View>
          </View>

          <StatCard variant="subtle" style={styles.themePreviewCard}>
            <View style={styles.themeHeader}>
              <View>
                <Text style={styles.themeTitle}>{data.themePreview.title}</Text>
                <Text style={styles.themeMode}>{data.themePreview.mode}</Text>
              </View>
              <OreMark size={36} />
            </View>

            <View style={styles.themePreviewMini}>
              <View style={styles.miniTopBar} />
              <View style={styles.miniContent}>
                <View style={styles.miniMetric} />
                <View style={styles.miniAccentRow}>
                  <View style={styles.miniAccentBlock} />
                  <View style={styles.miniSurfaceBlock} />
                </View>
              </View>
            </View>

            <View style={styles.swatches}>
              <View style={[styles.swatch, { backgroundColor: oreColors.background }]} />
              <View style={[styles.swatch, { backgroundColor: oreColors.backgroundRaised }]} />
              <View style={[styles.swatch, { backgroundColor: oreColors.text }]} />
              <View style={[styles.swatch, { backgroundColor: oreColors.accent }]} />
            </View>

            <Text style={styles.themeDetail}>{data.themePreview.detail}</Text>
            <View style={styles.themeTags}>
              {data.themePreview.tags.map((tag) => (
                <Pill key={tag} label={tag} />
              ))}
            </View>
          </StatCard>
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          title="Security"
          description="Controls for approvals, recovery, and how sensitive data appears."
        />
        <View>
          {data.security.map((item, index) => (
            <ToggleRow
              key={item.title}
              title={item.title}
              detail={item.detail}
              enabled={item.enabled}
              isLast={index === data.security.length - 1}
            />
          ))}
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Notification preferences"
          description="Choose which product updates feel useful enough to interrupt you."
        />
        <View>
          {data.notifications.map((item, index) => (
            <ToggleRow
              key={item.title}
              title={item.title}
              detail={item.detail}
              enabled={item.enabled}
              isLast={index === data.notifications.length - 1}
            />
          ))}
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          title="Preferences"
          description="Display and environment settings for the current concept build."
        />
        <View>
          {data.preferences.map((item, index) => (
            <TokenRow
              key={item.title}
              label={item.title}
              detail={item.detail}
              value={item.value}
              tone={item.tone ?? 'default'}
              isLast={false}
            />
          ))}
        </View>
        <View style={styles.devModePanel}>
          <View style={styles.devModeCopy}>
            <View style={styles.devModeHeader}>
              <Text style={styles.devModeTitle}>{data.developerMode.title}</Text>
              <Pill label={data.developerMode.badge} tone="accent" />
            </View>
            <Text style={styles.devModeDetail}>{data.developerMode.detail}</Text>
          </View>
          <TogglePill enabled={data.developerMode.enabled} />
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Connected wallets"
          description="Placeholders for the wallet connections a future production app could support."
        />
        <View>
          {data.connectedWallets.map((item, index) => (
            <TokenRow
              key={item.title}
              label={item.title}
              detail={item.detail}
              value={item.value}
              tone={item.tone ?? 'default'}
              isLast={index === data.connectedWallets.length - 1}
            />
          ))}
        </View>
      </StatCard>

      <StatCard>
        <SectionHeader
          title="Support"
          description="Help surfaces and account assistance paths for a future live app."
        />
        <View>
          {data.support.map((item, index) => (
            <TokenRow
              key={item.title}
              label={item.title}
              detail={item.detail}
              value={item.value}
              tone={item.tone ?? 'default'}
              isLast={index === data.support.length - 1}
            />
          ))}
        </View>
      </StatCard>

      <StatCard variant="subtle">
        <SectionHeader
          title="Legal and disclosures"
          description="Concept placeholders for the terms and notices a live product would require."
          trailing={<Pill label="Concept copy" />}
        />
        <View>
          {data.legal.map((item, index) => (
            <TokenRow
              key={item.title}
              label={item.title}
              detail={item.detail}
              value={item.value}
              tone={item.tone ?? 'default'}
              isLast={index === data.legal.length - 1}
            />
          ))}
        </View>
      </StatCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.lg,
    alignItems: 'stretch',
  },
  profileCopy: {
    flex: 1,
    minWidth: 220,
    gap: oreSpacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    gap: oreSpacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: oreColors.accentSoft,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  avatarLabel: {
    ...oreTypography.title,
    color: oreColors.accentStrong,
  },
  profileIdentity: {
    flex: 1,
    gap: oreSpacing.xxs,
  },
  profileName: {
    ...oreTypography.metric,
    fontSize: 28,
    lineHeight: 32,
    color: oreColors.text,
  },
  profileHandle: {
    ...oreTypography.body,
    color: oreColors.accentStrong,
  },
  profileEmail: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
  profileTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
  },
  profileFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  profileFact: {
    flexGrow: 1,
    flexBasis: 140,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: oreSpacing.md,
    gap: oreSpacing.xs - 1,
  },
  profileFactLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  profileFactValue: {
    ...oreTypography.caption,
    color: oreColors.text,
  },
  themePreviewCard: {
    flex: 1,
    minWidth: 240,
  },
  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: oreSpacing.sm,
  },
  themeTitle: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  themeMode: {
    ...oreTypography.caption,
    color: oreColors.accentStrong,
    marginTop: 2,
  },
  themePreviewMini: {
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    backgroundColor: oreColors.background,
    overflow: 'hidden',
  },
  miniTopBar: {
    height: 28,
    backgroundColor: oreColors.backgroundRaised,
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  miniContent: {
    padding: oreSpacing.md,
    gap: oreSpacing.sm,
  },
  miniMetric: {
    height: 54,
    borderRadius: oreRadii.md,
    backgroundColor: oreColors.backgroundElevated,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  miniAccentRow: {
    flexDirection: 'row',
    gap: oreSpacing.sm,
  },
  miniAccentBlock: {
    flex: 1,
    height: 42,
    borderRadius: oreRadii.md,
    backgroundColor: oreColors.accentSoft,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  miniSurfaceBlock: {
    flex: 1,
    height: 42,
    borderRadius: oreRadii.md,
    backgroundColor: oreColors.backgroundRaised,
    borderWidth: 1,
    borderColor: oreColors.stroke,
  },
  swatches: {
    flexDirection: 'row',
    gap: oreSpacing.xs,
  },
  swatch: {
    width: 20,
    height: 20,
    borderRadius: oreRadii.pill,
    borderWidth: 1,
    borderColor: oreColors.stroke,
  },
  themeDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  themeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
    paddingVertical: oreSpacing.sm + 2,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  rowCopy: {
    flex: 1,
    gap: oreSpacing.xs - 1,
  },
  rowTitle: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '600',
  },
  rowDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  rowControl: {
    minWidth: 72,
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: oreSpacing.xs,
  },
  rowValue: {
    ...oreTypography.caption,
  },
  valuePositive: {
    color: oreColors.positive,
  },
  valueMuted: {
    color: oreColors.textMuted,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.backgroundRaised,
    borderWidth: 1,
    borderColor: oreColors.stroke,
    padding: 3,
    justifyContent: 'center',
  },
  toggleTrackEnabled: {
    backgroundColor: oreColors.accentSoft,
    borderColor: oreColors.strokeStrong,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.textMuted,
  },
  toggleThumbEnabled: {
    alignSelf: 'flex-end',
    backgroundColor: oreColors.accentStrong,
  },
  devModePanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
    borderRadius: oreRadii.md,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
    backgroundColor: oreColors.accentSoft,
    padding: oreSpacing.md,
    alignItems: 'center',
  },
  devModeCopy: {
    flex: 1,
    gap: oreSpacing.xs - 1,
  },
  devModeHeader: {
    flexDirection: 'row',
    gap: oreSpacing.sm,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  devModeTitle: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  devModeDetail: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
});

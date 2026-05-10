import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  oreColors,
  oreRadii,
  oreShadows,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import { GlassSurface } from './glass-surface';

type ActionSheetAction = {
  label: string;
  description: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
};

type ActionSheetProps = {
  visible: boolean;
  title: string;
  description: string;
  actions: ActionSheetAction[];
  onClose: () => void;
};

export function ActionSheet({
  visible,
  title,
  description,
  actions,
  onClose,
}: ActionSheetProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <GlassSurface variant="chrome" style={styles.sheet}>
          <View style={styles.grabber} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <GlassSurface variant="subtle" style={styles.actionList} showSheen={false}>
            {actions.map((action, index) => (
              <Pressable
                key={action.label}
                onPress={action.onPress}
                style={({ pressed }) => [
                  styles.actionRow,
                  index !== actions.length - 1 ? styles.actionDivider : null,
                  pressed ? styles.actionPressed : null,
                ]}>
                <View style={styles.iconWrap}>
                  <Ionicons name={action.icon} size={18} color={oreColors.accentStrong} />
                </View>
                <View style={styles.actionCopy}>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                  <Text style={styles.actionDescription}>{action.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={oreColors.textMuted} />
              </Pressable>
            ))}
          </GlassSurface>

          <Pressable onPress={onClose} style={({ pressed }) => [styles.cancel, pressed ? styles.cancelPressed : null]}>
            <GlassSurface variant="subtle" style={styles.cancelGlass} showSheen={false} />
            <Text style={styles.cancelLabel}>Cancel</Text>
          </Pressable>
        </GlassSurface>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(4, 5, 8, 0.68)',
  },
  sheet: {
    ...oreShadows.soft,
    paddingHorizontal: oreSpacing.lg,
    paddingTop: oreSpacing.sm,
    paddingBottom: oreSpacing.xl,
    borderTopLeftRadius: oreRadii.xl,
    borderTopRightRadius: oreRadii.xl,
    gap: oreSpacing.md,
  },
  grabber: {
    alignSelf: 'center',
    width: 42,
    height: 5,
    borderRadius: oreRadii.pill,
    backgroundColor: oreColors.stroke,
  },
  title: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  description: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  actionList: {
    borderRadius: oreRadii.lg,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: oreSpacing.sm,
    paddingHorizontal: oreSpacing.md,
    paddingVertical: oreSpacing.md,
  },
  actionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: oreColors.stroke,
  },
  actionPressed: {
    backgroundColor: oreColors.surfacePressed,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: oreRadii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: oreColors.accentSoft,
    borderWidth: 1,
    borderColor: oreColors.strokeStrong,
  },
  actionCopy: {
    flex: 1,
    gap: oreSpacing.xxs,
  },
  actionLabel: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '700',
  },
  actionDescription: {
    ...oreTypography.body,
    color: oreColors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  cancel: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 52,
    borderRadius: oreRadii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: oreRadii.md,
  },
  cancelPressed: {
    opacity: 0.96,
  },
  cancelLabel: {
    ...oreTypography.button,
    color: oreColors.text,
  },
});

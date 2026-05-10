import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
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
import { OreMark } from './ore-mark';
import { PrimaryButton } from './primary-button';
import { SecondaryButton } from './secondary-button';

type ReceiveSheetProps = {
  visible: boolean;
  address: string;
  handle: string;
  onClose: () => void;
};

const QR_SIZE = 21;

function isFinderCell(row: number, column: number, top: number, left: number) {
  const localRow = row - top;
  const localColumn = column - left;

  if (localRow < 0 || localRow > 6 || localColumn < 0 || localColumn > 6) {
    return false;
  }

  return (
    localRow === 0 ||
    localRow === 6 ||
    localColumn === 0 ||
    localColumn === 6 ||
    (localRow >= 2 && localRow <= 4 && localColumn >= 2 && localColumn <= 4)
  );
}

function isQrCellDark(row: number, column: number) {
  const inFinder =
    isFinderCell(row, column, 0, 0) ||
    isFinderCell(row, column, 0, QR_SIZE - 7) ||
    isFinderCell(row, column, QR_SIZE - 7, 0);

  if (inFinder) {
    return true;
  }

  return ((row * 7 + column * 11 + row * column) % 6) < 3;
}

export function ReceiveSheet({
  visible,
  address,
  handle,
  onClose,
}: ReceiveSheetProps) {
  const [copiedTarget, setCopiedTarget] = useState<'address' | 'handle' | null>(null);

  const copyValue = async (target: 'address' | 'handle', value: string) => {
    await Clipboard.setStringAsync(value);
    setCopiedTarget(target);
  };

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

          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text style={styles.eyebrow}>Receive ORE</Text>
              <Text style={styles.title}>Share your wallet details.</Text>
              <Text style={styles.description}>
                Let the sender scan the QR code, copy the Solana address, or send your recipient handle.
              </Text>
            </View>
            <OreMark size={46} />
          </View>

          <GlassSurface variant="subtle" showSheen={false} style={styles.qrCard}>
            <View style={styles.qrCode} accessibilityLabel="Demo QR code for receiving ORE">
              {Array.from({ length: QR_SIZE }).map((_, row) => (
                <View key={`row-${row}`} style={styles.qrRow}>
                  {Array.from({ length: QR_SIZE }).map((__, column) => (
                    <View
                      key={`cell-${row}-${column}`}
                      style={[
                        styles.qrCell,
                        isQrCellDark(row, column) ? styles.qrCellDark : styles.qrCellLight,
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
            <Text style={styles.qrCaption}>Demo receive QR</Text>
          </GlassSurface>

          <View style={styles.detailStack}>
            <GlassSurface variant="subtle" showSheen={false} style={styles.detailBox}>
              <Text style={styles.detailLabel}>Solana address</Text>
              <Text style={styles.detailValue} selectable numberOfLines={2}>
                {address}
              </Text>
            </GlassSurface>

            <GlassSurface variant="subtle" showSheen={false} style={styles.detailBox}>
              <Text style={styles.detailLabel}>Recipient handle</Text>
              <Text style={styles.handleValue} selectable>
                {handle}
              </Text>
            </GlassSurface>
          </View>

          <View style={styles.buttonGrid}>
            <PrimaryButton
              label={copiedTarget === 'address' ? 'Address copied' : 'Copy address'}
              onPress={() => copyValue('address', address)}
              style={styles.button}
            />
            <SecondaryButton
              label={copiedTarget === 'handle' ? '@ copied' : 'Copy @'}
              onPress={() => copyValue('handle', handle)}
              style={styles.button}
            />
          </View>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.closeButton, pressed ? styles.closePressed : null]}>
            <Text style={styles.closeLabel}>Close</Text>
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
    alignItems: 'center',
    backgroundColor: 'rgba(4, 5, 8, 0.72)',
    paddingHorizontal: oreSpacing.sm,
  },
  sheet: {
    ...oreShadows.soft,
    width: '100%',
    maxWidth: 640,
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: oreSpacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: oreSpacing.xs - 1,
  },
  eyebrow: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  title: {
    ...oreTypography.title,
    color: oreColors.text,
  },
  description: {
    ...oreTypography.body,
    color: oreColors.textMuted,
  },
  qrCard: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    borderRadius: oreRadii.lg,
    padding: oreSpacing.md,
    gap: oreSpacing.sm,
    backgroundColor: '#F6F1E7',
  },
  qrCode: {
    width: 178,
    height: 178,
    padding: 10,
    borderRadius: oreRadii.md,
    backgroundColor: '#F6F1E7',
  },
  qrRow: {
    flex: 1,
    flexDirection: 'row',
  },
  qrCell: {
    flex: 1,
  },
  qrCellDark: {
    backgroundColor: '#050607',
  },
  qrCellLight: {
    backgroundColor: '#F6F1E7',
  },
  qrCaption: {
    ...oreTypography.caption,
    color: '#202124',
  },
  detailStack: {
    gap: oreSpacing.sm,
  },
  detailBox: {
    borderRadius: oreRadii.md,
    padding: oreSpacing.md,
    gap: oreSpacing.xs,
  },
  detailLabel: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  detailValue: {
    ...oreTypography.body,
    color: oreColors.text,
    fontWeight: '700',
  },
  handleValue: {
    ...oreTypography.title,
    color: oreColors.accentStrong,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: oreSpacing.sm,
  },
  button: {
    flexGrow: 1,
    flexBasis: 190,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  closePressed: {
    opacity: 0.72,
  },
  closeLabel: {
    ...oreTypography.button,
    color: oreColors.textMuted,
  },
});

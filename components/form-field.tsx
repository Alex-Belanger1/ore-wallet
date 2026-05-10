import type { KeyboardTypeOptions, TextInputProps } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import {
  oreColors,
  oreRadii,
  oreSpacing,
  oreTypography,
} from '../constants/theme';
import { GlassSurface } from './glass-surface';

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  helper?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoFocus?: boolean;
};

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  helper,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = 'none',
  autoFocus = false,
}: FormFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <GlassSurface variant="subtle" style={styles.inputShell} showSheen={false}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={oreColors.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          autoCorrect={false}
          style={styles.input}
        />
      </GlassSurface>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: oreSpacing.xs,
  },
  label: {
    ...oreTypography.overline,
    color: oreColors.textMuted,
  },
  inputShell: {
    minHeight: 56,
    borderRadius: oreRadii.md,
  },
  input: {
    ...oreTypography.body,
    minHeight: 56,
    color: oreColors.text,
    backgroundColor: 'transparent',
    paddingHorizontal: oreSpacing.lg,
    paddingVertical: oreSpacing.sm,
  },
  helper: {
    ...oreTypography.caption,
    color: oreColors.textMuted,
  },
});

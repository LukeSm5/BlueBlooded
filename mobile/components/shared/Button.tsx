import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label?: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style = {},
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const iconColor = variant === 'primary' || variant === 'danger' ? '#fff' : '#666'
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? '#fff' : '#000'}
        />
      )}
       {icon && !loading && (                // <-- add this block
        <Ionicons name={icon} size={iconSize} color={iconColor} />
      )}
      <Text style={[styles.label, styles[`${variant}Label`], styles[`${size}Label`]]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
  },
  // Variants
  primary:   { backgroundColor: colors.primary },
  secondary: { backgroundColor: 'transparent', borderWidth: 0.5, borderColor: '#00000030' },
  danger:    { backgroundColor: '#E24B4A' },
  ghost:     { backgroundColor: 'transparent' },
  // Sizes
  sm: { paddingVertical: 6,  paddingHorizontal: 14 },
  md: { paddingVertical: 10, paddingHorizontal: 20 },
  lg: { paddingVertical: 14, paddingHorizontal: 28 },
  // States
  fullWidth: { width: '100%' },
  disabled:  { opacity: 0.4 },
  pressed:   { opacity: 0.8 },
  // Labels
  label:          { fontWeight: '500', fontFamily: 'Inter-Regular' },
  primaryLabel:   { color: colors.white },
  secondaryLabel: { color: '#1a1a1a' },
  dangerLabel:    { color: colors.white },
  ghostLabel:     { color: '#666' },
  smLabel: { fontSize: 13 },
  mdLabel: { fontSize: 14 },
  lgLabel: { fontSize: 16 },
});
export const colors = {
  primary: '#007AFF',
  primaryDark: '#0056B3',
  secondary: '#34C759',
  secondaryDark: '#248A3D',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  disabled: '#E5E5EA',
};

export const darkColors = {
  primary: '#0A84FF',
  primaryDark: '#007AFF',
  secondary: '#30D158',
  secondaryDark: '#34C759',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#8E8E93',
  border: '#545458',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  disabled: '#3A3A3C',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 41,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  callout: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 21,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const touchable = {
  minHeight: 44,
  minWidth: 44,
};
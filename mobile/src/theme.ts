export const colors = {
  primary: '#0052CC',
  primaryDark: '#003D9B',
  secondary: '#006D35',
  secondaryDark: '#005226',
  background: '#F9F9FF',
  surface: '#FFFFFF',
  surfaceLow: '#F0F3FF',
  surfaceHigh: '#E1E8FA',
  surfaceMuted: '#E7EEFF',
  text: '#141C28',
  textSecondary: '#434654',
  textTertiary: '#737685',
  border: '#C3C6D6',
  error: '#BA1A1A',
  success: '#006D35',
  warning: '#D93D00',
  disabled: '#D2DAEB',
};

export const darkColors = {
  primary: '#0A84FF',
  primaryDark: '#007AFF',
  secondary: '#30D158',
  secondaryDark: '#34C759',
  background: '#000000',
  surface: '#1C1C1E',
  surfaceLow: '#2C2C2E',
  surfaceHigh: '#3A3A3C',
  surfaceMuted: '#2C2C2E',
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
  '3xl': 64,
};

export const typography = {
  largeTitle: {
    fontFamily: 'PublicSans_700Bold',
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 44,
  },
  title: {
    fontFamily: 'PublicSans_600SemiBold',
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  headline: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 30,
  },
  callout: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'Lexend_400Regular',
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  label: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  button: {
    fontFamily: 'Lexend_600SemiBold',
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
};

export const touchable = {
  minHeight: 56,
  minWidth: 56,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadow = {
  card: {
    shadowColor: '#141C28',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 4,
  },
  lift: {
    shadowColor: '#141C28',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 3,
  },
};
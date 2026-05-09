import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import theme from '../theme';

export default function ScreenHeader({ title, subtitle, right }) {
  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.title}>{title}</AppText>
        {subtitle ? <AppText style={styles.subtitle}>{subtitle}</AppText> : null}
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  title: {
    ...theme.typography.headlineMD,
    color: theme.colors.onBackground
  },
  subtitle: {
    marginTop: 4,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  }
});

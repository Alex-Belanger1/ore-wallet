import { router } from 'expo-router';
import { View } from 'react-native';

import { CardSpendSection } from '../components/card-spend-section';
import { Screen } from '../components/screen';
import { SecondaryButton } from '../components/secondary-button';

export default function CardSpendScreen() {
  return (
    <Screen footerInset={48}>
      <CardSpendSection />
      <View>
        <SecondaryButton label="Back to Home" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

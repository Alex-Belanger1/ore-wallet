import { Tabs } from 'expo-router';

import { LiquidGlassTabBar } from '../../components/liquid-glass-tab-bar';
import { appTabs } from '../../constants/tabs';
import { oreColors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <LiquidGlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: oreColors.background,
        },
      }}>
      {appTabs.map((tab) => (
        <Tabs.Screen
          key={tab.route}
          name={tab.route}
          options={{
            title: tab.title,
          }}
        />
      ))}
    </Tabs>
  );
}

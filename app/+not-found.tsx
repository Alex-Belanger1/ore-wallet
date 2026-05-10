import { Link } from 'expo-router';

import { EmptyState } from '../components/empty-state';
import { PrimaryButton } from '../components/primary-button';
import { Screen } from '../components/screen';
import { SectionHeader } from '../components/section-header';

export default function NotFoundScreen() {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Route not found"
        title="This screen does not exist in the concept build."
        description="The routed wallet preview only includes the placeholder tab experience right now."
        variant="hero"
      />
      <EmptyState
        title="Return to the main tab flow"
        description="Jump back to Home to keep reviewing the shared ORE design system and the current placeholder content."
        action={
          <Link href="/(tabs)" asChild>
            <PrimaryButton label="Go to Home" />
          </Link>
        }
      />
    </Screen>
  );
}

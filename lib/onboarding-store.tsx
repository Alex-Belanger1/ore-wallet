import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

type FlowMode = 'signup' | 'signin';

type NotificationPreferences = {
  marketMoves: boolean;
  miningWindows: boolean;
  securityAlerts: boolean;
};

type SecurityPreferences = {
  faceId: boolean;
  passkeyBackup: boolean;
  transferReview: boolean;
};

type OnboardingContextValue = {
  mode: FlowMode;
  fullName: string;
  email: string;
  password: string;
  username: string;
  notifications: NotificationPreferences;
  security: SecurityPreferences;
  setMode: (mode: FlowMode) => void;
  updateField: (
    field: 'fullName' | 'email' | 'password' | 'username',
    value: string
  ) => void;
  toggleNotification: (key: keyof NotificationPreferences) => void;
  toggleSecurity: (key: keyof SecurityPreferences) => void;
  reset: () => void;
};

const defaultNotifications: NotificationPreferences = {
  marketMoves: true,
  miningWindows: true,
  securityAlerts: true,
};

const defaultSecurity: SecurityPreferences = {
  faceId: true,
  passkeyBackup: true,
  transferReview: false,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<FlowMode>('signup');
  const [fullName, setFullName] = useState('Avery Lane');
  const [email, setEmail] = useState('avery@orevault.app');
  const [password, setPassword] = useState('ore-strong-passcode');
  const [username, setUsername] = useState('ore.avery');
  const [notifications, setNotifications] =
    useState<NotificationPreferences>(defaultNotifications);
  const [security, setSecurity] = useState<SecurityPreferences>(defaultSecurity);

  const updateField: OnboardingContextValue['updateField'] = (field, value) => {
    if (field === 'fullName') setFullName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'username') setUsername(value);
  };

  const toggleNotification: OnboardingContextValue['toggleNotification'] = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const toggleSecurity: OnboardingContextValue['toggleSecurity'] = (key) => {
    setSecurity((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const reset = () => {
    setMode('signup');
    setFullName('Avery Lane');
    setEmail('avery@orevault.app');
    setPassword('ore-strong-passcode');
    setUsername('ore.avery');
    setNotifications(defaultNotifications);
    setSecurity(defaultSecurity);
  };

  return (
    <OnboardingContext.Provider
      value={{
        mode,
        fullName,
        email,
        password,
        username,
        notifications,
        security,
        setMode,
        updateField,
        toggleNotification,
        toggleSecurity,
        reset,
      }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider');
  }

  return context;
}

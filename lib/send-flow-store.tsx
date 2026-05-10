import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import type { SendKind } from './send-flow-data';

type SendFlowContextValue = {
  kind: SendKind;
  recipient: string;
  amount: string;
  startFlow: (kind: SendKind) => void;
  setRecipient: (value: string) => void;
  setAmount: (value: string) => void;
  reset: () => void;
};

const SendFlowContext = createContext<SendFlowContextValue | null>(null);

export function SendFlowProvider({ children }: PropsWithChildren) {
  const [kind, setKind] = useState<SendKind>('standard');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const startFlow = (nextKind: SendKind) => {
    setKind(nextKind);
    setRecipient('');
    setAmount('');
  };

  const reset = () => {
    setKind('standard');
    setRecipient('');
    setAmount('');
  };

  return (
    <SendFlowContext.Provider
      value={{
        kind,
        recipient,
        amount,
        startFlow,
        setRecipient,
        setAmount,
        reset,
      }}>
      {children}
    </SendFlowContext.Provider>
  );
}

export function useSendFlow() {
  const context = useContext(SendFlowContext);

  if (!context) {
    throw new Error('useSendFlow must be used inside SendFlowProvider');
  }

  return context;
}

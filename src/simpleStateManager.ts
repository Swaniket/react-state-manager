import { useEffect, useState } from "react";

function createSubscribable<TMessage>() {
  const subscribers: Set<(msg: TMessage) => void> = new Set();

  return {
    subscribe(callbackFn: (msg: TMessage) => void): () => void {
      subscribers.add(callbackFn);
      return () => {
        subscribers.delete(callbackFn);
      };
    },

    publish(msg: TMessage): void {
      // We are calling each subscribers
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

export function createStateHook<TData>(
  initialState: TData
): () => [TData, (value: TData) => void] {
  const subscribers = createSubscribable<TData>();

  return () => {
    const [value, setValue] = useState<TData>(initialState);

    useEffect(() => {
      return subscribers.subscribe(setValue);
    }, []);

    return [
      value,
      (v: TData) => {
        setValue(v);
        subscribers.publish(v);
      },
    ];
  };
}

import { useEffect, useState } from "react";
import { StepCounter } from "expo-sensors";

export default function useStepTracker() {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    StepCounter.isAvailableAsync().then((res) => setIsAvailable(res));
    let subscription: any = null;

    if (isAvailable) {
      subscription = StepCounter.watchStepCount((result) => {
        setSteps(result.steps);
      });
    }

    return () => {
      subscription && subscription.remove();
    };
  }, [isAvailable]);

  return { isAvailable, steps };
}

import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isNil } from 'es-toolkit';
import { Funnel } from './model';

const FIRST_FUNNEL_STEP = 1;

interface UseFunnelProps {
  totalSteps: number;
}

export function useFunnel({ totalSteps }: UseFunnelProps): Funnel {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const funnelStepParam = searchParams?.get('funnelStep');
  const currentStep = isNil(funnelStepParam) ? FIRST_FUNNEL_STEP : Number(funnelStepParam);
  const isFirstStep = currentStep === FIRST_FUNNEL_STEP;
  const isLastStep = currentStep === totalSteps;

  const goToStep = useCallback(
    (step: number, replace = false) => {
      const params = new URLSearchParams({ funnelStep: step.toString() });
      const url = `${pathname}?${params}`;
      if (replace) router.replace(url);
      else router.push(url);
    },
    [pathname, router],
  );

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (!isLastStep) {
      goToStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (isNil(funnelStepParam) || Number(funnelStepParam) > totalSteps) {
      goToStep(FIRST_FUNNEL_STEP);
    }
  }, [funnelStepParam, goToStep, totalSteps]);

  return {
    totalSteps,
    currentStep,
    isFirstStep,
    isLastStep,
    goToStep,
    goToPreviousStep,
    goToNextStep,
  };
}

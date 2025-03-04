import { useCallback, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { isNil } from 'es-toolkit';
import { FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

const FIRST_FUNNEL_STEP = 1;

export function useFunnelNavigation(totalSteps: number) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const funnelStepParam = searchParams?.get('funnelStep');
  const currentStep = isNil(funnelStepParam) ? FIRST_FUNNEL_STEP : Number(funnelStepParam);
  const isFirstStep = currentStep === FIRST_FUNNEL_STEP;
  const isLastStep = currentStep === totalSteps;

  const navigateToStep = useCallback(
    (step: number, replace = false) => {
      const params = new URLSearchParams({ funnelStep: step.toString() });
      const url = `${pathname}?${params}`;
      if (replace) router.replace(url);
      else router.push(url);
    },
    [pathname, router],
  );

  useEffect(() => {
    if (isNil(funnelStepParam) || Number(funnelStepParam) > totalSteps) {
      navigateToStep(FIRST_FUNNEL_STEP);
    }
  }, [funnelStepParam, totalSteps, pathname, router, navigateToStep]);

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    navigateToStep,
  };
}

export interface UseFormFunnelProps<TFieldValues extends FieldValues = FieldValues, TContext = unknown>
  extends UseFormProps<TFieldValues, TContext> {
  totalSteps: number;
}

export interface FunnelNavigation {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}

export interface UseFormFunnelReturn<TFieldValues extends FieldValues = FieldValues, TContext = unknown> {
  form: UseFormReturn<TFieldValues, TContext>;
  navigation: FunnelNavigation;
}

export function useFormFunnel<TFieldValues extends FieldValues = FieldValues, TContext = unknown>({
  totalSteps,
  ...formProps
}: UseFormFunnelProps<TFieldValues, TContext>): UseFormFunnelReturn<TFieldValues, TContext> {
  const form = useForm<TFieldValues, TContext>(formProps);

  const { currentStep, isFirstStep, isLastStep, navigateToStep } = useFunnelNavigation(totalSteps);

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      navigateToStep(currentStep - 1);
    }
  };

  const goToNextStep = () => {
    if (!isLastStep) {
      navigateToStep(currentStep + 1);
    }
  };

  const navigation: FunnelNavigation = {
    currentStep,
    isFirstStep,
    isLastStep,
    goToPreviousStep,
    goToNextStep,
  };

  return {
    form,
    navigation,
  };
}

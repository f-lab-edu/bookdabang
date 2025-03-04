export interface Funnel {
  totalSteps: number;
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goToStep: (step: number, replace?: boolean) => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}

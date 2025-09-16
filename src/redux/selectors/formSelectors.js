// Form state selectors
export const selectFormState = (state) => state.forms;

// Step progression selectors
export const selectCurrentStep = (state) => state.forms.currentStep;
export const selectStepLabel = (state) => state.forms.stepLabel;

// Form data selectors
export const selectAdditionalInfo = (state) => state.forms.additionalInfo;
export const selectBankAccountDetails = (state) => state.forms.bankAccountDetails;
export const selectInitiatePledge = (state) => state.forms.initiatePledge;

// Form error selectors
export const selectFormErrors = (state) => state.forms.errors;
export const selectAdditionalInfoErrors = (state) => state.forms.errors.additionalInfo;
export const selectBankAccountErrors = (state) => state.forms.errors.bankAccount;
export const selectPledgeErrors = (state) => state.forms.errors.pledge;

// Form submission status selectors
export const selectIsSubmitting = (state) => state.forms.isSubmitting;
export const selectSubmitSuccess = (state) => state.forms.submitSuccess;
export const selectSubmitError = (state) => state.forms.submitError;

// Computed selectors
export const selectIsFormValid = (formType) => (state) => {
  const errors = state.forms.errors[formType];
  return Object.keys(errors).length === 0;
};

export const selectIsStepComplete = (step) => (state) => {
  const currentStep = state.forms.currentStep;
  return currentStep > step;
};

export const selectCanProceedToNextStep = (currentStep) => (state) => {
  // Check if current step is complete and can proceed
  switch (currentStep) {
    case 2: // Additional Info
      return Object.keys(state.forms.errors.additionalInfo).length === 0;
    case 3: // Bank Account Details
      return Object.keys(state.forms.errors.bankAccount).length === 0;
    case 4: // Initiate Pledge
      return Object.keys(state.forms.errors.pledge).length === 0;
    default:
      return true;
  }
};

// Form field selectors
export const selectFormField = (formType, field) => (state) => {
  return state.forms[formType]?.[field];
};

// Validation selectors
export const selectFieldError = (formType, field) => (state) => {
  return state.forms.errors[formType]?.[field];
};

export const selectHasErrors = (formType) => (state) => {
  const errors = state.forms.errors[formType];
  return Object.keys(errors).length > 0;
}; 
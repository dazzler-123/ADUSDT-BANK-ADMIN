import { useDispatch, useSelector } from 'react-redux';
import {
  setStepProgress,
  resetForms,
  updateFormField,
  submitAdditionalInfo,
  submitBankAccountDetails,
  submitInitiatePledge,
  clearFormErrors
} from '../actions/actionCreators';
import {
  selectCurrentStep,
  selectStepLabel,
  selectAdditionalInfo,
  selectBankAccountDetails,
  selectInitiatePledge,
  selectFormErrors,
  selectAdditionalInfoErrors,
  selectBankAccountErrors,
  selectPledgeErrors,
  selectIsSubmitting,
  selectSubmitSuccess,
  selectSubmitError
} from '../selectors/formSelectors';
import {
  selectUser
} from '../selectors/loginSelectors';

export const useFormManagement = () => {
  const dispatch = useDispatch();

  // Selectors
  const currentStep = useSelector(selectCurrentStep);
  const loginUser=useSelector(selectUser)
  const stepLabel = useSelector(selectStepLabel);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const bankAccountDetails = useSelector(selectBankAccountDetails);
  const initiatePledge = useSelector(selectInitiatePledge);
  const formErrors = useSelector(selectFormErrors);
  const additionalInfoErrors = useSelector(selectAdditionalInfoErrors);
  const bankAccountErrors = useSelector(selectBankAccountErrors);
  const pledgeErrors = useSelector(selectPledgeErrors);
  const isSubmitting = useSelector(selectIsSubmitting);
  const submitSuccess = useSelector(selectSubmitSuccess);
  const submitError = useSelector(selectSubmitError);

  // Actions
  const updateField = (formType, field, value) => {
    dispatch(updateFormField(formType, field, value));
  };

  const setStep = (step) => {
    dispatch(setStepProgress(step));
  };

  const resetAllForms = () => {
    dispatch(resetForms());
  };

  const clearErrors = (formType) => {
    dispatch(clearFormErrors(formType));
  };

  const submitAdditionalInfoForm = async (formData) => {
    return await dispatch(submitAdditionalInfo(formData));
  };

  const submitBankAccountForm = async (formData) => {
    return await dispatch(submitBankAccountDetails(formData));
  };

  const submitPledgeForm = async (formData) => {
    return await dispatch(submitInitiatePledge(formData));
  };

  // Helper functions
  const getFieldError = (formType, field) => {
    return formErrors[formType]?.[field];
  };

  const hasErrors = (formType) => {
    return Object.keys(formErrors[formType] || {}).length > 0;
  };

  const getFormData = (formType) => {
    switch (formType) {
      case 'additionalInfo':
        return additionalInfo;
      case 'bankAccount':
        return bankAccountDetails;
      case 'pledge':
        return initiatePledge;
      default:
        return {};
    }
  };

  const getFormErrors = (formType) => {
    switch (formType) {
      case 'additionalInfo':
        return additionalInfoErrors;
      case 'bankAccount':
        return bankAccountErrors;
      case 'pledge':
        return pledgeErrors;
      default:
        return {};
    }
  };

  const isStepComplete = (step) => {
    return currentStep > step;
  };

  const canProceedToNextStep = () => {
    // Check if current step is complete and can proceed
    switch (currentStep) {
      case 2: // Additional Info
        return Object.keys(additionalInfoErrors).length === 0;
      case 3: // Bank Account Details
        return Object.keys(bankAccountErrors).length === 0;
      case 4: // Initiate Pledge
        return Object.keys(pledgeErrors).length === 0;
      default:
        return true;
    }
  };

  return {
    // State
    loginUser,
    currentStep,
    stepLabel,
    additionalInfo,
    bankAccountDetails,
    initiatePledge,
    formErrors,
    additionalInfoErrors,
    bankAccountErrors,
    pledgeErrors,
    isSubmitting,
    submitSuccess,
    submitError,

    // Actions
    updateField,
    setStep,
    resetAllForms,
    clearErrors,
    submitAdditionalInfoForm,
    submitBankAccountForm,
    submitPledgeForm,

    // Helper functions
    getFieldError,
    hasErrors,
    getFormData,
    getFormErrors,
    isStepComplete,
    canProceedToNextStep,
  };
}; 
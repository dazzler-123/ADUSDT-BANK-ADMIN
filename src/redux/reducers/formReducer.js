import {
  SET_ADDITIONAL_INFO,
  SET_BANK_ACCOUNT_DETAILS,
  SET_INITIATE_PLEDGE,
  SET_STEP_PROGRESS,
  RESET_FORMS,
  UPDATE_FORM_FIELD,
  SET_FORM_ERRORS,
  CLEAR_FORM_ERRORS
} from '../actions/Actions';

const initialState = {
  // Step progression
  currentStep: 0,
  stepLabel: '',

  // Form data
  additionalInfo: {
    firstName: '',
    middleName: '',
    lastName: '',
    fatherTitle: 'Mr.',
    fatherName: '',
    motherTitle: 'Mrs.',
    motherName: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    politicallyExposed: 'No',
    addressLine1: '',
    country: 'India',
    state: '',
    city: '',
    zip: '',
    isPermSameAsCorr: true,
    permAddressLine1: '',
    permCountry: 'India',
    permState: '',
    permCity: '',
    permZip: '',
    referralNumber: '',
    loanAmount: '',
    loanPurpose: 'Personal',
  },

  bankAccountDetails: {
    bankAccountNumber: '',
    confirmBankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    bankBranchAddress: '',
    accountType: 'Current',
  },

  initiatePledge: {

  },

  // Form validation errors
  errors: {
    additionalInfo: {},
    bankAccount: {},
    pledge: {},
  },

  // Form submission status
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDITIONAL_INFO:
      return {
        ...state,
        additionalInfo: {
          ...state.additionalInfo,
          ...(action.payload || {})
        },
        errors: {
          ...state.errors,
          additionalInfo: {}
        }
      };

    case SET_BANK_ACCOUNT_DETAILS:
      return {
        ...state,
        bankAccountDetails: {
          ...state.bankAccountDetails,
          ...(action.payload || {})
        },
        errors: {
          ...state.errors,
          bankAccount: {}
        }
      };

    case SET_INITIATE_PLEDGE:
      return {
        ...state,
        initiatePledge: {
          ...state.initiatePledge,
          ...(action.payload || {})
        },
        errors: {
          ...state.errors,
          pledge: {}
        }
      };

    case SET_STEP_PROGRESS:
      return {
        ...state,
        currentStep: action.payload || 0,
        stepLabel: getStepLabel(action.payload || 0)
      };

    case UPDATE_FORM_FIELD: {
      const { formType, field, value } = action.payload || {};
      if (!formType || !field) return state;

      return {
        ...state,
        [formType]: {
          ...state[formType],
          [field]: value
        },
        // Clear errors for this field
        errors: {
          ...state.errors,
          [formType]: {
            ...state.errors[formType],
            [field]: undefined
          }
        }
      };
    }

    case SET_FORM_ERRORS: {
      const { formType: errorFormType, errors: formErrors } = action.payload || {};
      if (!errorFormType) return state;

      return {
        ...state,
        errors: {
          ...state.errors,
          [errorFormType]: formErrors || {}
        }
      };
    }

    case CLEAR_FORM_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload || '']: {}
        }
      };

    case RESET_FORMS:
      return {
        ...initialState,
        currentStep: 0,
        stepLabel: ''
      };

    default:
      return state;
  }
};

// Helper function to get step label based on step number
const getStepLabel = (step) => {
  const stepLabels = [
    'KYC',
    'Eligibility credit check score',
    'Additional Info',
    'Bank Account Details',
    'Initiate Pledge', // This will be dynamic based on context
    'E-Mandate',
    'E-Sign',
    'Approve'
  ];

  return stepLabels[step] || '';
};

export default formReducer; 
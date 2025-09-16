import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_LOGIN_ERROR,
  SET_ADDITIONAL_INFO,
  SET_BANK_ACCOUNT_DETAILS,
  SET_INITIATE_PLEDGE,
  SET_STEP_PROGRESS,
  RESET_FORMS,
  UPDATE_FORM_FIELD,
  VALIDATE_FORM,
  SET_FORM_ERRORS,
  CLEAR_FORM_ERRORS
} from './Actions';

// Login Action Creators
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR
});

// Form Action Creators
export const setAdditionalInfo = (data) => ({
  type: SET_ADDITIONAL_INFO,
  payload: data ? { ...data } : {}
});

export const setBankAccountDetails = (data) => ({
  type: SET_BANK_ACCOUNT_DETAILS,
  payload: data ? { ...data } : {}
});

export const setInitiatePledge = (data) => ({
  type: SET_INITIATE_PLEDGE,
  payload: data ? { ...data } : {}
});

export const setStepProgress = (step) => ({
  type: SET_STEP_PROGRESS,
  payload: step
});

export const resetForms = () => ({
  type: RESET_FORMS
});

export const updateFormField = (formType, field, value) => ({
  type: UPDATE_FORM_FIELD,
  payload: { formType, field, value }
});

export const validateForm = (formType) => ({
  type: VALIDATE_FORM,
  payload: formType
});

export const setFormErrors = (formType, errors) => ({
  type: SET_FORM_ERRORS,
  payload: { formType, errors }
});

export const clearFormErrors = (formType) => ({
  type: CLEAR_FORM_ERRORS,
  payload: formType
});

// Async Login Action Creator (Thunk)
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest(credentials));
    
    // Make API call here
    // const response = await loginAPI(credentials);
    
    // For now, simulate API call
    const mockResponse = {
      user: {
        id: credentials.mobile,
        mobile: credentials.mobile,
        email: credentials.email,
        token: 'mock-jwt-token'
      }
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    dispatch(loginSuccess(mockResponse.user));
    return mockResponse.user;
    
  } catch (error) {
    dispatch(loginFailure(error.message || 'Login failed'));
    throw error;
  }
};

// Async Form Action Creators (Thunks)
export const submitAdditionalInfo = (formData) => async (dispatch) => {
  try {
    // Ensure formData is a plain object to avoid circular references
    const cleanFormData = formData ? { ...formData } : {};
    
    dispatch(setAdditionalInfo(cleanFormData));
    dispatch(setStepProgress(3)); // Move to next step
    return true;
  } catch (error) {
    console.error('Error submitting additional info:', error);
    return false;
  }
};

export const submitBankAccountDetails = (formData) => async (dispatch) => {
  try {
    // Ensure formData is a plain object to avoid circular references
    const cleanFormData = formData ? { ...formData } : {};
    
    dispatch(setBankAccountDetails(cleanFormData));
    dispatch(setStepProgress(4)); // Move to next step
    return true;
  } catch (error) {
    console.error('Error submitting bank account details:', error);
    return false;
  }
};

export const submitInitiatePledge = (formData) => async (dispatch) => {
  try {
    // Ensure formData is a plain object to avoid circular references
    const cleanFormData = formData ? { ...formData } : {};
    
    dispatch(setInitiatePledge(cleanFormData));
    dispatch(setStepProgress(5)); // Move to next step
    return true;
  } catch (error) {
    console.error('Error submitting pledge form:', error);
    return false;
  }
};





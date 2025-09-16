import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_LOGIN_ERROR
} from '../actions/Actions';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        token: action.payload.token,
        error: null
      };
    
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        token: null
      };
    
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

export default loginReducer; 
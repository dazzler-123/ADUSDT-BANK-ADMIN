const state = {
    data: null,
    isLoading: false,
    error: {
        hasErrors: false
    }
}

export const ValidateLoginReducer = (newState = state, action) => {

    switch (action.type) {
        case "AUTHENTICATION_LOGIN_DATA_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false,
            }
        }
        case 'AUTHENTICATION_LOGIN_DATA_REQUEST': return {
            ...newState,
            isLoading: true
        }

        case 'AUTHENTICATION_LOGIN_DATA_SUCCESS': return {
            ...newState,
            isLoading: false,
            data: action.payload
        }

        case 'AUTHENTICATION_LOGIN_DATA_FAILURE': return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: action.payload
            }
        }
        case 'VALIDATE_LOGIN_OTP_DATA_REQUEST': return {
            ...newState,
            isLoading: true
        }

        case 'VALIDATE_LOGIN_OTP_DATA_SUCCESS': return {
            ...newState,
            isLoading: false,
            data: action.payload
        }

        case 'VALIDATE_LOGIN_OTP_DATA_FAILURE': return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: action.payload
            }
        }
        case ' AUTHENTICATION_LOGOUT_REQUEST': return {
            ...newState,
            isLoading: true
        }

        case ' AUTHENTICATION_LOGOUT_SUCCESS': return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false,
            }

        }
        case ' AUTHENTICATION_LOGOUT_FAILURE': return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,

            }
        }

        default: return newState
    }
}
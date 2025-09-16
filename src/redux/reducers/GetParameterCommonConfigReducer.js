const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}


export const GetParameterCommonConfigReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_PARAMETER_COMMON_CONFIG_RESET": return {
            ...newState,
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_PARAMETER_COMMON_CONFIG_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_PARAMETER_COMMON_CONFIG_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "GET_PARAMETER_COMMON_CONFIG_FAILURE": return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: action.payload
            }
        }

        default: return newState
    }
}
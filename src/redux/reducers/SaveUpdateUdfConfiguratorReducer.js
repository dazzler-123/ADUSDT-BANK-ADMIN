const state = {
    data: {},
    isLoading: false,
    error: {
        hasErrors: false
    }
}

export const SaveUpdateUdfConfiguratorReducer = (newState = state, action) => {
    switch (action.type) {
        case "UDF_CONFIGURATOR_DETAILS_RESET": return {
            data: {},
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "UDF_CONFIGURATOR_DETAILS_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "UDF_CONFIGURATOR_DETAILS_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "UDF_CONFIGURATOR_DETAILS_FAILURE": return {
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
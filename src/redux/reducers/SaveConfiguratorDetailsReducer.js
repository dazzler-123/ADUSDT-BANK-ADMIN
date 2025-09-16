const state = {
    data: {},
    isLoading: false,
    error: {
        hasErrors: false
    }
}

export const SaveConfiguratorDetailsReducer = (newState = state, action) => {
    switch (action.type) {
        case "RESET_SAVE_CONFIGURATOR_DETAILS": return {
            data: {},
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "SAVE_CONFIGURATOR_DETAILS_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "SAVE_CONFIGURATOR_DETAILS_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "SAVE_CONFIGURATOR_DETAILS_FAILURE": return {
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
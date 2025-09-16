const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}

/**
 * Reducer function for handling actions related to configurator details.
 * 
 * @param {Object} newState - The current state of the reducer.
 * @param {Object} action - The action object containing the type and payload.
 * @returns {Object} The new state of the reducer.
 */
export const GetConfiguratorDetailsReducer = (newState = state, action) => {

    switch (action.type) {
        case "RESET_CONFIGURATOR_DETAILS": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "CONFIGURATOR_DETAILS_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "CONFIGURATOR_DETAILS_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "CONFIGURATOR_DETAILS_FAILURE": return {
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
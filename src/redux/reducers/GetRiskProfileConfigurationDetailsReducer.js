const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}

/**
 * Reducer function for handling actions related to all configurator details.
 * 
 * @param {Object} newState - The current state of the reducer.
 * @param {Object} action - The action object containing the type and payload.
 * @returns {Object} The new state of the reducer.
 */
export const GetRiskProfileConfigurationDetailsReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_RISK_PROFILE_CONFIGURATION_DETAILS_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_RISK_PROFILE_CONFIGURATION_DETAILS_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_RISK_PROFILE_CONFIGURATION_DETAILS_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "GET_RISK_PROFILE_CONFIGURATION_DETAILS_FAILURE": return {
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
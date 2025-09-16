const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}

export const GetAllDashboardWidgetsConfigurationReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_SUCCESS": return {
            ...newState,
            // data: action.payload,
            isLoading: false
        }

        case "GET_ALL_DASHBOARD_WIDGET_CONFIGURATION_DETAILS_FAILURE": return {
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
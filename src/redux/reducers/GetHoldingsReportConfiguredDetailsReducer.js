const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}

export const GetHoldingsReportConfiguredDetailsReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_HOLDING_REPORT_CONFIGURED_FIELD_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_HOLDING_REPORT_CONFIGURED_FIELD_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_HOLDING_REPORT_CONFIGURED_FIELD_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "GET_HOLDING_REPORT_CONFIGURED_FIELD_FAILURE": return {
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
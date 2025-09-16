const state = {
    configInfo: {},
    isLoadng: true,
    error: {
        hasErrors: false
    },
}


export const getFundCompareConfigReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_FUND_COMPARE_CONFIG_RESET": return {
            ...state,
            isLoading: false,
            error: {
                hasErrors: false
            },
        }
        case "GET_FUND_COMPARE_CONFIG_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_FUND_COMPARE_CONFIG_SUCCESS": return {
            ...newState,
            configInfo: JSON.parse(JSON.stringify(action.payload)),
            isLoading: false
        }

        case "GET_FUND_COMPARE_CONFIG_FAILURE": return {
            ...newState,
            isLoading: false,
            error: {
                hasErrors: true,

            }
        }
        default: return newState
    }
}
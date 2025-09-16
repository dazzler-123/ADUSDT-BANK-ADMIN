const state = {
    fundInfo: [],
    isLoading: true,
    error: {
        hasErrors: false
    },

}


export const getFundCompareSchemeReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_FUND_COMPARE_SCHEME_RESET": return {
            fundInfo: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
        }
        case "GET_FUND_COMPARE_SCHEME_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_FUND_COMPARE_SCHEME_SUCCESS": return {
            ...newState,
            fundInfo: [...action.payload],
            isLoading: false
        }

        case "GET_FUND_COMPARE_SCHEME_FAILURE": return {
            ...newState,
            isLoading: false,
            error: {
                hasErrors: true,

            }
        }
        default: return newState
    }
}
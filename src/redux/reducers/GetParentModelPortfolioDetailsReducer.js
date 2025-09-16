const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}


export const GetParentModelPortfolioDetailsReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_PARENT_PORTFOLIO_DETAILS_RESET": return {
            ...newState,
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_PARENT_PORTFOLIO_DETAILS_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_PARENT_PORTFOLIO_DETAILS_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "GET_PARENT_PORTFOLIO_DETAILS_FAILURE": return {
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
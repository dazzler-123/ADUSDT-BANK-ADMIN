const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}


export const GetFundUniverseDataReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_FUND_UNIVERSE_DATA_RESET": return {
            ...newState,
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_FUND_UNIVERSE_DATA_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_FUND_UNIVERSE_DATA_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }
        case "ADD_FUND_UNIVERSE_DATA": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "GET_FUND_UNIVERSE_DATA_FAILURE": return {
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
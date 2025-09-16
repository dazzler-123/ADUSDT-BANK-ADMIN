const state = {
    data: {rowsData:[]},
    isLoading: false,
    error: {
        hasErrors: false
    },
}


export const CreateRebalanceSumarryDataReducer = (newState = state, action) => {

    switch (action.type) {
        case "ADD_REBALANCE_SUMARRY_HEADER_DATA_RESET": return {
            data: {rowsData:[]},
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload:[]
        }

        case "ADD_REBALANCE_SUMARRY_HEADER_DATA_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "ADD_REBALANCE_SUMARRY_HEADER_DATA_FAILURE": return {
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
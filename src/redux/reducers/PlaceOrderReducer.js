const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    },
    payload:{}

}


export const PlaceorderReducer = (newState = state, action) => {

    switch (action.type) {
        case "PLACE_ORDER_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload:{}
        }

        case "PLACE_ORDER_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "PLACE_ORDER_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "PLACE_ORDER_FAILURE": return {
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
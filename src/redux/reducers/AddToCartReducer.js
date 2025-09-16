const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    },
    payload:[]

}


export const AddToCartReducer = (newState = state, action) => {

    switch (action.type) {
        case "ADD_TO_CART_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload:[]
        }

        case "ADD_TO_CART_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "ADD_TO_CART_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "ADD_TO_CART_FAILURE": return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: action.payload
            }
        }
        
        case "ADD_TO_CART_PAYLOAD": return {
            ...newState,
            isLoading: false,
            payload: action.payload
        }

        default: return newState
    }
}
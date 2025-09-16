const state = {
    cartList: [],
    isLoading: false,
    error: {
        hasErrors: false
    },

    count: 0

}


export const GetCartList = (newState = state, action) => {

    switch (action.type) {
        case "GET_CART_LIST_RESET": return {
            cartList: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload: []
        }

        case "GET_CART_LIST_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_CART_LIST_SUCCESS": return {
            ...newState,
            cartList:JSON.parse(JSON.stringify(action.payload)),
            isLoading: false
        }

        case "GET_CART_LIST_FAILURE": return {
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
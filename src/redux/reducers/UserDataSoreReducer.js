const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    },
    payload:[]

}


export const UserDataStoreReducer = (newState = state, action) => {

    switch (action.type) {
        case "USER_DATA_STORE_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload:[]
        }

        case "USER_DATA_STORE_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "USER_DATA_STORE_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "USER_DATA_STORE_FAILURE": return {
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
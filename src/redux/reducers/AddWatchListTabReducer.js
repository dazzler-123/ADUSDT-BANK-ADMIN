const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    },
    payload:[]

}


export const AddWatchListTabReducer = (newState = state, action) => {

    switch (action.type) {
        case "ADD_WATCH_LIST_TO_TAB_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload:[]
        }

        case "ADD_WATCH_LIST_TO_TAB_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "ADD_WATCH_LIST_TO_TAB_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "ADD_WATCH_LIST_TO_TAB_FAILURE": return {
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
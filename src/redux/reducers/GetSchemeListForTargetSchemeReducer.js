const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}


export const GetSchemeListForTargetSchemeReducer = (newState = state, action) => {

    switch (action.type) {
        case "GET_SCHEME_LIST_FOR_TARGET_SCHEME_RESET": return {
            ...newState,
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_SCHEME_LIST_FOR_TARGET_SCHEME_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "GET_SCHEME_LIST_FOR_TARGET_SCHEME_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "GET_SCHEME_LIST_FOR_TARGET_SCHEME_FAILURE": return {
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
const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    },
    payload:[]

}


export const CreateChildModelDataReducer = (newState = state, action) => {

    switch (action.type) {
        case "ADD_CHILD_MODEL_DATA_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            },
            payload:[]
        }
        case "ADD_CHILD_MODEL_DATA_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "ADD_CHILD_MODEL_DATA_FAILURE": return {
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
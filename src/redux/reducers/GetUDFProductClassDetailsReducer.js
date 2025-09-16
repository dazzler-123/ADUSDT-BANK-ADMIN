const state = {
    data: [],
    isLoading: false,
    error: {
        hasErrors: false
    }
}

/**
 * Reducer function for handling actions related to  udf product class details.
 * 
 * @param {Object} newState - The current state of the reducer.
 * @param {Object} action - The action object containing the type and payload.
 * @returns {Object} The new state of the reducer.
 */
export const GetUDFProductClassDetailsReducer = (newState = state, action) => {

    switch (action.type) {
        case "UDF_PRODUCT_CLASS_RESET": return {
            data: [],
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "UDF_PRODUCT_CLASS_REQUEST": return {
            ...newState,
            isLoading: true
        }

        case "UDF_PRODUCT_CLASS_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "UDF_PRODUCT_CLASS_FAILURE": return {
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
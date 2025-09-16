const state = {
    data: { udfFieldValues: { dynamicTables: {} } },
    isLoading: false,
    error: {
        hasErrors: false
    }
}

export const GetCustomizeCartOrderDetails = (newState = state, action) => {

    switch (action.type) {
        case "GET_CUSTOMIZE_CARR_ORDERDETAIL_RESET": return {
            data: { udfFieldValues: { dynamicTables: {} } },
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case "GET_CUSTOMIZE_CARR_ORDERDETAIL_REQUEST": return {
            ...newState,
            isLoading: true

        }

        case "GET_CUSTOMIZE_CARR_ORDERDETAIL_SUCCESS": return {
            ...newState,
            data: action.payload,
            isLoading: false
        }

        case "GET_CUSTOMIZE_CARR_ORDERDETAIL_FAILURE": return {
            data: { udfFieldValues: { dynamicTables: {} } },
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
const state = {
    isLoading: false,
    error: {
        hasErrors: false
    }
}

/**
 * Reducer function for handling actions related to dropdown data in the application.
 * 
 * This reducer manages the state of dropdown data, including portfolio type, product sub-class, and order type.
 * It handles actions for requesting, receiving, and failing to receive this data.
 * 
 * @param {object} newState - The current state of the reducer.
 * @param {object} action - The action object containing the type and payload.
 * @returns {object} - The new state of the reducer.
 */
export const GetDropdownDataReducer = (newState = state, action) => {

    switch (action.type) {
        case 'RESET_DROPDOWN_LIST': return {
            isLoading: false,
            error: {
                hasErrors: false
            }
        }

        case 'PORTFOLIO_TYPE_REQUEST': return {
            ...newState,
            isLoading: true
        }

        case 'PORTFOLIO_TYPE_SUCCESS': return {
            ...newState,
            isLoading: false,
            portfolioType: action.payload
        }

        case 'PORTFOLIO_TYPE_FAILURE': return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: {
                    ...newState.error.msg,
                    portfolioType: action.payload
                }
            }
        }

        case 'PRODUCT_SUB_CLASS_REQUEST': return {
            ...newState,
            isLoading: true
        }

        case 'PRODUCT_SUB_CLASS_SUCCESS': return {
            ...newState,
            isLoading: false,
            productSubClass: action.payload
        }

        case 'PRODUCT_SUB_CLASS_FAILURE': return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: {
                    ...newState.error.msg,
                    productSubClass: action.payload
                }
            }
        }

        case 'ORDER_TYPE_REQUEST': return {
            ...newState,
            isLoading: true
        }

        case 'ORDER_TYPE_SUCCESS': return {
            ...newState,
            isLoading: false,
            orderType: action.payload
        }

        case 'ORDER_TYPE_FAILURE': return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: {
                    ...newState.error.msg,
                    orderType: action.payload
                }
            }
        }

        case 'PRODUCT_CLASS_REQUEST': return {
            ...newState,
            isLoading: true
        }

        case 'PRODUCT_CLASS_SUCCESS': return {
            ...newState,
            isLoading: false,
            productClass: action.payload
        }

        case 'PRODUCT_CLASS_FAILURE': return {
            ...newState,
            isLoading: false,
            error: {
                ...newState.error,
                hasErrors: true,
                msg: {
                    ...newState.error.msg,
                    productClass: action.payload
                }
            }
        }

        default: return newState
    }
}
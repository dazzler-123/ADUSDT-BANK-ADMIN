const state = {
    data: [], // This will hold the portfolio view type data from the API response
    isLoading: false, // This indicates whether the API call is in progress
    error: { // This holds any error information
        hasErrors: false,
       // msg: null // Optionally store the error message
    }
};

/**
 * Reducer function for handling actions related to portfolio view type.
 * 
 * @param {Object} newState - The current state of the reducer.
 * @param {Object} action - The action object containing the type and payload.
 * @returns {Object} The new state of the reducer.
 */
export const GetPortFolioViewTypesReducer = (newState = state, action) => {
    switch (action.type) {
        case "PORTFOLIO_VIEW_TYPE_REQUEST":
            return {
                ...newState,
                isLoading: true, // Set loading to true during the request
                //error: { hasErrors: false, msg: null } // Reset error state
            };

        case "PORTFOLIO_VIEW_TYPE_SUCCESS":
            return {
                ...newState,
                data: action.payload, // Populate the data with the API response payload
                isLoading: false, // Set loading to false since the request succeeded
               // error: { hasErrors: false, msg: null } // No errors on success
            };

        case "PORTFOLIO_VIEW_TYPE_FAILURE":
            return {
                ...newState,
                isLoading: false, // Set loading to false since the request failed
                error: {
                    ...newState.error,
                    hasErrors: true,
                    msg: action.payload // Store the error message
                }
            };

        default:
            return newState; // Return the current state if the action type is unrecognized
    }
};

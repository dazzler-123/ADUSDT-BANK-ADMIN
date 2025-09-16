// const state = {
//     data: null,
//     isLoading: false,
//     error: {
//         hasErrors: false
//     }
// }

// export const ValidateLogoutReducer = (newState = state, action) => {

//     switch (action.type) {
        
//         case ' AUTHENTICATION_LOGOUT_REQUEST': return {
//             ...newState,
//             isLoading: true
//         }

//         case ' AUTHENTICATION_LOGOUT_SUCCESS': return {
//             ...newState,
//             isLoading: false,
           
//         }

//         case ' AUTHENTICATION_LOGOUT_FAILURE': return {
//             ...newState,
//             isLoading: false,
//             error: {
//                 ...newState.error,
//                 hasErrors: true,
             
//             }
//         }

//         default: return newState
//     }
// }
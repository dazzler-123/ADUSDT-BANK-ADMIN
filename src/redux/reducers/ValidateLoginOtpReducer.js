// const state = {
//     data: null,
//     isLoading: false,
//     error: {
//         hasErrors: false
//     }
// }

// export const ValidateLoginOtpReducer = (newState = state, action) => {

//     switch (action.type) {
//         case 'VALIDATE_LOGIN_OTP_DATA_REQUEST': return {
//             ...newState,
//             isLoading: true
//         }

//         case 'VALIDATE_LOGIN_OTP_DATA_SUCCESS': return {
//             ...newState,
//             isLoading: false,
//             data: action.payload
//         }

//         case 'VALIDATE_LOGIN_OTP_DATA_FAILURE': return {
//             ...newState,
//             isLoading: false,
//             error: {
//                 ...newState.error,
//                 hasErrors: true,
//                 msg: action.payload
//             }
//         }

//         default: return newState
//     }
// }
const state = {
    data: {},
    
    payload:{}

}


export const InvestNowLumpSumActionReducer = (newState = state, action) => {

    switch (action.type) {
        case "INVEST_NOW_LUMPSUM_DATA_RESET": return {
            data: {},
            payload:{}
        }
        case "INVEST_NOW_LUMPSUM_DATA_SAVE": return {
    
            data: action.payload,
        }
        default: return newState
    }
}
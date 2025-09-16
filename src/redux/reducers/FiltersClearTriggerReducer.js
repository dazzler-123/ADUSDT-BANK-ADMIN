const state = {
    trigger: false
}

export const FiltersClearTriggerReducer = (newState = state, action) => {

    switch (action.type) {
        case 'FILTERS_TRIGGER_CLEAR': return {
            ...newState,
            trigger: true
        }

        case 'FILTERS_TRIGGER_RESET': return {
            ...newState,
            trigger: false
        }

        default: return newState
    }
}
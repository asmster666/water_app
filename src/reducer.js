const initialState = {
    cur_amount: 0,
    type: "",
    daily_amount: 0
} 

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CUR_AMOUNT' :
            return {
                ...state,
                cur_amount: state.cur_amount
            };
        case 'TYPE' :    
            return {
                ...state,
                type: state.type
            };
        case 'DAILY_AMOUNT' :
            return {
                ...state,
                daily_amount: state.daily_amount
            }
        default:
            return state;
    }
}

export default reducer;
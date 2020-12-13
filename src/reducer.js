const initialState = {
    cur_amount: 0,
    cur_type: "",
    daily_amount: 10
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
                cur_type: state.cur_type
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
const initialState = {
    cur_amount: 0,
    type: "",
    cur_daily_amount: 0,
    cookie_data: 0
} 

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CUR_AMOUNT' :
            return {
                ...state,
                cur_amount: action.payload
            };
        case 'TYPE' :    
            return {
                ...state,
                type: action.payload 
            };
        case 'CUR_DAILY_AMOUNT' :
            let new_daily = state.cur_daily_amount + action.payload
            return {
                ...state,
                cur_daily_amount: action.payload
            };
        case 'COOKIE_DATA' :
            return {
                ...state,
                cookie_data: action.payload
            };
        default:
            return state;
    }
}

export default reducer;
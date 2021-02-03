const get_cur_amount = (data) => ({type: 'CUR_AMOUNT', payload: data});
const get_type = (data) => ({type: 'TYPE', payload: data});
const get_cur_daily_amount = () => ({type: 'CUR_DAILY_AMOUNT'});

export {
    get_cur_amount,
    get_type,
    get_cur_daily_amount, 
};
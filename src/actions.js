const get_weight_test = (data) => ({type: 'WEIGHT_TEST', payload: data});
const get_activity_test = (data) => ({type: 'ACTIVITY_TEST', payload: data});
const get_sex_test = (data) => ({type: 'SEX_TEST', payload: data});
const get_cur_amount = (data) => ({type: 'CUR_AMOUNT', payload: data});
const get_type = (data) => ({type: 'TYPE', payload: data});
const get_cur_daily_amount = (data) => ({type: 'CUR_DAILY_AMOUNT', payload: data});
const get_sum_daily_amount = (data) => ({type: 'SUM_DAILY_AMOUNT', payload: data});
const get_cookie_data = (data) => ({type: 'COOKIE_DATA', payload: data})

export {
    get_weight_test,
    get_activity_test,
    get_sex_test,
    get_cur_amount,
    get_type,
    get_cur_daily_amount,
    get_sum_daily_amount,
    get_cookie_data,
};
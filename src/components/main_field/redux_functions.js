
this.getDailyValue(cur_amount, ".wrapper");
this.getDailyValue(type, ".slider");


getValues = (item, selector) => {
    const wrap = document.querySelector(selector).children;
    for (let elem of wrap) {
        if(elem.classList.contains("active")){
            item = elem.textContent
        }
    }

}

const{cur_amount, type} = this.props;



getSum = () => {
    
}


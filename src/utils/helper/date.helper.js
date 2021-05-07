import moment from "moment";

// moment.lang('');
const DateHelper = {
    shortDate: (date) => {
        return moment(date).format("DD/MM/YYYY");
    },
    fullDate: (date) => {
        return moment(date).format("DD MMM YYYY dddd");
    },
    formatDateTime: (date) => {
        return moment(date).format('HH:mm DD/MM/YYYY');
    },

}


export default DateHelper;
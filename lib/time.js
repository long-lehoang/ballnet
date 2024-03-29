export function formatTimeMessage(string) {
    if (string == '' || string == null) {
        return '';
    }

    let today = new Date();
    let time = new Date(string);

    let diff = (today - time)/(1000*3600*24);
    
    let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    let minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    let date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
    let month = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;

    if(diff>1 || today.getDate() != time.getDate()){
        return `${hour}:${minute} ${date}/${month}/${time.getFullYear()}`;
    }else{
        return `${hour}:${minute}`;
    }

}

export default function convertTime(string) {
    let time = new Date(string);
    time = time.getTime();
    let now = Date.now();
    let result = now - time;
    let date = result / 86400000;
    let text;
    if (date < 1) {
        let hour = date * 24;
        if (hour < 1) {
            let minute = hour * 60;
            minute = Math.floor(minute);
            text = minute + ' minutes ago'
        } else {
            hour = Math.floor(hour);
            text = hour + ' hours ago';
        }

    } else if (date > 30) {
        let time = new Date(string);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        text = day + '-' + month + '-' + year;
    } else {
        date = Math.floor(date);
        text = date + ' days ago';
    }
    return text;
}

export function formatDateTime(datetime) {
    var d = new Date(datetime),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = '00';
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    if (hours == 0)
        hours = '00';
    else if (hours < 10)
        hours = '0' + hours;

    if (minutes == 0)
        minutes = '00';
    else if (minutes < 10)
        minutes = '0' + minutes;

    let date = [year, month, day].join('-');
    let time = [hours, minutes, seconds].join(':');
    return `${date} ${time}`;
}

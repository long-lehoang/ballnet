export default function convertTime(string){
    let time = new Date(string);
    time = time.getTime();
    let now = Date.now();
    let result = now - time;
    let date = result/86400000;
    let text;
    if(date<1){
        let hour = date*24;
        if(hour<1){
            let minute = hour*60;
            minute = Math.floor(minute);
            text = minute + ' minutes ago'
        }else{
            hour = Math.floor(hour);
            text = hour+' hours ago';
        }
        
    }else if(date>30){
        let time = new Date(string);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        text = day + '-' + month + '-' + year;
    }else{
        date = Math.floor(date);
        text = date+' days ago';
    }
    return text;
}

export default function tagging(tags){
    if(tags == null){
        return '';
    }else{
        let text;
        for(let i = 0; i<tags.length ; i++){
            if(i==0){
                text += ' is staying with '+ tags[i].name;
            }else{
                text += ' and '+ tags[i].name;
            }
        }
    }
}
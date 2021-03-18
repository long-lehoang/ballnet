import { string } from "prop-types";

export default function tagging(tags,optionSearch=[]){
    
    if(tags == null || tags.length == 0){
        return '';
    }else{
        let text = '';
        for(let i = 0; i<tags.length ; i++){
            if(i==0){
                text = ' is staying with '+ tags[i].name;
            }else{
                text += ' and '+ tags[i].name;
            }
        }
        return text;
    }
}
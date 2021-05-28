import { string } from "prop-types";

export default function tagging(tags,optionSearch=[]){
    
    if(tags == null || tags.length == 0){
        return '';
    }else{
        let text = '';
        for(let i = 0; i<tags.length ; i++){
            if(i==0){
                text = tags[i].name;
            }else{
                text += ', '+ tags[i].name;
            }
        }
        return text;
    }
}
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function loadStar(points = 0.0, height = 15){
    let rows = [];
    for (var i = 0 ; i < Math.floor(points) ; i++){
        rows.push(
            <FontAwesomeIcon icon={faStar} height={height}></FontAwesomeIcon>
        )
    }

    if(points != Math.floor(points)){
        rows.push(
            <FontAwesomeIcon icon={faStarHalf} height={height}></FontAwesomeIcon>
        )
    }
    return rows;
}
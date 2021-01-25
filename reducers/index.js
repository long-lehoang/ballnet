import {combineReducers} from "redux";
import exampleReducers from "./exampleReducers";
import example1Reducers from "./example1Reducers";


const rootReducer = combineReducers({
    example: exampleReducers,
    example1: example1Reducers,
});

export default rootReducer;
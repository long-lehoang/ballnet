import {DECREMENT_COUNTER, INCREMENT_COUNTER} from '../actions/counterActions';

const example1Reducers = (state = {value: 0}, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {...state, value: state.value + 1};
        case DECREMENT_COUNTER:
            return {...state, value: state.value - 1};
        default:
            return {...state};
    }
};

export default example1Reducers;
//Action Types
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";


//Action Creator
export const incrementCounter = (obj) => ({
   type: INCREMENT_COUNTER,
   payload: obj,
});

export const decrementCounter = (obj) => ({
    type: DECREMENT_COUNTER,
    payload: obj,
});
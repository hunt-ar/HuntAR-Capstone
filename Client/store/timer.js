const initialState = {
  timeRemaining: 0,
  id: 0
};

//Action Types
const SET_TIME = 'SET_TIME;'
const DECREMENT_TIME = 'DECREMENT_TIME';
const REGISTER_INTERVAL = 'REGISTER_INTERVAL';
const CLEAR_INTERVAL = 'CLEAR_INTERVAL'
const RESET_TIMER = 'RESET_TIMER'

//Action Creators
export const setTimeAction = (time) => {
  return {
    type: SET_TIME,
    time
  }
}
export const decrementTimeAction = () => {
  return {
    type: DECREMENT_TIME
  }
};
export const registerIntervalAction = (id) => {
  return {
    type: REGISTER_INTERVAL,
    id
  }
}
export const clearIntervalAction = (id) => {
  return {
    type: CLEAR_INTERVAL,
    id
  }
}
export const resetTimerAction = () => {
  return {
    type: RESET_TIMER
  }
}

//Thunk Creators
export const thunk_beganTimer = (time) => {
  return dispatch => {
    dispatch(setTimeAction(time))
    const id = setInterval(() => {
      dispatch(decrementTimeAction())
    }, 1000);
    dispatch(registerIntervalAction(id));
  }
}

export const thunk_stoppedTimer = (id) => {
  return dispatch => {
    dispatch(clearIntervalAction(id));
  }
}
export const thunk_resetTimer = () => {
  return dispatch =>{
    dispatch(resetTimerAction());
    }
}

//Sub-Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TIME:
      console.log('timer has started!');
      return { ...state, timeRemaining: action.time }
    case DECREMENT_TIME:
      let currentTime = state.timeRemaining;
      if (currentTime > 0) {
        currentTime = currentTime - 1;
        return { ...state, timeRemaining: currentTime };
      }
      else {
        return state;
      }
    case REGISTER_INTERVAL:
      return { ...state, id: action.id }
    case CLEAR_INTERVAL:
      clearInterval(state.id);
      return { ...state, id: 0 }
    case RESET_TIMER:
      return { ...state, timeRemaining: 0, id: 0 }
    default:
      return state;
  }
}

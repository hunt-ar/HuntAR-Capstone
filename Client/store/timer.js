import { Audio } from 'expo'

const initialState = {
  timeRemaining: 0,
  id: 0,
  finalTime: 0
};

let tickSound;

const playSound = async () => {
  try {
      tickSound = new Audio.Sound();
      await tickSound.loadAsync(require('../../assets/sounds/tick.mp3'));
      tickSound.playAsync();
      tickSound.setIsLoopingAsync(true);
  } catch (error) {
    // An error occurred!
  }
}

//Action Types
const SET_TIME = 'SET_TIME;'
const DECREMENT_TIME = 'DECREMENT_TIME';
const REGISTER_INTERVAL = 'REGISTER_INTERVAL';
const CLEAR_INTERVAL = 'CLEAR_INTERVAL'
const RESET_TIMER = 'RESET_TIMER'
const SET_FINAL_TIME = 'SET_FINAL_TIME'
const PLAY_TICK_SOUND = 'PLAY_TICK_SOUND'

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
export const playTickAction = () => {
  return {
    type: PLAY_TICK_SOUND
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

export const setFinalTime = time => {
  return {
    type: SET_FINAL_TIME,
    time
  };
};
//Thunk Creators
export const thunk_beganTimer = (time) => {
  return dispatch => {
    dispatch(setTimeAction(time))
    playSound();

    const id = setInterval(() => {
      dispatch(decrementTimeAction());
    }, 1000);
    dispatch(registerIntervalAction(id));
  }
}

export const thunk_stoppedTimer = (id) => {
  return dispatch => {
    tickSound.stopAsync();
    dispatch(clearIntervalAction(id));
  }
}
export const thunk_resetTimer = () => {
  return dispatch => {
    dispatch(resetTimerAction());
  }
}

//Sub-Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TIME:
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
    case SET_FINAL_TIME:
      return { ...state, finalTime: action.time };
    default:
      return state;
  }
}

const initialState = {
  inventory: [],
  code: ''
};

const ADD_ITEM = 'ADD_ITEM';
const CLEAR_INVENTORY = 'CLEAR_INVENTORY';
const SET_CODE = 'SET_CODE';

export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  };
};

export const setCode = code => {
  return {
    type: SET_CODE,
    code
  };
};

export const clearInventoryAction = () => {
  return {
    type: CLEAR_INVENTORY
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      //if inventory already contains, then don't add
      let tempInventory = [...state.inventory];
      tempInventory.push(action.item);
      return { ...state, inventory: [...tempInventory] };
    //might need an empty arr
    case CLEAR_INVENTORY:
      return { ...state, inventory: initialState.inventory };
    case SET_CODE:
      return { ...state, code: action.code };
    default:
      return state;
  }
}

const initialState = {
  inventory: []
};

const ADD_ITEM = 'ADD_ITEM';

export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      let tempInventory = [...state.inventory];
      tempInventory.push(action.item);
      return { ...state, inventory: [...tempInventory] };
    default:
      return state;
  }
}

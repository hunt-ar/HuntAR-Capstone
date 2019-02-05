const initialState = {
  inventory: []
};

const ADD_ITEM = 'ADD_ITEM';
const CLEAR_INVENTORY = 'CLEAR_INVENTORY'

export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  };
};

export const clearInventoryAction = () => {
  return {
    type: CLEAR_INVENTORY
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      console.log('action', action)
      //if inventory already contains, then don't add
      let tempInventory = [...state.inventory];

      // const result = tempInventory.find(item => item.name === action.item.name);
      // if (result) {
      //   return { ...state}
      // } else {
      //     tempInventory.push(action.item);
      //   return { ...state, inventory: [...tempInventory] };
      // }
      
      if (!tempInventory.includes(action.item)) {
        tempInventory.push(action.item);
        return { ...state, inventory: [...tempInventory] };
      } else {
        return { ...state}
      }
      //might need an empty arr
    case CLEAR_INVENTORY:
      return { ...state, inventory: initialState.inventory }
    default:
      return state;
  }
}

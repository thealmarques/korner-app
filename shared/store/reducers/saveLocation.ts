import { SAVE_LOCATION } from "../actions/actionTypes";

const initialState = {
  location: ""
};
export const saveLocation = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOCATION:
      return {
        ...state,
        location: action.location
      };
    default:
      return state;
  }
};

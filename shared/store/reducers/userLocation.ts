import { USER_LOCATION } from "../actions/actionTypes";

const initialState = {
  coordinates: "",
  name: ""
};
export const userLocation = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOCATION:
      return {
        ...state,
        coordinates: action.coordinates,
        name: action.name
      };
    default:
      return state;
  }
};

import { setUserName, setPhotoUrl, setUserNameType, setPhotoUrlType } from "../actions/user.actions";

const initialState = {
  name: "",
  photoUrl: ""
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUserNameType:
      return {
        ...state,
        name: action.name
      };
    case setPhotoUrlType:
      return {
        ...state,
        photoUrl: action.photoUrl
      };
    default:
      return state;
  }
};

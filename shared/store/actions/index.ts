import { SAVE_LOCATION } from "./actionTypes";

export const saveLocation = value => ({
  type: SAVE_LOCATION,
  location: value
});
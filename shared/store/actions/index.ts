import { USER_LOCATION } from "./actionTypes";

export const userLocation = (coordinates, name) => ({
  type: USER_LOCATION,
  coordinates: coordinates,
  name: name
});
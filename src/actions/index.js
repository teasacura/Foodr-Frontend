//This is just one example of an adapter class for containing our fetches
import { RestfulAdapter } from "../adapters";

export function fetchInitialRestaurants() {
  //using thunk, we return are returning a function here instead of
  //a plain object.  Thunk intercepts this returned value, and if it is a
  //function, cancels the normal event of calling our reducers, and
  //instead, passes in 'dispatch' as an argument to the function.
  //the fetch request was extracted out to our adapter, but still functions the same
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    RestfulAdapter.indexFetch("businesses").then(data => {
      dispatch({ type: "RESTAURANTS_LOAD", payload: data });
    });
  };
}

// export function fetchCurrentUser(id) {
//   return dispatch => {
//     dispatch({ type: "USER_LOADING" });
//     RestfulAdapter.showFetch("users", id).then(data => {
//       dispatch({ type: "USER_LOAD", payload: data });
//     });
//   };
// }

export function postFavoriteRestaurant(id){
  return dispatch => {
    dispatch({ type: "FAVORITE_LOADING" });
    const body = {business_id: id}
    RestfulAdapter.createFetch("favorites", body).then(data => {
      dispatch({ type: "FAVORITE_LOAD", payload: data})
    });
  }
}

export function selectRestaurant(restaurant) {
  return { type: "SELECT_RESTAURANT", payload: restaurant };
}

export function clearRestaurant() {
  return { type: "CLEAR_RESTAURANT" }
}

// export function updateHobbit({ id, name, title, key_skill }) {
//   return dispatch => {
//     RestfulAdapter.editFetch("hobbits", id, {
//       hobbit: { name, title, key_skill }
//     }).then(data => {
//       dispatch(setHobbit(data));
//     });
//   };
// }
//
// export function setHobbit(hobbit) {
//   return { type: "SET_HOBBIT", payload: hobbit };
// }

// export function updateForm(formData) {
//   return { type: "UPDATE_FORM", payload: formData };
// }

export function logIn(user) {
  return { type: "LOG_IN", payload: user };
}

export function logOut() {
  return { type: "LOG_OUT" };
}

export const getLocation = () => {
    let action = {};

    const defaultLocation = {
            coords: {
              latitude: 40.7007739,
              longitude: -73.9877738
            }
        };

    const geolocation = navigator.geolocation;

    const location = geolocation.getCurrentPosition(position => position)

  //   const location = new Promise((resolve, reject) => {
  //       if (!geolocation) {
  //           reject(new Error('Not Supported'));
  //       }
  //
  //   geolocation.getCurrentPosition((position) => {
  //       resolve(position);
  //   }, () => {
  //       reject (new Error('Permission denied'));
  //   });
  // });

  if (!location) {
    action = {
        type: "GET_LOCATION",
        payload: defaultLocation
    }
  } else {
    action = {
        type: "GET_LOCATION",
        payload: location
      }
    }

    return dispatch => {dispatch(action)};
  }

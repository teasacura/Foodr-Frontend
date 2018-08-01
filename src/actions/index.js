//This is just one example of an adapter class for containing our fetches
import { RestfulAdapter } from "../adapters";

export function fetchInitialRestaurants(location) {
  // console.log(location);
  //using thunk, we return are returning a function here instead of
  //a plain object.  Thunk intercepts this returned value, and if it is a
  //function, cancels the normal event of calling our reducers, and
  //instead, passes in 'dispatch' as an argument to the function.
  //the fetch request was extracted out to our adapter, but still functions the same
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    // const body = {term: "Food", latitude: 40.7007739, longitude: -73.9877738}
    const body = {term: "Food", latitude: location.latitude, longitude: location.longitude}
    // console.log(body);
    RestfulAdapter.createFetch("searches", body).then(data => {
      // console.log("received", data)
      dispatch({ type: "RESTAURANTS_LOAD", payload: data });
      dispatch({ type: "USER_DONE" })
    });
  };
}

export function createNewUser(body){

  return dispatch => {
    dispatch({ type: "USER_LOADING" })
    const newMessage = RestfulAdapter.createFetch("users", body)
    .then(obj => alert(obj.msg))
    dispatch({ type: "USER_DONE" })

    return newMessage
  }
    // {
    //   dispatch({ type: "LOG_IN", payload: user})
    // });
}

export function postLogin(body){

  return dispatch => {
    dispatch({ type: "USER_LOADING" })
    const newMessage = RestfulAdapter.createFetch("api/v1/login", body)
      // obj => alert(obj.msg))
    dispatch({ type: "USER_DONE" })

    return newMessage
  }
    // {
    //   dispatch({ type: "LOG_IN", payload: user})
    // });
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

export function deleteFavoriteRestaurant(id){
  // console.log(id);
  return dispatch => {
    // dispatch({ type: "FAVORITE_LOADING" });
    // const body = {business_id: id}
    RestfulAdapter.deleteFetch("favorites", id).then(data => {
      dispatch({ type: "FAVORITE_LOAD", payload: data})
    });
  }
}

export function postSearch(term, latitude, longitude){
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    const body = {term: term, latitude: latitude, longitude: longitude }
    RestfulAdapter.createFetch("searches", body).then(data => {
      dispatch({ type: "RESTAURANTS_LOAD", payload: data})
    });
  }
}


export function selectRestaurant(restaurant) {
  // console.log(restaurant);
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

export const newLocation = (location) => {
  let action = {
    coords: {location}
  }
  return { type: "NEW_LOCATION", payload: action }
}

export const getLocation = () => {
  return dispatch => {
    // let action = {};

    // const defaultLocation = {
    //         coords: {
    //           latitude: 40.7007739,
    //           longitude: -73.9877738
    //         }
    //     };
    dispatch({ type: "LOCATION_LOADING" });

    const geolocation = navigator.geolocation;

    // const location = geolocation.getCurrentPosition(position => position)
    // geolocation.getCurrentPosition(position =>
    //   // console.log(position))
    //   position.coords)
    //   .then(location =>
    // {
    //     dispatch({type: "GET_LOCATION", payload: location})
    //     return location
    //   }).then(console.log)
        // position =>
        //   fetchInitialRestaurants({
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        // }))
    // }

    const location = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }

    geolocation.getCurrentPosition((position) => {
        resolve(position);
    }, () => {
        reject (new Error('Permission denied'));
    });
  }).then(position => sendPosition(position)).then(position => {
        if (!position) {
          // console.log("no position");
          dispatch({
             type: "NO_LOCATION"
         })
          // fetchInitialRestaurants({latitude: 40.7007739, longitude: -73.9877738})
          //   action = {
          //       type: "GET_LOCATION",
          //       payload: defaultLocation
          //   }
        } else {
          // console.log(position);
          dispatch({
            type: "GET_LOCATION",
            payload: position
          })
        }

        return position
        //
        // return dispatch => {dispatch(action)};
      }).then(position => {
        // console.log(position)
        fetchInitialRestaurants({latitude: position.coords.latitude, longitude: position.coords.longitude})
      }
      )


    }
  }


const sendPosition = (position) => {
  return position
}

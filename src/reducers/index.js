import { combineReducers } from 'redux';

const restaurantsReducer = (state = { restaurants: [], selectedRestaurant: null, loading: false, formData: {name: "", title: "", key_skill: ""} }, action) => {
  switch (action.type) {
    case "RESTAURANTS_LOADING":
      return {
        ...state,
        loading: true
      }
    case "RESTAURANTS_LOAD":
      return {
        ...state,
        restaurants: action.payload,
        loading: false
      };
    case "SELECT_RESTAURANT":
      return {
        ...state,
        selectedRestaurant: action.payload
      };
    case "CLEAR_RESTAURANT":
      return {
        ...state,
        selectedRestaurant: null}


    // case "UPDATE_FORM":
    //   return {
    //     ...state,
    //     formData: {...state.formData, ...action.payload}
    //   };
    // case "SET_HOBBIT":
    //
    //   return {
    //     ...state,
    //     hobbits: state.hobbits.map(hobbit => {
    //       if(hobbit.id === action.payload.id) {
    //         return action.payload
    //       } else {
    //         return hobbit
    //       }
    //     })
    //   }
    default:
      return state;
  }
}

const userReducer = (state={loggedIn: false, currentUser: null, loading: false, location: {}}, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
        currentUser: action.payload
      };
    case "LOG_OUT":
      return {
        ...state,
        loggedIn: false,
        currentUser: null
      };
    case "USER_LOADING":
      return {
        ...state,
        loading: true
      }
    case "USER_LOAD":
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      };
    case "GET_LOCATION": {
          return {
              ...state,
              location: {
                  latitude: action.payload.coords.latitude,
                  longitude: action.payload.coords.longitude,
              }
          }
      }
    case "FAVORITE_LOADING":
      return {
        ...state,
        loading: true
      }
    case "FAVORITE_LOAD":
    // const copyRestaurants = state.currentUser
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favorites: action.payload
        },
        loading: false
      }
    default:
      return state;
  }

}


const rootReducer = combineReducers({
  user: userReducer,
  restaurants: restaurantsReducer
});

// NOTE:
// the keys in the object passed to combineReducers
// will become the top level keys of redux store state
// i.e. store.getState() would return =>
// {
//   paintings: {
//     /* state returned ftom paintingsReducer */
//   },
//   activePainting: {
//     /* state returned from activePaintingReducer */
//   }
// }

export default rootReducer;

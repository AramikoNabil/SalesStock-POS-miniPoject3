import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultState = {
  loggedIn: false,
  user: {},
  homeUser: {},
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        loggedIn: true,
        user: {...action.payload},
      };
    case 'HOME_USER':
      return {
        ...state,
        loggedIn: true,
        homeUser: {...action.payload},
      };

    case 'LOG_OUT':
      AsyncStorage.clear();
      return {
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;

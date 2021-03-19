// // pacth to add to cart and remove to cart

import {combineReducers} from 'redux';
import userReducer from '../reducers/userReducers';
import commentReducer from '../reducers/commentReducers';

const rootReducer = combineReducers({
  userReducer,
  commentReducer,
});

export default rootReducer;

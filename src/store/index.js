import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppReducer from 'reducers/AppReducer';

export const store = createStore(AppReducer, composeWithDevTools());

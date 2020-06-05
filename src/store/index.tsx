import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { StateType } from './reducer';
import logger from './logger';

const middleWares = [logger];

const store = createStore(reducer, applyMiddleware(...middleWares));

export type StoreType = StateType;
export default store;

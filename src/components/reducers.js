import { filter, curry } from 'ramda';
import {
  NEW_WORKSPACE,
  REMOVE_WORKSPACE,
  TOGGLE_CONTROLS
} from './actions';

let wId = 0;

export const controls = (state = { open: false }, { type }) => {
  switch(type) {
    case TOGGLE_CONTROLS:
      return { ...state, open: !state.open };
    default:
      return state;
  }
};

const isnt = curry((id, { id: r }) => id !== r);
const removeWS = (id, state) => filter(isnt(id), state);

export const cards = (state = [], { id, type }) => {
  switch(type) {
    case NEW_WORKSPACE:
      return [...state, { new: true, id: `workspace${wId++}` }];
    case REMOVE_WORKSPACE:
      return removeWS(id, state);
    default:
      return state;
  }
};

export default {
  controls,
  cards
}


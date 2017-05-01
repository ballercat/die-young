import { TOGGLE_CONTROLS } from './actions';

export const controls = (state = { open: false }, { type }) => {
  switch(type) {
    case TOGGLE_CONTROLS:
      return { ...state, open: !state.open };
    default:
      return state;
  }
};

export default {
  controls
}


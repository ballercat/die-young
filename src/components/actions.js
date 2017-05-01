
export const TOGGLE_CONTROLS = 'TOGGLE_CONTROLS';
export const NEW_WORKSPACE = 'NEW_WORKSPACE';
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE';

export const removeWorkspace = id => ({ id, type: REMOVE_WORKSPACE });
export const newWorkspace = () => ({ type: NEW_WORKSPACE });
export const toggleControls = () => ({ type: TOGGLE_CONTROLS });


export const getControls = (state) => ({
  ...state.controls,
  docked: false,
  width: 500
});

export const getAppBar = (state) => ({
  title: "Worbench"
});

export const getMain = ({ cards }) => ({
  cards
});


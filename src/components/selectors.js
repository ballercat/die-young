export const getControls = (state) => ({
  ...state.controls,
  docked: false,
  width: 500
});

export const getAppBar = (state) => ({
  title: "Worbench"
});

export const getMain = ({ cards }) => ({
  style: {
    height: '100vw',
    margin: '10px',
    padding: '10px'
  },
  cards
});


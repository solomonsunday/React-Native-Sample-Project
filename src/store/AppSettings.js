// initial state values
const initialState = {
  darkMode: false,
  locale: 'en',
};

// set initial state value in the reducer, keeping the original for reset features
const initializeState = (initialValues) => ({ ...initialValues });

// state reducer
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SETTINGS':
      return {
        ...prevState,
        ...action.settings,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...prevState,
        ...action.settings,
      };
    default:
      return {
        ...prevState,
        ...initialState,
      };
  }
};

export { reducer, initialState, initializeState };

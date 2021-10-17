// initial state values
const initialState = {
  loginToken: null,
  userData: null,
  isLoggedIn: false,
};

// set initial state value in the reducer, keeping the original for reset features
const initializeState = (initialValues) => ({ ...initialValues });

// state reducer
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return {
        ...prevState,
        loginToken: action.token,
        isLoggedIn: !!action.token,
      };
    case 'LOG_IN':
      return {
        ...prevState,
        loginToken: action.token,
        isLoggedIn: true,
      };
    case 'SIGN_UP':
      return {
        ...prevState,
        loginToken: action.token,
      };
    case 'LOG_OUT':
      return {
        ...prevState,
        ...initialState,
      };
    default:
      return {
        ...prevState,
        ...initialState,
      };
  }
};

export { reducer, initialState, initializeState };

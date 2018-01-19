const initialState = {
  message: 'Hello, world!',
};


const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'hello-world-clicked':
      return { message: 'You clicked the message!' };
    default:
      return state;
  }
};

export default reducer;

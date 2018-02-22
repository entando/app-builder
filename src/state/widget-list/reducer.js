import { SET_STATE } from './types';


// const tableRowItems = (state = [], action = {}) => {
//   switch (action.type) {
//     case SET_STATE: {
//       return Object.assign({}, state, {
//         tableRow: [
//           ...state.tableRow,
//           {
//             code: action.code,
//             name: action.name,
//             used: action.used,
//           },
//         ],
//       });
//     }
//     default: return state;
//   }
// };
//
// export default tableRowItems;


const tableRowItems = (state = [], action = {}) => {
  console.log('action tablerowitems', action);
  switch (action.type) {
    case SET_STATE: {
      return action.payload.tableRow;
    }
    default: return state;
  }
};

export default tableRowItems;

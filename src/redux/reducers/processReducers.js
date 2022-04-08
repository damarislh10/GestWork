import { typesProcess } from "../types/types";

export { typesProcess } from "../types/types";

const inicialState = {
  process: [],
};

export const processReducers = (state = inicialState, action) => {
  switch (action.type) {
    case typesProcess.add:
      return {
        process: [action.payload],
      };
    case typesProcess.list:
      return {
        process: [...action.payload]
      };
    case typesProcess.edit: 
      return {
        ...state
      };
    case typesProcess.delete: 
      return {
          process: state.process.filter(pro => pro.id !== action.payload)
      };
    case typesProcess.searchProcess: 
      return {
        process: action.payload
      };
    default:
      return state;
  }
};

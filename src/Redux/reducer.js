import { actionContants } from "./action";

const initState = {
  todos: [
    {
      id: 1,
      status: false,
      title: "STUDY DSA"
    }
  ]
};

const reducer = (state = initState, action) => {
  console.log(state, action);
  switch (action.type) {
    case actionContants.ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    }
    case actionContants.REMOVE_TODO_ITEM: {
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action?.payload?.id)
      };
    }
    case actionContants.TOGGLE_TODO_STATUS: {
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: !item.status }
            : item
        )
      };
    }
    default:
      return state;
  }
};

export default reducer;

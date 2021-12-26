import TodoList from "./TodoList";
import { TodoInput } from "./TodoInput";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/action";
import { v4 as uuid } from "uuid";

const Todo = () => {
  const dispatch = useDispatch();

  const handleAdd = (text) => {
    const action = addTodo({
      title: text,
      status: false,
      id: uuid()
    });
    dispatch(action);
  };

  return (
    <div>
      <TodoInput onAdd={handleAdd} />
      <TodoList />
    </div>
  );
};

export default Todo;

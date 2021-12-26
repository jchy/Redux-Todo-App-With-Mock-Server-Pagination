import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo } from "../Redux/action";

const TodoItem = ({ title, status, onDelete, id, onToggle }) => {
  return (
    <div style={{ display: "flex", padding: "1 rem" }}>
      <div>{title} - </div>
      <div>{`${status}`}</div>
      <button onClick={() => onDelete(id)}>DELETE</button>
      <button onClick={() => onToggle(id)}>TOGGLE</button>
    </div>
  );
};

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };

  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };

  return (
    <div>
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
export default TodoList;

import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  removeTodo,
  toggleTodo
} from "../Redux/action";

const TodoItem = ({ title, status, onDelete, id, onToggle }) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "1rem",
        gap: "1rem",
        border: "1px solid black",
        width: "40%",
        margin: "auto",
        marginTop: "10px"
      }}
    >
      <div>{title} - </div>
      <div>{`${status}`}</div>
      <button onClick={() => onDelete(id)}>DELETE</button>
      <button onClick={() => onToggle(id)}>TOGGLE</button>
    </div>
  );
};

const TodoList = () => {
  const { todos, isLoading, isError } = useSelector(
    (state) => state,
    shallowEqual
  );

  const dispatch = useDispatch();

  const getTodos = () => {
    const requestAction = getTodosRequest();
    dispatch(requestAction);
    return fetch("https://json-server-mocker-masai.herokuapp.com/tasks")
      .then((res) => res.json())
      .then((res) => {
        // success
        console.log(res);
        const successAction = getTodosSuccess(res);
        dispatch(successAction);
      })
      .catch((res) => {
        // failure
        const failureAction = getTodosFailure();
        dispatch(failureAction);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

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
      {isLoading && <h3>...Loading</h3>}
      {isError && <h3>404!!! Something went wrong</h3>}
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

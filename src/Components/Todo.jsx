import TodoList from "./TodoList";
import { TodoInput } from "./TodoInput";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/action";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import Pagination from "./Pagination";

const Todo = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const handleAdd = (text) => {
    const action = addTodo({
      title: text,
      status: false,
      id: uuid()
    });
    dispatch(action);
  };

  const changePageTo = (num) => {
    if (num <= 1) {
      setPage(1);
      return;
    }
    setPage(num);
  };

  const perPage = 3;

  return (
    <div>
      <TodoInput onAdd={handleAdd} />
      <TodoList allFunc={[changePageTo, perPage, page, setPage]} />
      <Pagination
        currentPage={page}
        onClickCallback={(page) => changePageTo(page)}
        total={5}
      />
    </div>
  );
};

export default Todo;

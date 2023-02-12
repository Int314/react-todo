import "./App.css";
import TodoList from "./TodoList";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([
    { id: uuidv4(), name: "ご飯をたべる", completed: false },
    { id: uuidv4(), name: "お風呂に入る", completed: false },
    { id: uuidv4(), name: "歯を磨く", completed: false },
    { id: uuidv4(), name: "Hello World !!!", completed: true },
  ]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加
    const name = todoNameRef.current.value;

    // ブランクの場合処理しない
    if (name === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    // チェックON・OFF
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;

    setTodos(newTodos);

    sortTodo();
  };

  const handleClear = () => {
    // 完了したタスクの削除
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    // Todo削除
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const sortTodo = () => {
    const newTodos = [...todos];
    newTodos.sort((a, b) => {
      if (a.completed) {
        return 1;
      }
      if (b.completed) {
        return -1;
      }

      return 0;
    });
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="container px-4 max-w-lg">
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="input input-bordered input-md w-2/3"
            ref={todoNameRef}
            autoFocus
          ></input>
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={handleAddTodo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-check h-6 w-6"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
            追加
          </button>
        </div>
        <div>
          残りのタスク：{todos.filter((todo) => !todo.completed).length}
          <button
            className="btn btn-link text-info no-underline"
            onClick={handleClear}
          >
            完了したタスクの削除
          </button>
        </div>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;

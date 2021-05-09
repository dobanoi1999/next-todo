import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todo } from "../recoil/todoList";
import TodoItem from "./todoItem";
const ListTodo = () => {
  const [listTodo, useSetListTodo] = useRecoilState(todo);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("all");

  useEffect(() => {
    axios
      .get("api/todo", {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        useSetListTodo(res.data.todo);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!loading && listTodo.length === 0)
    return <h2>you don't have any todo </h2>;
  let todos = listTodo;
  if (mode === "complete") {
    todos = listTodo.filter((i) => i.complete === true);
  }

  return (
    <div className="py-4">
      <div className="flex border-white border-2 rounded w-max">
        <button
          onClick={() => setMode("all")}
          style={
            mode === "all"
              ? {
                  background: "white",
                  color: "black",
                }
              : {}
          }
          className="border-none p-2 w-full h-full  cursor-pointer"
        >
          All
        </button>
        <button
          onClick={() => setMode("complete")}
          style={
            mode === "complete"
              ? {
                  backgroundColor: "white",
                  color: "black",
                }
              : {}
          }
          className="border-none p-2 w-full h-full  cursor-pointer"
        >
          Complete
        </button>
      </div>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </div>
  );
};

export default ListTodo;

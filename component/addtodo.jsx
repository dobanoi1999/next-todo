import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todo as todoList } from "../recoil/todoList";
import { v4 as uuidv4 } from "uuid";

const addtodo = () => {
  const [todo, setTodo] = useState("");
  const setListTodo = useSetRecoilState(todoList);
  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "api/todo",
        {
          data: {
            title: todo,
            id: uuidv4(),
            complete: false,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => setListTodo(res.data.newTodo))
      .catch((err) => console.log(err.response));
    setTodo("");
  };
  return (
    <form
      className="flex justify-between py-5 items-center  border-b-4"
      onSubmit={handleOnSubmit}
    >
      <input
        className="flex-1 p-3 mr-3 h-8 rounded text-gray-900"
        type="text"
        name="todo"
        value={todo}
        onChange={handleOnChange}
      />
      <button
        className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
};

export default addtodo;

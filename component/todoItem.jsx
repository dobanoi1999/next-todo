import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todo as td } from "../recoil/todoList";

const TodoItem = ({ todo }) => {
  const [todoList, setTodoList] = useRecoilState(td);
  const handleOnClick = () => {
    axios
      .post(
        `api/todo/${todo.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert(res.data.msg);
        const index = todoList.findIndex((i) => i.id === todo.id);
        if (index === -1) return;
        let newList = [...todoList];
        newList[index] = { ...todoList[index], complete: true };
        setTodoList(newList);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="pt-8 pb-4 flex justify-between items-center border-b-2 border-green-400">
      <p
        style={
          todo.complete
            ? {
                textDecoration: "line-through",
                fontStyle: "italic",
              }
            : {}
        }
        className="truncate max-w-xs "
      >
        {todo.title}
      </p>

      <div>
        <button
          class="disabled:opacity-30 disabled:hover:bg-blue-500   py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={handleOnClick}
          disabled={todo.complete}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

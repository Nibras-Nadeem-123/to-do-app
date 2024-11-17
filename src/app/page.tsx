"use client";
import { useState } from "react";

type TodoList = {
  task: string;
  id: number;
  priority: string;
};

type comp = {
  task: string;
  id: number;
  priority: string;
}

export default function Home() {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [inputTask, setInputTask] = useState("");
  const [inputId, setInputId] = useState<number | null>(null); // Use nullable type for inputId
  const [inputPriority, setInputPriority] = useState("");
  const [complete, setComplete] = useState<comp[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to add a task
  function addTask() {
    if (!inputTask.trim() || inputId === null || inputId <= 0) {
      alert("Please enter a valid task and ID!");
      return;
    }

    const existingIndex = todoList.findIndex((todo) => todo.id === inputId);

    if (existingIndex !== -1) {
      const updatedTodos = [...todoList];
      updatedTodos[existingIndex] = { task: inputTask, id: inputId, priority: inputPriority, };
      setTodoList(updatedTodos);
    } else {
      setTodoList([...todoList, { task: inputTask, id: inputId, priority: inputPriority, }]);
    }

    setInputId(null); // Set inputId back to null after adding
    setInputTask("");
    setInputPriority("");
  }

  //  Function to complete the task
  function completedTask(inputId: number) {
    const completedTask = todoList.find((todo) => todo.id === inputId);
    if (completedTask) {
      setComplete([...complete, completedTask])
      setTodoList(todoList.filter((todo) => todo.id !== inputId))
    } else {
      return ("Task not available")
    }
  }

  // Function to delete a task
  function deleteItem(inputId: number) {
    const updatedTodos = todoList.filter((todo) => todo.id !== inputId);
    setTodoList(updatedTodos);
  }

  // Function to edit a task
  function editItem(inputId: number) {
    const itemEdit = todoList.find((todo) => todo.id === inputId);
    if (itemEdit) {
      setInputTask(itemEdit.task);
      setInputId(itemEdit.id);
      setInputPriority(itemEdit.priority);
    }
  }



  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
    <div
      className={`relative ${isDarkMode
        ? "bg-gray-900 bg-[url('/heroimage.jpg')] bg-center bg-cover  text-black"
        : "text-white bg-[url('/heroimage.jpg')] bg-center bg-cover"
        } transition-colors min-h-screen`}
    >
      {/* White overlay for light mode */}
      {isDarkMode
        ? <div className="absolute inset-0 bg-white/70 text-black"></div>
        : <div className="absolute inset-0 bg-black/80"></div>}

      <div className=" relative lg:max-w-4xl xl:max-w-4xl mx-auto md:max-w-3xl text-center sm:max-w-2xl p-8">
       
       <div className="flex flex-row gap-10 ml-[30%] mr-[20%]">
       <button
          onClick={toggleTheme}
          className={`p-3 text-xl rounded-md shadow-md ${isDarkMode
            ? " shadow-gray-700 bg-gray-50"
            : "  shadow-white bg-gray-50 text-black"
            } hover:bg-gray-200 dark:hover:bg-gray-700`}
        >
          {!isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>

        {/* Display completed task */}
         <div className="relative text-center">
          <div className="inline-block relative group">
            {/* Button for Completed Tasks */}
            <button
              className={`bg-blue-700 text-white p-3 rounded-md shadow-md hover:bg-blue-600 
        ${isDarkMode ? "shadow-gray-700" : "shadow-white"}`}
            >
              Completed Tasks
            </button>

            {/* Dropdown with Completed Tasks */}
            <div
              className={`absolute left-0 mt-2 w-64 max-h-64 overflow-auto bg-white border rounded-md shadow-lg group-hover:block hidden
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            >
              {complete.length === 0 ? (
                <div className="p-3 text-center text-gray-500">No completed tasks yet.</div>
              ) : (
                <ul className="p-3 space-y-2">
                  {complete.map((task, i) => (
                    <li
                      key={task.id}
                      className="p-2 bg-green-100 rounded-md shadow-sm hover:bg-green-200"
                    >
                      <p className="font-semibold">{i + 1}. {task.task}</p>
                      <p className="text-sm">Priority: {task.priority}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
       </div>

        <h1 className="bg-amber-700 text-5xl p-4 text-center m-3 shadow-md shadow-amber-800 text-white text-shadow-custom-dark">
          Next To-Do App
        </h1>
        <div>
          <input
            type="text"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Add task to do"
            className={`lg:text-[20px] sm:text-[15px] md:text-[18px] p-2 lg:w-[20%] md:w-[18%] sm:w-[14%] m-2 focus:outline-none shadow-md shadow-gray-800 text-black
              ${isDarkMode
                ? " shadow-gray-700"
                : "  shadow-white"
              }`}
          />
          <input
            type="text"
            value={inputId ?? ""}
            onChange={(e) => setInputId(Number(e.target.value))}
            placeholder="Add id of the task"
            className={`lg:text-[20px] sm:text-[15px] md:text-[18px] p-2 lg:w-[20%] md:w-[18%] sm:w-[14%] m-2 focus:outline-none shadow-md shadow-gray-800 text-black
              ${isDarkMode
                ? " shadow-gray-700"
                : "  shadow-white"
              }`}
          />
        </div>
        <div className=" relative">
          <select
            value={inputPriority}
            onChange={(e) => setInputPriority(e.target.value)}
            className={`lg:text-[20px] sm:text-[15px] md:text-[18px] p-2 lg:w-[20%] md:w-[18%] sm:w-[14%] m-2 focus:outline-none shadow-md shadow-gray-800 text-black
               ${isDarkMode
                ? " shadow-gray-700"
                : "  shadow-white"
              }`}
          >
            <option value="">Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="easy">Low</option>
          </select>

          <button
            onClick={addTask}
            className={`bg-blue-700 hover:bg-blue-600 p-2 text-[20px] m-2 lg:w-[20%] lg:p-2 md:w-[18%] md:p-1 sm:w-[14%] sm:p-0 shadow-md shadow-gray-800  ${isDarkMode
              ? " shadow-gray-700"
              : "  shadow-white"
              } rounded-md text-white hover:text-shadow-custom-dark`}
          >
            {todoList.some((todo) => todo.id === inputId) ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>




      {/* Display task list */}
      <div className={` relative grid lg:grid-cols-2 ${isDarkMode
        ? " shadow-white text-black"
        : "  shadow-gray-700 text-white"
        }  md:grid-cols-2 lg:mr-[18%] lg:ml-[18%] md:m-2 sm:grid-cols-1 gap-10 xl:max-w-[3xl] lg:max-w-[2xl] md:max-w-[xl] sm:max-w-[lg] mx-auto p-3`}>
        {todoList.length === 0 ? (
          <div className={`text-center col-span-2 text-xl `}>No tasks available</div>
        ) : (
          todoList
            .sort((a, b) => {
              const priorityOrders: Record<string, number> = { high: 1, medium: 2, easy: 3 };
              return priorityOrders[a.priority] - priorityOrders[b.priority];
            })
            .map((todo, i) => (
              <div key={todo.id} className={` relative shadow-md
               ${isDarkMode
                  ? " shadow-gray-700"
                  : "  shadow-white"
                } bg-amber-100 sm:p-3 md:p-4 p-5`}>
                <div>
                  {
                    todo.priority === "high" ? <hr className="h-2 rounded-full w-full mb-5 bg-red-500" />
                      : todo.priority === "medium" ? <hr className="h-2 rounded-full w-full mb-5 bg-yellow-500" />
                        : todo.priority === "easy" ? <hr className="h-2 rounded-full w-full mb-5 bg-green-500" />
                          : <hr className="h-2 rounded-full w-full mb-5 bg-gray-500" />
                  }
                </div>
                <div className=" relative flex flex-row justify-between gap-5 text-black">
                  <input
                    onChange={() => completedTask(todo.id)}
                    type="checkbox"
                    className=" w-8 h-8 m-2 rounded-full border-2 border-gray-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="shadow-sm shadow-gray-700 rounded-full bg-white p-2 text-center my-auto underline">
                    {i + 1}
                  </span>
                  <div className="lg:text-4xl md:text-3xl sm:text-xl text-base">{todo.task}</div>
                  <div className="text-right">
                    <span
                      onClick={() => editItem(todo.id)}
                      className="bg-green-700 hover:bg-green-600 text-shadow-custom-dark cursor-pointer shadow-md shadow-green-800 p-3 ml-6 mt-10 rounded-full lg:text-xl md:text-lg sm:text-sm text-white"
                    >
                      Edit
                    </span>
                    <span
                      onClick={() => deleteItem(todo.id)}
                      className="shadow-md shadow-red-700 rounded-full bg-red-600 hover:bg-red-500 cursor-pointer text-shadow-custom-dark p-3 ml-5 mr-5 mt-10 text-white text-xl text-center my-auto"
                    >
                      X
                    </span>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

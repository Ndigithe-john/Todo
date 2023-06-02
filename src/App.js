import { useEffect, useState } from "react";
import "./App.css";
import { FaCheck, FaTrash } from "react-icons/fa";

function App() {
  const [shift, setShift] = useState();
  const [myTodos, setMytodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAdd = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      setNewDescription(value)=''
      
    let updatedToDoArr = [...myTodos];
    updatedToDoArr.push(newTodoItem);
    setMytodos(updatedToDoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedToDoArr));
  };
  const handleDeleteTodo = (index) => {
    // let reducedTodo = [...myTodos];
    let reducedTodo = [...myTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setMytodos(reducedTodo);
  };
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yy + "at" + h + ":" + m + ":" + s;
    let filteredItem = {
      ...myTodos[index],
      completedOn: completedOn,
    };
    let updatedCompleted = [...completedTodos];
    updatedCompleted.push(filteredItem);
    setCompletedTodos(updatedCompleted);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompleted));
  };
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (savedTodo) {
      setMytodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);
  return (
    <div className="App">
      <h1>To-Do-List</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Input your task"
            ></input>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe Your task"
            ></input>
          </div>
          <div className="todo-input-item">
            <button className="mybtn" onClick={handleAdd} type="button">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`taskBtn ${shift === false && "active"}`}
            onClick={() => setShift(false)}
          >
            Todo
          </button>
          <button
            className={`taskBtn ${shift === true && "active"}`}
            onClick={() => setShift(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {shift === false &&
            myTodos.map((item, index) => {
              return (
                <div className="todo-list-items" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <FaTrash
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete"
                    />
                    <FaCheck
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}

          {shift === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-items" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <FaTrash
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

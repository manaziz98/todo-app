import React, { useState, useEffect } from "react";
import db from "../Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Todo from "./Todo";
import "./List.css";

const List = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => {
          return {
            title: doc.data().title,
            id: doc.id,
          };
        })
      );
    });
  }, []);

  const deleteTodo = (e) => {
    const id = e.target.value;
    db.collection("todos").doc(id).delete();
  };

  const createId = () => {
    const id = new Date().toISOString();
    return id;
  };

  const addTodo = (e, collection = "todos", text = input) => {
    e.preventDefault();
    const id = createId();
    db.collection(collection)
      .doc(id)
      .set({ title: text })
      .then(() => console.log("working"));
    setInput("");
  };

  const getTargetInfos = (event) => {
    return [event.target.value, event.target.name];
  };

  console.table(todos);
  return (
    <div className="list bs-bottomRight-dark bg-blueToGreen">
      <h3 className="title">Todo-list</h3>
      <div className="todos-container">
        {todos.map((todo, index) => (
          <Todo
            title={todo.title}
            key={index}
            value={todo.id}
            deleteTodo={deleteTodo}
            textClass={"todos"}
            priority={index + 1}
            priorityClass={"priority-rank-todos"}
          />
        ))}
      </div>
      <form>
        <div className="todo">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="add todo"
            className="input"
          />
          <button
            disabled={!input}
            type="submit"
            onClick={addTodo}
            className="add-button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default List;

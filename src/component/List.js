import React, { useState, useEffect } from "react";
import db from "../Firebase";
import Todo from "./Todo";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const List = (props) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);

  useEffect(() => {
    collectionSnapshot("todos", setTodos);
    collectionSnapshot("dones", setDones);
  }, []);

  const collectionSnapshot = (collection, setState) => {
    db.collection(collection)
      .orderBy("date")
      .onSnapshot((snapshot) => {
        setState(
          snapshot.docs.map((doc) => {
            return {
              title: doc.data().title,
              id: doc.id,
            };
          })
        );
      });
  };

  const deleteTodo = (e) => {
    e.preventDefault();
    const [id, collection] = getTargetInfos(e);
    const todo = AnimatedTodoOnDelete(e);
    todo.addEventListener("animationend", () => {
      db.collection(collection).doc(id).delete();
    });
  };

  const getISODate = () => {
    const date = new Date().toISOString();
    return date;
  };

  const addTodo = (e, collection = "todos", text = input) => {
    e.preventDefault();
    const currentISODate = getISODate();
    db.collection(collection)
      .add({
        title: text,
        date: currentISODate,
      })
      .then(() => console.log("working"));
    setInput("");
  };

  const AnimatedTodoOnDelete = (e) => {
    const todo = e.target.parentNode.parentNode;
    todo.style.animation = "delete 0.3s forwards 0s ease-in-out";
    return todo;
  };

  const getTargetInfos = (event) => {
    return [event.target.value, event.target.name];
  };

  const markDone = (e) => {
    e.preventDefault();
    /* persist the event because his properties are nullified in asychronous calls */
    e.persist();
    const [id, collection, getOptions] = [
      ...getTargetInfos(e),
      { source: "cache" },
    ];

    /* get the title from the previous todo */

    db.collection(collection)
      .doc(id)
      .get(getOptions)
      .then((doc) => {
        db.collection(collection).doc(id).delete();
        const newCollection = collection === "todos" ? "dones" : "todos";
        addTodo(e, newCollection, doc.data().title);
      })
      .catch((error) => console.log("test failed AZIZ", error));
  };

  return (
    <div className="list bs-bottomRight-dark bg-blueToGreen">
      <h3 className="title">{props.ListTitle}</h3>
      <div className="todos-container">
        {todos.map((todo, index) => (
          <Todo
            key={todo.id}
            value={todo.id}
            task={todo.title}
            deleteTodo={deleteTodo}
            textClass={"todos"}
            markDone={markDone}
            priority={index + 1}
            priorityClass={"priority-rank-todos"}
          />
        ))}

        {dones.map((done, index) => (
          <Todo
            key={done.id}
            value={done.id}
            task={done.title}
            textClass={"dones"}
            markDone={markDone}
            deleteTodo={deleteTodo}
            priority={index + 1}
            priorityClass={"priority-rank-dones"}
          />
        ))}
      </div>
      <form>
        <div className="todo">
          <input
            className="add-input"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="add todo"
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

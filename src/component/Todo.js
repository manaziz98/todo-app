import React from "react";
import "./Todo.css";

const Todo = (props) => {
  return (
    <div className="todo">
      <span className={props.priorityClass}>{props.priority}.</span>
      <p className={props.textClass}>{props.task}</p>
      <div className="buttons-container">
        <button
          name={props.textClass}
          className="check-button"
          value={props.value}
          onClick={props.markDone}
        ></button>
        <button
          name={props.textClass}
          className="delete-button"
          value={props.value}
          onClick={props.deleteTodo}
        ></button>
      </div>
    </div>
  );
};

export default Todo;

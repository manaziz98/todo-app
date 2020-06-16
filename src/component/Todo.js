import React from "react";
import "./Todo.css";

const Todo = (props) => {
  return (
    <div className="todo">
      <span className={props.priorityClass}>{props.priority}.</span>
      <p className={props.textClass}>{props.title}</p>
      <div className="buttons-container">
        <button
          name={props.textClass}
          className="check-button"
          value={props.value}
          onClick={props.markDone}
        ></button>
        {/* delete_button */}

        <button
          value={props.value}
          onClick={props.deleteTodo}
          name={props.textClass}
          className="delete-button"
        ></button>
      </div>
    </div>
  );
};

export default Todo;

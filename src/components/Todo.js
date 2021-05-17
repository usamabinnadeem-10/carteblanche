import React from "react";
import "./todo.css";
import TodoLabel from "./TodoLabel";
import trash from "../assets/Trash-large.svg";
import edit from "../assets/Edit-small.svg";

const priorities = {
  1: "High",
  2: "Medium",
  3: "Low",
};

function Todo(props) {
  return (
    <div className="todo-box d-flex flex-row align-items-center flex-wrap">
      <div className="d-flex flex-row col-8 align-items-center flex-wrap">
        <h4 className="todo-title-text">{props.title}</h4>
        {props.labels.map((label) => {
          return <TodoLabel label={label} />;
        })}
      </div>
      <div className="d-flex flex-row col-4 align-items-center justify-content-end">
        <div className="col-6 todo-priority d-flex flex-row justify-content-end">
          <h5 className="todo-priority-text">{priorities[props.priority]}</h5>
        </div>
        <div className="col-6 todo-actions d-flex flex-row justify-content-end">
          <img className="todo-action" src={trash} alt="delete todo"></img>
          <img className="todo-action" src={edit} alt="edit todo"></img>
        </div>
      </div>
    </div>
  );
}

export default Todo;

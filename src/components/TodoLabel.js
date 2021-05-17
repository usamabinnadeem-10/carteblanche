import React from "react";
import "./todo.css";

function TodoLabel({ label }) {
  return (
    <div className="todo-label">
      <h6 className="todo-label-text">{label}</h6>
    </div>
  );
}

export default TodoLabel;

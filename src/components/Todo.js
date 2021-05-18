import React from "react";
import "./todo.css";
import TodoLabel from "./TodoLabel";
import trash from "../assets/Trash-large.svg";
import edit from "../assets/Edit-small.svg";
import { motion } from "framer-motion";
import { slideLTR } from "../animations";

const priorities = {
  1: "High",
  2: "Medium",
  3: "Low",
};

function Todo(props) {
  return (
    <motion.div
      initial={slideLTR.initial}
      animate={slideLTR.animate}
      whileHover={{
        boxShadow: "0px 5px 16px -6px rgba(0,0,0,0.50)",
      }}
      className="todo-box d-flex flex-row align-items-center flex-wrap"
    >
      <div className="d-flex flex-row col-12 col-lg-8 align-items-center flex-wrap mb-2">
        <h4 className="todo-title-text">{props.title}</h4>
        {props.labels.map((label, index) => {
          return <TodoLabel key={index} label={label} />;
        })}
      </div>
      <div className="d-flex flex-row col-lg-4 col-12 align-items-center justify-content-end mb-2">
        <div className="col-6 todo-priority d-flex flex-row justify-content-end">
          <h5 className="todo-priority-text">{priorities[props.priority]}</h5>
        </div>
        <div className="col-6 todo-actions d-flex flex-row justify-content-end">
          <motion.img
            whileHover={{
              scale: 1.1,
            }}
            onClick={() => props.delete(props.id)}
            className="todo-action"
            src={trash}
            alt="delete todo"
          ></motion.img>
          <motion.img
            whileHover={{
              scale: 1.1,
            }}
            onClick={() => props.update(props.id)}
            className="todo-action"
            src={edit}
            alt="edit todo"
          ></motion.img>
        </div>
      </div>
    </motion.div>
  );
}

export default Todo;

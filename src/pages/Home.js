import React from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";

import "./home.css";

function Home({ todos, logout }) {
  return (
    <div className="d-flex flex-column">
      <Navbar logout={logout} />
      <div className="todos-wrapper">
        <div className="welcome-wrapper d-flex flex-row justify-content-between align-items-center">
          <h2 className="welcome-home">Welcome to your to-do list</h2>
          <button className="add-todo-button">CREATE NEW TASK</button>
        </div>

        {todos.map((todo) => {
          return (
            <Todo
              title={todo.title}
              labels={todo.labels}
              priority={todo.priority}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;

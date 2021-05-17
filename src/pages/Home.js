import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import Loader from "../components/Loader";
import AddTodo from "./AddTodo";

import "./home.css";
import { URL } from "../url";
import { config } from "../url";
import axios from "../services/axios";

function Home({ logout }) {
  const [todos, settodos] = useState([]);
  const [loading, setloading] = useState(false);
  const [addTodo, setaddTodo] = useState(false);
  const [updateTodo, setupdateTodo] = useState(false);
  const [editingTodo, seteditingTodo] = useState();

  useEffect(() => {
    setloading(true);
    axios
      .get(
        URL + "api/get-todos/",
        config(JSON.parse(localStorage.getItem("user")).access)
      )
      .then((res) => {
        settodos(res.data.todos);
        setloading(false);
      });
  }, []);

  const deleteTodo = (id) => {
    setloading(true);
    let access = "Bearer ";
    access += JSON.parse(localStorage.getItem("user")).access;
    axios
      .delete(URL + "api/add-todo/", {
        headers: {
          Authorization: access,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        settodos(res.data.todos);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        window.alert(
          "O gosh, I messed up :3\nOn a side note, please check if your internet is connected."
        );
      });
  };

  const setUpdatedTodosList = (todos) => {
    settodos(todos);
  };

  const hideTodoModal = () => {
    setaddTodo(false);
    setupdateTodo(false);
  };

  const updateTodoHelper = (id) => {
    let todo = todos.find((element) => element.id === id);
    seteditingTodo(todo);
    setupdateTodo(true);
  };

  return (
    <div className="d-flex flex-column">
      <Navbar logout={logout} />
      {addTodo && (
        <AddTodo
          open
          hide={hideTodoModal}
          setUpdatedTodosList={setUpdatedTodosList}
        />
      )}
      {updateTodo && (
        <AddTodo
          open
          hide={hideTodoModal}
          setUpdatedTodosList={setUpdatedTodosList}
          update
          data={editingTodo}
        />
      )}

      <div className="todos-wrapper">
        <div className="welcome-wrapper d-flex flex-row justify-content-between align-items-center">
          <h2 className="welcome-home">Welcome to your to-do list!</h2>
          <button onClick={() => setaddTodo(true)} className="add-todo-button">
            CREATE NEW TASK
          </button>
        </div>
        {loading && <Loader active />}
        {!loading &&
          todos.map((todo) => {
            return (
              <Todo
                id={todo.id}
                key={todo.id}
                title={todo.title}
                labels={todo.labels}
                priority={todo.priority}
                delete={deleteTodo}
                update={updateTodoHelper}
              />
            );
          })}
        {todos.length === 0 && (
          <h4 className="welcome-home">
            Looks like you have no Todos for today, try creating some
          </h4>
        )}
      </div>
    </div>
  );
}

export default Home;

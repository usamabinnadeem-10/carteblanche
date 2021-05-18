import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import Loader from "../components/Loader";
import AddTodo from "./AddTodo";
import "./home.css";
import { URL } from "../url";
import { config } from "../url";
import axios from "../services/axios";
import { motion } from "framer-motion";
import { buttonHover, buttonTap, scaleAndOpacity } from "../animations";

function Home({ logout }) {
  const [todos, settodos] = useState([]);
  const [loading, setloading] = useState(false);
  const [addTodo, setaddTodo] = useState(false); // true when new todo is being created
  const [updateTodo, setupdateTodo] = useState(false); // true when existing todo is being edited
  const [editingTodo, seteditingTodo] = useState(); // todo being edited is stored in here

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

  // we are neither editing, nor creating a new todo so setting both false
  const hideTodoModal = () => {
    setaddTodo(false);
    setupdateTodo(false);
  };

  const updateTodoHelper = (id) => {
    // filtering the todo that needs to be updated
    let todo = todos.find((element) => element.id === id);
    seteditingTodo(todo);
    setupdateTodo(true);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={scaleAndOpacity.animate}
      transition={scaleAndOpacity.transition}
      className="d-flex flex-column"
    >
      <Navbar logout={logout} />
      {/* react-modal to pop up when creating new todo */}
      {addTodo && (
        <AddTodo
          open
          hide={hideTodoModal}
          setUpdatedTodosList={setUpdatedTodosList}
        />
      )}
      {/* react-modal to pop up when updating existing todo */}
      {updateTodo && (
        <AddTodo
          open
          hide={hideTodoModal}
          setUpdatedTodosList={setUpdatedTodosList}
          update
          // send in the todo's data to be filled in the modal
          data={editingTodo}
        />
      )}

      <div className="todos-wrapper">
        <div className="welcome-wrapper d-flex flex-row justify-content-between align-items-center">
          <h2 className="welcome-home">Welcome to your to-do list!</h2>
          <motion.button
            whileHover={{
              ...buttonHover.hover,
              boxShadow: "0px 15px 26px -6px rgba(0,0,0,0.55)",
            }}
            whileTap={buttonTap.tap}
            onClick={() => setaddTodo(true)}
            className="add-todo-button"
          >
            CREATE NEW TASK
          </motion.button>
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
    </motion.div>
  );
}

export default Home;

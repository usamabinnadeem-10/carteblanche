import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import FormFieldDumb from "../components/FormFieldDumb";
import Loader from "../components/Loader";
import TodoLabel from "../components/TodoLabel";
import "./addtodo.css";
import axios from "../services/axios";
import { URL } from "../url";
import { config } from "../url";
import close from "../assets/close.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// changing default styling of react-modal
Modal.defaultStyles.overlay.backgroundColor = "#00000066";
Modal.defaultStyles.content.backgroundColor = "transparent";
Modal.defaultStyles.content.border = "none";

// constant array to iterate when rendering priority buttons
const PRIORITIES = [
  {
    value: 1,
    name: "High",
  },
  {
    value: 2,
    name: "Medium",
  },
  {
    value: 3,
    name: "Low",
  },
];

function AddTodo(props) {
  const [modalIsOpen, setIsOpen] = React.useState(props.open);
  const [state, setstate] = useState({
    title: "",
    priority: 0,
    labels: [],
  });

  // if updating todo, then set the state to the data passed in by Home.js
  useEffect(() => {
    if (props.update) {
      setstate(props.data);
    }
  }, []);

  const [labelText, setlabelText] = useState(""); // store the text for current label
  const [loading, setloading] = useState(false);

  // closes Modal
  function closeModal() {
    props.hide();
  }

  // utility function to update the css for priority buttons
  const changePriority = (id) => {
    PRIORITIES.forEach((element) => {
      let name = "priority-button-" + element.value;
      let button = document.getElementById(name);
      if (name === id) {
        button.className = "priority-button-filled";
        setstate({ ...state, priority: element.value });
      } else {
        button.className = "priority-button-empty";
      }
    });
  };

  // add new label to the labels array
  // makes sure that empty spaces are not appended to array
  const addLabel = () => {
    if (labelText.trim().length > 0) {
      let newLabels = state.labels;
      newLabels.push(labelText.trim());
      setstate({ ...state, labels: newLabels });
      setlabelText("");
    }
  };

  // only send the request if user has filled in the todo
  // user does not need to fill in labels though
  const validateState = () => {
    if (state.title === "" || state.priority === 0) {
      return false;
    } else {
      return true;
    }
  };

  // sends back the request to server
  const createTask = () => {
    if (validateState()) {
      let access = JSON.parse(localStorage.getItem("user")).access;
      setloading(true);
      // if need to edit an existing todo
      if (props.update) {
        axios
          .put(URL + "api/add-todo/", state, config(access))
          .then((res) => {
            props.setUpdatedTodosList(res.data.todos); // update the todos in Home.js (parent)
            setloading(false);
            props.hide(); // hide the modal now
          })
          .catch((err) => {
            setloading(false);
            window.alert("Oops, something went wrong :3");
          });
      }
      // adding a new todo
      else {
        axios
          .post(URL + "api/add-todo/", state, config(access))
          .then((res) => {
            props.setUpdatedTodosList(res.data.todos); // update the todos in Home.js (parent)
            setloading(false);
            props.hide(); // hide the modal now
          })
          .catch((err) => {
            setloading(false);
            window.alert("Oops, something went wrong :3");
          });
      }
    } else {
      window.alert("Please fill in the details.");
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Todo"
      closeTimeoutMS={500}
    >
      <div
        className="d-flex flex-column add-todo-card"
        style={{ padding: "0px" }}
      >
        <div className="d-flex flex-row justify-content-end">
          <img
            onClick={() => {
              props.hide();
            }}
            id="close-addtodo-modal"
            src={close}
          ></img>
        </div>
        <div className="col-10 mx-auto d-flex flex-column p-4">
          <FormFieldDumb heading="Task Title" />
          <input
            value={state.title}
            onChange={(e) => setstate({ ...state, title: e.target.value })}
            className="field-input mb-3"
            placeholder="e.g Buy Grocery"
            type="text"
          ></input>

          <FormFieldDumb heading="Priority" />
          <div className="d-flex flex-row mb-3">
            {PRIORITIES.map((element) => {
              return (
                <button
                  onClick={(e) => changePriority(e.target.id)}
                  className={
                    state.priority === element.value
                      ? "priority-button-filled"
                      : "priority-button-empty"
                  }
                  key={element.value}
                  id={"priority-button-" + element.value}
                >
                  {element.name}
                </button>
              );
            })}
          </div>

          <FormFieldDumb heading="Labels" />
          <div className="d-flex flex-row">
            <div className="col-9 me-3">
              <input
                value={labelText}
                onChange={(e) => setlabelText(e.target.value)}
                className="field-input"
                placeholder="Food"
                type="text"
              ></input>
            </div>
            <button
              onClick={() => addLabel()}
              className={"action-button priority-button-filled"}
              style={{ margin: "0" }}
            >
              ADD
            </button>
          </div>
          <div className="d-flex flex-row mt-3 mb-1 flex-wrap overflow-auto">
            {state.labels.map((label, index) => {
              return <TodoLabel key={index} label={label} />;
            })}
          </div>
          {loading ? (
            <Loader active />
          ) : (
            <button
              onClick={() => createTask()}
              className={"priority-button-filled mt-5 py-2 action-button"}
            >
              {props.update ? "UPDATE TODO" : "CREATE TASK"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default AddTodo;

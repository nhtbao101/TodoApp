import React from "react";
// import PropTypes from "prop-types";
import "./index.scss";
import { Button } from "antd";

TodoControl.propTypes = {};

function TodoControl(props) {
  const {
    onHandleAll,
    onHandleActive,
    onHandleCompleted,
    count,
    onHandleClear,
  } = props;

  const handleAll = () => {
    onHandleAll();
  };

  const handleActive = () => {
    onHandleActive();
  };

  const handleCompleted = () => {
    onHandleCompleted();
  };

  const handleClear = () => {
    onHandleClear();
  };

  // console.log("count control", typeof count);
  let local = 1;
  if (localStorage.getItem("todoList") === null) {
    local = 0;
  }

  const classname =
    local === 0 || count === JSON.parse(localStorage.getItem("todoList")).length
      ? "todo__clear invisable custom-btn btn-13"
      : "todo__clear custom-btn btn-13";

  return (
    <div className="todo__control">
      <div className="todo__count">
        {count + " " + (count > 1 ? "items left" : "item left")}
      </div>
      <div className="todo__action">
        <Button type="ghost" onClick={handleAll}>
          All
        </Button>
        <Button type="ghost" onClick={handleActive}>
          Active
        </Button>
        <Button type="ghost" onClick={handleCompleted}>
          Completed
        </Button>
      </div>
      <button className={classname} onClick={handleClear}>
        Clear Complete
      </button>
    </div>
  );
}

export default TodoControl;

import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Button } from "antd";

TodoControl.propTypes = {};

function TodoControl(props) {
  const { onHandleAll, onHandleActive, onHandleCompleted, count } = props;

  const handleAll = () => {
    onHandleAll();
  };

  const handleActive = () => {
    onHandleActive();
  };

  const handleCompleted = () => {
    onHandleCompleted();
  };

  console.log("count control", typeof count);

  return (
    <div className="todo__control">
      <div className="todo__count">
        {count + " " + (count > 1 ? "items left" : "item left")}
      </div>
      <div className="todo__action">
        {/* <a href="/">All</a> */}
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
      <div className="todo__clear">Clear Complete</div>
    </div>
  );
}

export default TodoControl;

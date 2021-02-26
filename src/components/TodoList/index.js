import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import Images from "../../constants/images";

TodoList.propTypes = {
  // todos: PropTypes.array,
  onHandleClick: PropTypes.func,
};

function TodoList(props) {
  const { todos, onHandleClick, onHandleRemove } = props;
  // console.log("render", todos);
  const handleCheckValue = () => {
    onHandleClick(todos);
    // console.log("todo", todos);
  };

  const onTextClick = () => {
    // console.log(todos);
  };

  const handleRemove = () => {
    onHandleRemove(todos);
  };

  const imgCheck = todos.isComplete === true ? Images.check : Images.none;

  return (
    <div className="listForm">
      {/* {todos.map((todo) => ( */}
      <div className="added">
        <div className="check">
          <img src={imgCheck} alt="" onClick={handleCheckValue} />
        </div>
        <li
          className={todos.isComplete === true ? "todo-complete" : " "}
          onClick={(todo) => onTextClick(todo)}
        >
          {todos.text}
        </li>
        <div className="remove">
          <img src={Images.delete} alt="" onClick={handleRemove} />
        </div>
      </div>
    </div>
  );
}

export default memo(TodoList);

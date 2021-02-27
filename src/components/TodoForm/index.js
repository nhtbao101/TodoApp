import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Input, Row, Col, Form } from "antd";
import "./index.scss";
import Images from "../../constants/images";
import TodoList from "../TodoList";
import TodoControl from "../TodoControl";

TodoForm.propTypes = {
  list: PropTypes.array,
};

function TodoForm(props) {
  const { list } = props;

  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState(list);

  const listLocal = JSON.parse(localStorage.getItem("todoList")) || [];
  const active = listLocal.filter((todo) => todo.isComplete === false);
  const countActive = active.length;

  const rd = Math.trunc(Math.random() * 1000);

  const onAddTodo = (event) => {
    //add item when press enter
    if (event.key === "Enter") {
      event.preventDefault();
      const newList = [...todoList];
      newList.push({
        id: rd,
        text: text,
        isComplete: false,
      });
      event.value = "";
      setText("");
      setTodoList(newList);
      localStorage.setItem("todoList", JSON.stringify(newList));
    }
  };
  // console.log("completed", completed);
  const onItemClick = (todo) => (e) => {
    // console.log("todosomething", todo);
    const isComplete = todo.isComplete;
    const index = todoList.indexOf(todo);
    localStorage.removeItem("todoList");
    //change isComplete at index
    setTodoList([
      ...todoList.slice(0, index),
      {
        ...todo,
        isComplete: !isComplete,
      },
      ...todoList.slice(index + 1),
    ]);
    const newList = [
      ...todoList.slice(0, index),
      {
        ...todo,
        isComplete: !isComplete,
      },
      ...todoList.slice(index + 1),
    ];
    localStorage.setItem("todoList", JSON.stringify(newList));
  };

  const onRemove = (todo) => (e) => {
    //select index and remove it with slice
    const index = todoList.indexOf(todo);
    const newList = todoList
      .slice(0, index)
      .concat(...todoList.slice(index + 1));
    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(newList));
    setTodoList([
      ...todoList.slice(0, index).concat(...todoList.slice(index + 1)),
    ]);
  };

  const onAllClick = () => {
    setTodoList(JSON.parse(localStorage.getItem("todoList")));
  };

  const onActiveClick = () => {
    setTodoList(active);
  };

  const onCompletedClick = () => {
    setTodoList(
      JSON.parse(localStorage.getItem("todoList")).filter(
        (todo) => todo.isComplete === true
      )
    );
  };

  const countTodo = () => countActive;

  const handleCheckAll = () => {
    // if check all
    if (countTodo() === 0) {
      localStorage.removeItem("todoList");
      const allList = [...todoList];
      for (let i of allList) {
        i.isComplete = false;
      }
      setTodoList(allList);
      localStorage.setItem("todoList", JSON.stringify(allList));
    } else {
      //if any check don't check
      localStorage.removeItem("todoList");
      const allList = [...todoList];
      for (let i of allList) {
        i.isComplete = true;
      }
      setTodoList(allList);
      localStorage.setItem("todoList", JSON.stringify(allList));
    }
  };

  const onClearCompleted = () => {
    // filter completed and remove local
    const clearList = todoList.filter((clear) => clear.isComplete === false);
    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(clearList));
    setTodoList(clearList);
  };

  return (
    <div className="todoForm">
      <Row span={24}>
        <Col className="form">
          <div className="header">todos</div>
          <div className="formInput">
            <Form>
              {/* <div className="checkAll"></div> */}

              <Input
                name="text"
                size="large"
                placeholder="What need to be done ?"
                prefix={
                  <img
                    src={Images.arrowndown}
                    style={{ width: 32, padding: 4 }}
                    onClick={handleCheckAll}
                  ></img>
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={onAddTodo}
                className="input__text"
              />
            </Form>
            <div className="todo__list">
              {todoList.map((todo, index) => (
                <TodoList
                  key={index}
                  todos={todo}
                  onHandleClick={onItemClick(todo)}
                  onHandleRemove={onRemove(todo)}
                />
              ))}
            </div>
            <TodoControl
              count={countTodo()}
              onHandleAll={onAllClick}
              onHandleActive={onActiveClick}
              onHandleCompleted={onCompletedClick}
              onHandleClear={onClearCompleted}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default memo(TodoForm);

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

  const listLocal = JSON.parse(localStorage.getItem("todoList"));
  const active = listLocal.filter((todo) => todo.isComplete === false);
  const countActive = active.length;

  const completed = listLocal.filter((todo) => todo.isComplete === true);
  const rd = Math.trunc(Math.random() * 1000);

  const onAddTodo = (event) => {
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
  const onItemClick = (todo) => (e) => {
    // console.log("todosomething", todo);
    const isComplete = todo.isComplete;
    const index = todoList.indexOf(todo);
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
    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(newList));
  };
  // console.log("list here", todoList);

  const onRemove = (todo) => (e) => {
    const index = todoList.indexOf(todo);
    const newList = todoList
      .slice(0, index)
      .concat(...todoList.slice(index + 1));
    setTodoList([
      ...todoList.slice(0, index).concat(...todoList.slice(index + 1)),
    ]);
    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(newList));
  };

  const onAllClick = () => {
    setTodoList(JSON.parse(localStorage.getItem("todoList")));
    // console.log(todoList);
  };

  const onActiveClick = () => {
    setTodoList(active);
  };

  const onCompletedClick = () => {
    const newCompleted = completed;
    setTodoList(completed);
  };

  const countTodo = () => countActive;
  console.log("Active = ", countTodo());

  return (
    <div className="todoForm">
      <Row span={24}>
        <Col className="form">
          <div className="header">todos</div>
          <div className="formInput">
            <Form>
              <Input
                name="text"
                size="large"
                placeholder="What need to be done ?"
                prefix={
                  <img
                    src={Images.arrowndown}
                    style={{ width: 32, padding: 5 }}
                    onClick={handleCheckAll}
                  ></img>
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={onAddTodo}
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
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default memo(TodoForm);

import React from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";

function App() {
  const list = JSON.parse(localStorage.getItem("todoList")) || [];
  return <TodoForm list={list} />;
}

export default App;

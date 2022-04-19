import React, { Component } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import IdleTimer from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div className="mt-2">
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="primary mt-3 mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function TodoList() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mt-3 mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  render() {
    return (
      <div>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 30}
          onIdle={this.handleOnIdle}
          debounce={250}
        />
        <TodoList />
      </div>
    );
  }

  handleOnIdle(event) {
    Swal.fire(
        'Peringatan',
        'Tidak ada interaksi selama 30 detik, silahkan login kembali',
        'question'
      ).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.open('/', '_self').focus();
        } 
      })
  }
}

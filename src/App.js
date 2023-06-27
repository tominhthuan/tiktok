import React, { Component } from 'react';

import '../src/App.css'

import Header from './component/Header';
import TodoList from './component/TodoList';
import Footer from './component/Footer';
import Pagination from './component/Pagination';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: '',
      todos: [
        // { title: "thuan di choi", isComplete: true, id: 0 },
        // { title: "thuan o nha", isComplete: true, id: 1 },
        // { title: "thuan di hoc", isComplete: false, id: 2 }
      ],
      editedTodoId: -1,
      editedTodoTitle: '',
      totalTodos: 0,
      filter: 'all',
      currentPage: 1, // Thêm state currentPage
      itemsPerPage: 2, //số lượng item hiển thị tại chỉ mục

    }
  }
  //header
  handleClickItem = (id) => {
    const { todos } = this.state;
    debugger;
    todos[id].isComplete = !todos[id].isComplete;//thay đổi trạng thái flase=> true
    this.setState({
      todos,
    })

  }

  handleInputChange = (event) => {
    this.setState({
      news: event.target.value//cập nhật lại trạng news trong state được lấy từ event
    });
  }
  handleAddTodo = () => {

    const { news, todos } = this.state;
    const newTodo = { title: news, isComplete: false, id: todos.length };
    const updatedTodos = [...todos, newTodo];//sao chép toàn bộ phần tử từ mảng todos và them vào newTodo
    if (!news) {
      return;
    }
    this.setState({
      todos: updatedTodos,
      news: '',
      totalTodos: todos.length + 1,
    });
  }
  // cách khác 
  // handleAddTodo = () => {
  //   const { news, todos } = this.state;
  //   this.setState({
  //     todos: [
  //       ...todos,
  //       { title: news, isComplete: false, id: todos.length }
  //     ],
  //     news: ''
  //   });
  // }
  /* `deleteTodo` is a method that takes an index as a parameter and removes the corresponding todo
  item from the `todos` array in the component's state using the `splice` method. It then updates
  the state by setting the `todos` array to the updated array and decreasing the `totalTodos` count
  by 1. */
  deleteTodo = (id) => {
    const { todos } = this.state;
    todos.splice(id, 1);// slide(from,until) : from:vị trí chỉ mục bất đầu thay thế, until: số phần tử bị loại bỏ
    this.setState({
      todos,
      totalTodos: this.state.totalTodos - 1,
    })
  }
  handleEditTodo = (id) => {
    this.setState({
      editedTodoId: id,
    })
  }
  handleOnEditTodo = (e) => {
    this.setState({
      editedTodoTitle: e.target.value
    })
  }

  handleSaveTodo = () => {
    const { todos, editedTodoId, editedTodoTitle } = this.state;
    todos.map(item => {
      if (item.id === editedTodoId && editedTodoTitle !== '') {
        return item.title = editedTodoTitle;
      }
      return item;
    });
    this.setState({

      editedTodoId: -1,
      todos,
    });
  }
  handleFilterChange = (filter) => {
    const { todos } = this.state;
    let lengthActive = 0;
    let lengthCompleted = 0;
    let total = 0;
    todos.map((item) => {
      if (item.isComplete === false) {
        return lengthActive++;
      } else {
        return lengthCompleted++;
      }
    })
    total = filter === 'all' ? todos.length : filter === 'active' ? lengthActive : lengthCompleted;
    this.setState({
      filter: filter,
      totalTodos: total,
    });
  }
  // handleFilterChange = (filter) => {
  //   this.setState({ filter });//, currentPage: 1
  // };
  getFilterTodos = () => {
    const { todos, filter } = this.state;
    if (filter === "all") {
      return todos;
    } else if (filter === "active") {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === "completed") {
      return todos.filter(todo => todo.isComplete);
    }
    return todos;
  }

  handleClearCompleted = () => {
    const { todos, totalTodos } = this.state;
    const updatedTodos = todos.filter(todo => !todo.isComplete);
    const updatedTotalTodos = totalTodos - (todos.length - updatedTodos.length);
    this.setState({
      todos: updatedTodos,
      totalTodos: updatedTotalTodos,
    });
  }

  handlePageChange = (pageNumber) => {
    console.log("pageNumber", pageNumber);
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { news, editedTodoId, totalTodos, filter, currentPage, itemsPerPage } = this.state;
    const filteredTodos = this.getFilterTodos();

    const indexOfLastItem = currentPage * itemsPerPage;// tính chỉ mục của item cuối cùng trên trang hiện tại
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;// tính chỉ mục của item đầu tiên trên trang hiện tại
    const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className='App'>
        <Header
          value={news}
          onChange={this.handleInputChange}
          handleAddTodo={this.handleAddTodo}
        />
        <TodoList
          handleClickItem={this.handleClickItem}
          todos={currentItems}
          deleteTodo={this.deleteTodo}
          handleEditTodo={this.handleEditTodo}
          editedTodoId={editedTodoId}
          handleOnEditTodo={this.handleOnEditTodo}
          handleSaveTodo={this.handleSaveTodo}
        />
        <Footer
          totalTodos={totalTodos}
          filter={filter}
          onFilterChange={this.handleFilterChange}
          onClearCompleted={this.handleClearCompleted}

        />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTodos.length}
          onPageChange={this.handlePageChange}
        />
      </div >
    );
  }
}
export default App;
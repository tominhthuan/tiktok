import React, { Component } from 'react';

import Todos from './Todos';

class TodoList extends Component {

    render() {
        const { todos,
            handleClickItem,
            deleteTodo,
            handleEditTodo,
            editedTodoId,
            handleOnEditTodo,
            handleSaveTodo,

        } = this.props;
        return (
            <div>
                {todos && todos.length > 0 ? (
                    todos.map((item, index) => (
                        <Todos
                            handleClickItem={handleClickItem}
                            index={index}
                            id={item.id}
                            item={item}
                            key={index}
                            deleteTodo={deleteTodo}
                            handleEditTodo={handleEditTodo}
                            value={item.title}
                            editedTodoId={editedTodoId}
                            handleOnEditTodo={handleOnEditTodo}
                            handleSaveTodo={handleSaveTodo}
                        />
                    ))
                ) : (
                    <p>No todos to display.</p>
                )}
            </div>

        );
    }
}
export default TodoList;
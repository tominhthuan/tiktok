import React, { Component } from 'react'

class Header extends Component {
    render() {
        const { value, onChange, handleAddTodo } = this.props;
        return (
            <div className='header'>
                <h1>Todos App</h1>
                <input className='new-todo'
                    type='text'
                    value={value}
                    onChange={onChange} />
                <button
                    className='handleAddTodo'
                    onClick={handleAddTodo}
                >
                    Add Todo
                </button>
            </div>

        );
    }
}
export default Header;

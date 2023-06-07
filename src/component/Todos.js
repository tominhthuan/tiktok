import React, { Component } from "react";

//img
import checkImg from '../img/checked.png';
import checkMarkImg from '../img/check-mark.png';

class Todos extends Component {
    constructor(props) {
        super(props);
    }
    handleClickTodo = () => {
        const { handleClickItem, index } = this.props;
        handleClickItem(index);
    }
    handleDelete = (event) => {
        const { deleteTodo, index } = this.props;
        event.stopPropagation();
        deleteTodo(index);

    }
    handleEditTo = () => {
        const { handleEditTodo, item } = this.props;
        handleEditTodo(item.id);
    }
    render() {
        const {
            item,
            value,
            editedTodoId,
            handleOnEditTodo,
            handleSaveTodo,
        } = this.props;
        const url = item.isComplete ? checkImg : checkMarkImg;
        const className = item.isComplete ? " span todolist-complete" : 'span';
        return (
            <div className="TodoList">

                <img src={url} alt='#' width={30} height={30} />
                {item.id === editedTodoId ?
                    <>
                        <input type="text"
                            defaultValue={value}
                            onChange={handleOnEditTodo}
                        />
                        <button onClick={handleSaveTodo}>Save</button>
                    </>
                    :
                    <span onClick={this.handleClickTodo} className={className}>{item.title}</span>
                }

                <button
                    className="delete"
                    onClick={this.handleDelete}
                >
                    Delete
                </button>
                <button
                    className="edit"
                    onClick={this.handleEditTo}
                >
                    Exit
                </button>
            </div>
        );
    }
}
export default Todos;